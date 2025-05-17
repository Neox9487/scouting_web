from pydantic import BaseModel

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