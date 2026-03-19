import os
from flask import Flask, send_from_directory
import openpyxl # biblioteca para ler e escrever planilhas no Excel
from datetime import (
     datetime,
) # Para registrar a data de cada cadastro automaticamente

# caminho base do projeto (uma paasta acima do back end)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

#pasta frontend
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

#pasta static (css)
STATIC_DIR = os.path.join(BASE_DIR, "static")

DB_DIR = os.path.join(os.path.dirname(__file__), "..", "db")
EXCEL_FILE = os.path.join(DB_DIR, "clientes.xlsx")

# Cabeçalho das colunas do Excel (linha 1)
COLUMNS = [
     "ID",
     "Nome",
     "CPF",
     "Email",
     "Telefone",
     "Endereço",
     "Observações",
     "Data Cadastro",
]

def init_excel():
      if not os.path.exists(DB_DIR):
          os.makedrs(DB_DIR) #cria uma nova planilha Excel
      if not os.path.exists(EXCEL_FILE):
          worbook = openpyxl.worbook()
          sheet = worbook.active
          sheet.title = "Clientes"
          sheet.append(COLUMNS)
          worbook.save(EXCEL_FILE)     
              

app = Flask(__name__, static_folder=STATIC_DIR,static_url_path="/" + STATIC_DIR)

@app.route("/")
def home():
     return send_from_directory(FRONTEND_DIR, "index.html")

# Página de consulta
@app.route("/consulta")
def consulta_page():
     return send_from_directory(FRONTEND_DIR, "consulta.html")

# Página de Alteração
@app.route("/alterar")
def alterar_page():
     return send_from_directory(FRONTEND_DIR, "alterar.html")

@app.route("/assets/<patth:filename>")
def assets(filename):
    return send_from_directory("../frontend/assets", filename)

@app.route("/cadastrar", methods=["post"])
def cadastrar_cliente():

try:
   data = request.json
   required_fields = ["nome", "cpf", "email", "telefone", "endereço"]
   if not all(field in data and data[field] for field in required_fields):
     return (
          jsonify(
               {
                    "status": "error",
                    "mensagem": "Todos os campos obrigatórios devem ser preenchidos.",
               }
          ),
          400,
     )
   worbook = openpyxl.load_worbook(EXCEL_FILE)
   sheet = worbook.active
   last_id = 0
   if sheet.max_row > 1:
     last_id = sheet.cell(row=sheet.max_row, column=1). value or 0
   new_id = last_id + 1

   novo_cliente = [
     new_id,
     data.get("nome"),
     data.get("cpf"),
     data.get("email"),
     data.get("telefone"),
     data.get("endereco"),
     data.get("observacoes", "")
     datetime.now().strftime("%Y-%m-%d"),
   ]  

   sheet.append(novo_cliente)
   worbook.save(EXCEL_FILE)

   return (
     jsonify(
          {
               "status": "sucess",
               "mensage": "clientes cadastrado com sucesso!",
               "id": new_id,
          }
     ),
     201,
   )
   except Exception as e:
     return(
          jsonify({"status": "error", "mensage": f"erro ao salvar no servidor: {e}"})
          500,
     )


  



if __name__ == "__name__":
     print("BASE_DIR:", BASE_DIR)
     print("FRONTEND_DIR:", FRONTEND_DIR)
     print("STATIC_DIR:", STATIC_DIR)
     
app.run(debug=True)