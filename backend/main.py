import fastapi
from server import Server
from db_operation import Matches

from configs import HOST, PORT

server = Server(host=HOST , port=PORT)
match_db = Matches()

if __name__ == "__main__":
  import uvicorn
  server.run()