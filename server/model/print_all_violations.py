import mysql.connector
from mysql.connector import Error


def print_all_violations(host, user, password, database):
    try:
        connection = mysql.connector.connect(
            host = host,
            user = user,
            password = password,
            database = database
        )
        
        if connection.is_connected():
            cursor = connection.cursor()

            # Fetch all violations from the database
            cursor.execute("SELECT plate_number, violation_count FROM license_plates ORDER BY violation_count DESC")
            result = cursor.fetchall()
            
            print("\n")
            print("-"*66)
            print("\nAll Registered Traffic Violations in the Database:\n")
            for record in result:
                print(f"Plate Number: {record[0]}, Violations: {record[1]}")
            
            cursor.close()

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        if connection.is_connected():
            connection.close()