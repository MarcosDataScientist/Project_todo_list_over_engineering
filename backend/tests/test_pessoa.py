def test_pessoa_me_sem_token(client):
    r = client.get("/api/v1/pessoa/me")
    assert r.status_code == 401


def test_pessoa_patch_sem_token(client):
    r = client.patch("/api/v1/pessoa/me", json={"cpf": "123"})
    assert r.status_code == 401
