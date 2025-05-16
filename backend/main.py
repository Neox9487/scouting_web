import fastapi
from server import Server

server = Server(host="0.0.0.0" , port=8000)

if __name__ == "__main__":
    import uvicorn
    server.run()