from utils import Json
from os.path import isfile

CONFIG_MODULE = {
  "host": "localhost",
  "port": 8000,
  "debug": True,
  "database": {
    "host": "localhost",
    "port": 5432,
    "user": "user",
    "password": "password",
    "database": "database"
  }
}

if not isfile("./frontend/config.json"):
  try:
    with open("./frontend/config.json", "w") as f:
      Json.dump(CONFIG_MODULE, f)
  except Exception as e:
    raise Exception(f"Error creating config file: {e}")
  finally:
    print("Config file created. Please edit it and run the program again.")
    exit(0)

else:
  try:
    with open("./frontend/config.json", "r") as f:
      config = Json.load(f)
  except Exception as e:
    raise Exception(f"Error reading config file: {e}")
  finally:
    for key, value in config.items():
      if isinstance(value, dict):
        for sub_key, sub_value in value.items():
          CONFIG_MODULE[key][sub_key] = sub_value
      else:
        CONFIG_MODULE[key] = value

HOST = CONFIG_MODULE["host"]
PORT = CONFIG_MODULE["port"]
DEBUG = CONFIG_MODULE["debug"]
DATABASE = CONFIG_MODULE["database"]
DATABASE_HOST = DATABASE["host"]
DATABASE_PORT = DATABASE["port"]
DATABASE_USER = DATABASE["user"]
DATABASE_PASSWORD = DATABASE["password"]
DATABASE_NAME = DATABASE["database"]