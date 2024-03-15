import mysql.connector
from mysql.connector import Error

def clear_license_plates(host, user, password, database):
    try:
        connection = mysql.connector.connect(
            host = host,
            user = user,
            password = password,
            database = database
        )
        
        if connection.is_connected():
            cursor = connection.cursor()

            # Delete all records from the table
            cursor.execute("DELETE FROM license_plates")

            connection.commit()
            cursor.close()

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        if connection.is_connected():
            connection.close()
