from modules import Json
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
    "database": "database_name",
    "table_name": "table_name"
  }
}

if not isfile("./backend/config.json"):
  try:
    Json.dump(CONFIG_MODULE, "./backend/config.json")
  except Exception as e:
    raise Exception(f"Error creating config file: {e}")
  finally:
    print("Config file created. Please edit it and run the program again.")
    exit(0)

else:
  try:
    config = Json.load("./backend/config.json")
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
DATABASE_HOST = CONFIG_MODULE["database"]["host"]
DATABASE_PORT = CONFIG_MODULE["database"]["port"]
DATABASE_USER = CONFIG_MODULE["database"]["user"]
DATABASE_PASSWORD = CONFIG_MODULE["database"]["password"]
DATABASE_NAME = CONFIG_MODULE["database"]["database"]
TABLE_NAME = CONFIG_MODULE["database"]["table_name"]