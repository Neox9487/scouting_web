from pydantic import BaseModel

# data module:
# {
#   team_number: 0,
#   match: 0,
#   auto: {
#     leave: false,
#     coral_l1: 0,
#     coral_l2: 0,
#     coral_l3: 0,
#     coral_l4: 0,
#     processor: 0,
#     net: 0,
#   },
#   teleop: {
#     coral_l1: 0,
#     coral_l2: 0,
#     coral_l3: 0,
#     coral_l4: 0,
#     processor: 0,
#     net: 0,
#     barge: "none",
#   },
#   note: "",
# }

class AutoData(BaseModel):
  leave: bool
  coral_l1: int
  coral_l2: int
  coral_l3: int
  coral_l4: int
  processor: int
  net: int

class TeleopData(BaseModel):
  coral_l1: int
  coral_l2: int
  coral_l3: int
  coral_l4: int
  processor: int
  net: int
  barge: str

class MatchData(BaseModel):
  match: int
  team_number: int
  auto: AutoData
  teleop: TeleopData
  note: str

class TeamMatch(BaseModel):
  team_number: int
  match: int

def to_dict_list(datalist: list):
  data = []
  for item in datalist:
    data.append(
      {
        "team_number": item[1],
        "match": item[2],
        "auto": {
          "leave": item[3],
          "coral_l1": item[4],
          "coral_l2": item[5],
          "coral_l3": item[6],
          "coral_l4": item[7],
          "processor": item[8],
          "net": item[9],
        },
        "teleop": {
          "coral_l1": item[10],
          "coral_l2": item[11],
          "coral_l3": item[12],
          "coral_l4": item[13],
          "processor": item[14],
          "net": item[15],
          "barge": item[16],
        },
        "note": item[17],
      }
    )
  return data
