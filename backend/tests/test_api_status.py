def test_api_status_returns_shape(client):
    response = client.get("/api/v1/status")
    assert response.status_code == 200
    data = response.get_json()
    assert data["api"] == "ok"
    assert "supabase_configured" in data
    assert isinstance(data["supabase_configured"], bool)
