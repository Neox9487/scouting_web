import fastapi

class Server:
  def __init__(self, host="0.0.0.0", port=8000):  
    self.app = fastapi.FastAPI()
    @self.app.get("/")
    def root():
      return {"message": "Hello, you got wrong way ヽ(･∀･)ﾉ"}

    @self.app.get("/fetch")
    def fetch():
      return {"message": "Data fetched!"}

    @self.app.post("/submit")
    def submit(data: dict):
      return {"message": "Data received!"}

    @self.app.delete("/delete")
    def delete(data: dict):
      return {"message": "Data deleted!"}

    @self.app.put("/update")
    def update(data: dict):
      return {"message": "Data updated!"}
    
  def run(self):
    import uvicorn
    uvicorn.run(self.app, host="0.0.0.0", port=8000)