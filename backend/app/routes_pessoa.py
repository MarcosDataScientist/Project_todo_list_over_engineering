from flask import Flask, jsonify, request

from .auth_pessoa import supabase_pessoa_or_error


def _public_pessoa_row(row: dict) -> dict:
    return {
        "id": row.get("id"),
        "cpf": row.get("cpf"),
        "nome": row.get("nome"),
        "status": row.get("status"),
        "nascimento": row.get("nascimento"),
        "created_at": row.get("created_at"),
    }


def register_pessoa(app: Flask) -> None:
    @app.get("/api/v1/pessoa/me")
    def get_pessoa_me():
        """Dados da pessoa vinculada ao usuário logado
        ---
        tags:
          - Pessoa
        security:
          - Bearer: []
        summary: Perfil (cadastro no sistema de tarefas)
        responses:
          200:
            description: Registro em public.pessoa
          401:
            description: Não autenticado
        """
        sb, pessoa_id, err = supabase_pessoa_or_error()
        if err:
            return err
        res = (
            sb.table("pessoa")
            .select("id, cpf, nome, status, nascimento, created_at")
            .eq("id", pessoa_id)
            .limit(1)
            .execute()
        )
        if not res.data:
            return jsonify({"error": "pessoa não encontrada"}), 404
        return jsonify({"pessoa": _public_pessoa_row(res.data[0])}), 200

    @app.patch("/api/v1/pessoa/me")
    def patch_pessoa_me():
        """Atualizar dados da pessoa logada
        ---
        tags:
          - Pessoa
        security:
          - Bearer: []
        summary: Atualizar CPF, nascimento, status, nome
        parameters:
          - in: body
            name: body
            schema:
              type: object
              properties:
                cpf:
                  type: string
                nome:
                  type: string
                nascimento:
                  type: string
                  format: date
                status:
                  type: string
        responses:
          200:
            description: Atualizado
        """
        sb, pessoa_id, err = supabase_pessoa_or_error()
        if err:
            return err
        body = request.get_json(silent=True) or {}
        updates = {}
        if "cpf" in body:
            v = str(body.get("cpf") or "").strip()
            if not v:
                return jsonify({"error": "cpf não pode ser vazio"}), 400
            updates["cpf"] = v
        if "nome" in body:
            v = str(body.get("nome") or "").strip()
            if not v:
                return jsonify({"error": "nome não pode ser vazio"}), 400
            updates["nome"] = v
        if "nascimento" in body:
            updates["nascimento"] = body.get("nascimento")
        if "status" in body:
            v = str(body.get("status") or "").strip()
            if not v:
                return jsonify({"error": "status não pode ser vazio"}), 400
            updates["status"] = v
        if not updates:
            return jsonify({"error": "nenhum campo para atualizar"}), 400

        sb.table("pessoa").update(updates).eq("id", pessoa_id).execute()
        res = (
            sb.table("pessoa")
            .select("id, cpf, nome, status, nascimento, created_at")
            .eq("id", pessoa_id)
            .limit(1)
            .execute()
        )
        if not res.data:
            return jsonify({"error": "pessoa não encontrada"}), 404
        return jsonify({"pessoa": _public_pessoa_row(res.data[0])}), 200
