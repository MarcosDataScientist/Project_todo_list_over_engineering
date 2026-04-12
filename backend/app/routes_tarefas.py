from flask import Flask, jsonify, request
 
from .auth_pessoa import supabase_pessoa_or_error
 
 
def register_tarefas(app: Flask) -> None:
    @app.get("/api/v1/tarefas")
    def listar_tarefas():
        """Listar tarefas do usuário logado
        ---
        tags:
          - Tarefas
        security:
          - Bearer: []
        summary: Lista tarefas
        parameters:
          - in: query
            name: q
            type: string
            required: false
            description: Termo para filtrar por descrição, status ou observação
        responses:
          200:
            description: Lista
          401:
            description: Não autenticado
        """
        sb, pessoa_id, err = supabase_pessoa_or_error()
        if err:
            return err
 
        q = request.args.get("q", "").strip()
 
        query = (
            sb.table("tarefas")
            .select("*")
            .eq("pessoa_id", pessoa_id)
            .order("data_criacao", desc=True)
        )
 
        if q:
            query = query.or_(
                f"descricao_tarefa.ilike.%{q}%,"
                f"status.ilike.%{q}%,"
                f"observacao.ilike.%{q}%"
            )
 
        res = query.execute()
        return jsonify({"tarefas": res.data or [], "q": q or None}), 200
 
    @app.get("/api/v1/tarefas/<int:task_id>")
    def buscar_tarefa(task_id: int):
        """Buscar uma tarefa por id
        ---
        tags:
          - Tarefas
        summary: Detalhe da tarefa
        parameters:
          - in: path
            name: task_id
            type: integer
            required: true
        responses:
          200:
            description: Tarefa
          404:
            description: Não encontrada
        """
        sb, pessoa_id, err = supabase_pessoa_or_error()
        if err:
            return err
        res = (
            sb.table("tarefas")
            .select("*")
            .eq("id", task_id)
            .eq("pessoa_id", pessoa_id)
            .limit(1)
            .execute()
        )
        if not res.data:
            return jsonify({"error": "tarefa não encontrada"}), 404
        return jsonify({"tarefa": res.data[0]}), 200
 
    @app.post("/api/v1/tarefas")
    def criar_tarefa():
        """Cadastrar tarefa
        ---
        tags:
          - Tarefas
        summary: Criar tarefa
        parameters:
          - in: body
            name: body
            schema:
              type: object
              required:
                - data_expiracao
                - descricao_tarefa
              properties:
                data_expiracao:
                  type: string
                  format: date
                descricao_tarefa:
                  type: string
                status:
                  type: string
                observacao:
                  type: string
                  description: Observações opcionais sobre a tarefa
        responses:
          201:
            description: Criada
        """
        sb, pessoa_id, err = supabase_pessoa_or_error()
        if err:
            return err
        body = request.get_json(silent=True) or {}
        descricao = (body.get("descricao_tarefa") or "").strip()
        data_exp = body.get("data_expiracao")
        status = (body.get("status") or "PENDENTE").strip()
        observacao = body.get("observacao")
        if observacao is not None and not isinstance(observacao, str):
            observacao = str(observacao)
        if observacao is None:
            observacao = ""
        if not descricao or not data_exp:
            return jsonify({"error": "descricao_tarefa e data_expiracao são obrigatórios"}), 400
 
        row = {
            "pessoa_id": pessoa_id,
            "data_expiracao": data_exp,
            "descricao_tarefa": descricao,
            "status": status,
            "observacao": observacao,
        }
        ins = sb.table("tarefas").insert(row).execute()
        if not ins.data:
            sel = (
                sb.table("tarefas")
                .select("*")
                .eq("pessoa_id", pessoa_id)
                .order("id", desc=True)
                .limit(1)
                .execute()
            )
            t = sel.data[0] if sel.data else None
        else:
            t = ins.data[0] if isinstance(ins.data, list) else ins.data
        return jsonify({"tarefa": t}), 201
 
    @app.patch("/api/v1/tarefas/<int:task_id>")
    def editar_tarefa(task_id: int):
        """Editar tarefa
        ---
        tags:
          - Tarefas
        summary: Atualizar tarefa
        parameters:
          - in: path
            name: task_id
            type: integer
            required: true
        responses:
          200:
            description: Atualizada
          404:
            description: Não encontrada
        """
        sb, pessoa_id, err = supabase_pessoa_or_error()
        if err:
            return err
        body = request.get_json(silent=True) or {}
        updates = {}
        if "descricao_tarefa" in body:
            v = (body.get("descricao_tarefa") or "").strip()
            if not v:
                return jsonify({"error": "descricao_tarefa não pode ser vazia"}), 400
            updates["descricao_tarefa"] = v
        if "data_expiracao" in body and body.get("data_expiracao"):
            updates["data_expiracao"] = body["data_expiracao"]
        if "status" in body and body.get("status") is not None:
            updates["status"] = str(body["status"]).strip()
        if "observacao" in body:
            obs = body.get("observacao")
            updates["observacao"] = "" if obs is None else str(obs)
        if not updates:
            return jsonify({"error": "nenhum campo para atualizar"}), 400
 
        check = (
            sb.table("tarefas")
            .select("id")
            .eq("id", task_id)
            .eq("pessoa_id", pessoa_id)
            .limit(1)
            .execute()
        )
        if not check.data:
            return jsonify({"error": "tarefa não encontrada"}), 404
 
        sb.table("tarefas").update(updates).eq("id", task_id).eq(
            "pessoa_id", pessoa_id
        ).execute()
        res = (
            sb.table("tarefas")
            .select("*")
            .eq("id", task_id)
            .eq("pessoa_id", pessoa_id)
            .limit(1)
            .execute()
        )
        return jsonify({"tarefa": res.data[0]}), 200
 
    @app.delete("/api/v1/tarefas/<int:task_id>")
    def excluir_tarefa(task_id: int):
        """Excluir tarefa
        ---
        tags:
          - Tarefas
        summary: Remover tarefa
        parameters:
          - in: path
            name: task_id
            type: integer
            required: true
        responses:
          204:
            description: Removida
          404:
            description: Não encontrada
        """
        sb, pessoa_id, err = supabase_pessoa_or_error()
        if err:
            return err
        check = (
            sb.table("tarefas")
            .select("id")
            .eq("id", task_id)
            .eq("pessoa_id", pessoa_id)
            .limit(1)
            .execute()
        )
        if not check.data:
            return jsonify({"error": "tarefa não encontrada"}), 404
        sb.table("tarefas").delete().eq("id", task_id).eq("pessoa_id", pessoa_id).execute()
        return "", 204
 