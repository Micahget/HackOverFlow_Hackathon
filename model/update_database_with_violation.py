import mysql.connector
from mysql.connector import Error


def update_database_with_violation(plate_number, host, user, password, database):
    try:
        connection = mysql.connector.connect(
            host = host,
            user = user,
            password = password,
            database = database
        )
        
        if connection.is_connected():
            cursor = connection.cursor()

            # Check if the license plate already exists in the table
            cursor.execute(f"SELECT violation_count FROM license_plates WHERE plate_number='{plate_number}'")
            result = cursor.fetchone()
            
            if result:
                # Increment violation_count by 1 if plate_number already exists
                cursor.execute(f"UPDATE license_plates SET violation_count=violation_count+1 WHERE plate_number='{plate_number}'")
            else:
                # Insert a new record if plate_number doesn't exist
                cursor.execute(f"INSERT INTO license_plates (plate_number) VALUES ('{plate_number}')")
            
            connection.commit()
            cursor.close()

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        if connection.is_connected():
            connection.close()