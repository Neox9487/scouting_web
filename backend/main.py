import fastapi
from server import Server

from configs import HOST, PORT

server = Server(host=HOST , port=PORT)

if __name__ == "__main__":
  import uvicorn
  server.run()