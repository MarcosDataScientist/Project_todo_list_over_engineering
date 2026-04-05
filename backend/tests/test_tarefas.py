def test_listar_tarefas_sem_token(client):
    r = client.get("/api/v1/tarefas")
    assert r.status_code == 401


def test_criar_tarefa_sem_token(client):
    r = client.post(
        "/api/v1/tarefas",
        json={"descricao_tarefa": "x", "data_expiracao": "2030-01-01"},
    )
    assert r.status_code == 401


def test_buscar_tarefa_sem_token(client):
    r = client.get("/api/v1/tarefas/1")
    assert r.status_code == 401
