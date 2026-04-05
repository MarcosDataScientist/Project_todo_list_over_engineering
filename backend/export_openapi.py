import json
import os
import sys

# Adiciona o diretório atual ao path para importar a 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app

def export_openapi():
    # Remove o skip para garantir que o Swagger seja carregado normalmente
    if "SKIP_SWAGGER" in os.environ:
        del os.environ["SKIP_SWAGGER"]
        
    app = create_app()
    
    with app.app_context():
        # Usa o test_client para obter o JSON da rota oficial
        client = app.test_client()
        response = client.get('/apispec.json')
        
        if response.status_code != 200:
            print(f"Erro ao obter spec: {response.status_code}")
            return
            
        spec = json.loads(response.data)
        
        # Caminho de destino: pasta static do docusaurus
        target_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "documentation", "static")
        os.makedirs(target_dir, exist_ok=True)
        target_path = os.path.join(target_dir, "openapi.json")
        
        with open(target_path, "w", encoding="utf-8") as f:
            json.dump(spec, f, indent=2, ensure_ascii=False)
        
        print(f"Sucesso: Especificação OpenAPI exportada para {target_path}")

if __name__ == "__main__":
    export_openapi()
