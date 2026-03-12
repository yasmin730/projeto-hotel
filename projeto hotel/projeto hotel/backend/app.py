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



if __name__ == "__name__":
     print("BASE_DIR:", BASE_DIR)
     print("FRONTEND_DIR:", FRONTEND_DIR)
     print("STATIC_DIR:", STATIC_DIR)
     
app.run(debug=True)