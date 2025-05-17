import json

class Json:
  @staticmethod
  def dumps(data):
    return json.dumps(data).decode("utf-8")

  @staticmethod
  def loads(data):
    return json.loads(data)

  @staticmethod
  def dump(data, file):
    with open(file, "wb") as f:
      f.write(json.dumps(data, indent=2).encode("utf-8"))

  @staticmethod
  def load(file):
    with open(file, "rb") as f:
      return json.loads(f.read())