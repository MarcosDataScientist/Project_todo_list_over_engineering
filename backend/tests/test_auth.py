def test_login_requires_json_fields(client):
    r = client.post("/api/v1/auth/login", json={})
    assert r.status_code == 400
    assert "obrigatórios" in r.get_json()["error"]


def test_login_supabase_unconfigured_returns_503(client, monkeypatch):
    """Isolado de .env real: força cliente Supabase ausente."""
    monkeypatch.setattr("app.routes_auth.get_supabase", lambda: None)
    r = client.post(
        "/api/v1/auth/login",
        json={"email": "a@b.co", "password": "secret"},
    )
    assert r.status_code == 503


def test_me_requires_bearer(client):
    r = client.get("/api/v1/auth/me")
    assert r.status_code == 401
