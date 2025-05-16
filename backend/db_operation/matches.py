import mysql.connector

from configs import DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME

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
    self.cursor.execute("""
      CREATE TABLE IF NOT EXISTS matches (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        team_number INT, 
        match INT, 
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
        note VARCHAR(255))"""
    )
    self.db.commit()

  def delete_match(self, match, team_number):
    self.cursor.execute("DELETE FROM matches WHERE match = %s AND team_number = %s", (match, team_number))
    self.db.commit()

  def get_all_matches(self):
    self.cursor.execute("SELECT * FROM matches")
    return self.cursor.fetchall()
    