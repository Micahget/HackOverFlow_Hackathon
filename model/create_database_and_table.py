import mysql.connector
from mysql.connector import Error


def create_database_and_table(host, user, password, database):
    try:
        # Create a connection
        connection = mysql.connector.connect(
            host = host,
            user = user,
            password = password
        )
        
        if connection.is_connected():
            # Create a new database cursor
            cursor = connection.cursor()

            # Create a new database using the provided name
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database}")
            print(f"Database {database} created successfully!")

            # Use the newly created database
            cursor.execute(f"USE {database}")

            # Create a new table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS license_plates (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    plate_number VARCHAR(255) NOT NULL UNIQUE,
                    violation_count INT DEFAULT 1
                )
            """)
            print("Table created successfully!")

            cursor.close()

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        if connection.is_connected():
            connection.close()