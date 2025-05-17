import mysql.connector

from configs import DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, TABLE_NAME

# module:
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

class Matches:
  def __init__(self):
    self.db = mysql.connector.connect(
      host=DATABASE_HOST,
      user=DATABASE_USER,
      password=DATABASE_PASSWORD,
      database=DATABASE_NAME
    )
    self.cursor = self.db.cursor()
    self.cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DATABASE_NAME}")
    self.cursor.execute(f"""
      CREATE TABLE IF NOT EXISTS {TABLE_NAME}(
        id INT AUTO_INCREMENT PRIMARY KEY, 
        team_number INT, 
        `match` INT, 
        auto_leave BOOLEAN, 
        auto_coral_l1 INT, 
        auto_coral_l2 INT, 
        auto_coral_l3 INT, 
        auto_coral_l4 INT, 
        auto_processor INT, 
        auto_net INT, 
        teleop_coral_l1 INT,
        teleop_coral_l2 INT, 
        teleop_coral_l3 INT, 
        teleop_coral_l4 INT, 
        teleop_processor INT, 
        teleop_net INT, 
        teleop_barge VARCHAR(50), 
        note VARCHAR(255),
        UNIQUE KEY uniq_match_team (`match`, team_number))"""
    )
    self.db.commit()

  def add_match(self, data):
    self.cursor.execute(f"""
      INSERT INTO {TABLE_NAME} (
        team_number, 
        `match`, 
        auto_leave, 
        auto_coral_l1, 
        auto_coral_l2, 
        auto_coral_l3, 
        auto_coral_l4, 
        auto_processor, 
        auto_net, 
        teleop_coral_l1, 
        teleop_coral_l2, 
        teleop_coral_l3, 
        teleop_coral_l4, 
        teleop_processor, 
        teleop_net, 
        teleop_barge, 
        note
      )
      VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
      (data["team_number"], 
       data["match"], 
       data["auto"]["leave"], 
       data["auto"]["coral_l1"], 
       data["auto"]["coral_l2"], 
       data["auto"]["coral_l3"], 
       data["auto"]["coral_l4"], 
       data["auto"]["processor"], 
       data["auto"]["net"], 
       data["teleop"]["coral_l1"], 
       data["teleop"]["coral_l2"], 
       data["teleop"]["coral_l3"], 
       data["teleop"]["coral_l4"], 
       data["teleop"]["processor"],
       data["teleop"]["net"], 
       data["teleop"]["barge"], 
       data["note"])
    )
    self.db.commit()

  def delete_match(self, match, team_number):
    self.cursor.execute(f"DELETE FROM {TABLE_NAME} WHERE match = %s AND team_number = %s", (match, team_number))
    self.db.commit()

  def update_match(self, data):
    self.cursor.execute(
      f"""
      UPDATE {TABLE_NAME} 
      SET auto_leave = %s, 
          auto_coral_l1 = %s,
          auto_coral_l2 = %s,
          auto_coral_l3 = %s,
          auto_coral_l4 = %s,
          auto_processor = %s,
          auto_net = %s,
          teleop_coral_l1 = %s,
          teleop_coral_l2 = %s,
          teleop_coral_l3 = %s,
          teleop_coral_l4 = %s,
          teleop_processor = %s,
          teleop_net = %s,
          teleop_barge = %s,
          note = %s
      WHERE team_number = %s AND `match` = %s
      """,
      (data["auto"]["leave"],
       data["auto"]["coral_l1"],
       data["auto"]["coral_l2"],
       data["auto"]["coral_l3"],
       data["auto"]["coral_l4"],
       data["auto"]["processor"],
       data["auto"]["net"],
       data["teleop"]["coral_l1"],
       data["teleop"]["coral_l2"],
       data["teleop"]["coral_l3"],
       data["teleop"]["coral_l4"],
       data["teleop"]["processor"],
       data["teleop"]["net"],
       data["teleop"]["barge"],
       data["note"],
       data["team_number"],
       data["match"])  
  )
    self.db.commit()  

  def get_all_matches(self):
    self.cursor.execute("SELECT * FROM matches")
    return self.cursor.fetchall()
    