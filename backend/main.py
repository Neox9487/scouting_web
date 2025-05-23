from server import Server
from db_operation import Matches

from configs import HOST, PORT

server = Server(host=HOST , port=PORT)

if __name__ == "__main__":
  server.run()