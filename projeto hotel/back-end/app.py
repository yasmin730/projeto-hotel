from Flask import Flask
app = Flask (__name__)

@ app.route("/")
def home():
  return "bom dia galera 2B"

app.run()
