import orjson

class Json:
  @staticmethod
  def dumps(data):
    return orjson.dumps(data).decode("utf-8")

  @staticmethod
  def loads(data):
    return orjson.loads(data)

  @staticmethod
  def dump(data, file):
    with open(file, "wb") as f:
      f.write(orjson.dumps(data))

  @staticmethod
  def load(file):
      with open(file, "rb") as f:
        return orjson.loads(f.read())