import psycopg2
from psycopg2 import sql
from configs import DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, TABLE_NAME, DATABASE_PORT

class Matches:
  def __init__(self):
    self.db = psycopg2.connect(
      host=DATABASE_HOST,
      port=DATABASE_PORT,
      user=DATABASE_USER,
      password=DATABASE_PASSWORD,
      dbname=DATABASE_NAME
    )
    self.cursor = self.db.cursor()
    # 建立資料表（資料庫要先在 Render 建好）
    create_table_query = sql.SQL("""
      CREATE TABLE IF NOT EXISTS {table} (
        id SERIAL PRIMARY KEY,
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
        note VARCHAR(255),
        UNIQUE(match, team_number)
      )
    """).format(table=sql.Identifier(TABLE_NAME))

    self.cursor.execute(create_table_query)
    self.db.commit()

  def add_match(self, data):
    insert_query = sql.SQL("""
      INSERT INTO {table} (
        team_number, match, auto_leave,
        auto_coral_l1, auto_coral_l2, auto_coral_l3, auto_coral_l4, auto_processor, auto_net,
        teleop_coral_l1, teleop_coral_l2, teleop_coral_l3, teleop_coral_l4, teleop_processor, teleop_net,
        teleop_barge, note
      ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
      ON CONFLICT (match, team_number) DO NOTHING
    """).format(table=sql.Identifier(TABLE_NAME))

    values = (
      data["team_number"],
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
      data["note"]
    )
    self.cursor.execute(insert_query, values)
    self.db.commit()

  def delete_match(self, match, team_number):
    delete_query = sql.SQL("""
      DELETE FROM {table} WHERE match = %s AND team_number = %s
    """).format(table=sql.Identifier(TABLE_NAME))
    self.cursor.execute(delete_query, (match, team_number))
    self.db.commit()

  def update_match(self, data):
    update_query = sql.SQL("""
      UPDATE {table}
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
      WHERE team_number = %s AND match = %s
    """).format(table=sql.Identifier(TABLE_NAME))

    values = (
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
      data["note"],
      data["team_number"],
      data["match"]
    )
    self.cursor.execute(update_query, values)
    self.db.commit()

  def get_all_matches(self):
    select_query = sql.SQL("SELECT * FROM {table}").format(table=sql.Identifier(TABLE_NAME))
    self.cursor.execute(select_query)
    return self.cursor.fetchall()
