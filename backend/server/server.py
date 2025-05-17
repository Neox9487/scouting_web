import fastapi

from modules import MatchData
from db_operation import Matches

from fastapi.middleware.cors import CORSMiddleware

class Server:
  def __init__(self, host="0.0.0.0", port=8000):  
    self.app = fastapi.FastAPI()
    self.app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"], 
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
    )
    self.host = host
    self.port = port
    self.matches = Matches()

    @self.app.get("/")
    def root():
      return {"message": "Hello, you got wrong way ヽ(･∀･)ﾉ"}

    @self.app.get("/fetch/")
    def fetch():
      try:
        matches = self.matches.get_all_matches()
        return {"error":False, "data": matches, "message": "Data fetched!"}
      except Exception as e:
        return {"error": True, "message": str(e)}

    @self.app.post("/submit/")
    def submit(data: MatchData):
      print(data)
      try:
        self.matches.add_match(data.model_dump())
        return {"error": False, "message": "Data submitted!"}
      except Exception as e:
        return {"error": True, "message": str(e)}
      
    @self.app.delete("/delete/")
    def delete(data):
      pass

    @self.app.put("/update/")
    def update(data: MatchData):
      pass
    
  def run(self):
    import uvicorn
    uvicorn.run(self.app, host=self.host, port=self.port)
