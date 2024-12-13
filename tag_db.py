import pyodbc as odbc

# Define connection parameters
server = 'completefulserver.database.windows.net,1433'
database = 'MainDatabase'
username = 'JoeF'
password = 'SEg4FFFoQUP*5Fi**rD#kh3'
connection_string = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'

# Connect to the SQL Server
def DTG_tag_db_insert(tag_ID, item_ID, order_number, sku, batch, status):
    try:
        connection = odbc.connect(connection_string)
        cursor = connection.cursor()
        print("Connected to SQL Server")

        # Check if the table exists in the 'cake' schema
        check_table_query = '''
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_SCHEMA = 'cake' AND TABLE_NAME = 'DTG_TAG'
        '''
        cursor.execute(check_table_query)
        table_exists = cursor.fetchone()[0]

        if table_exists == 0:
            # Create table query within the 'cake' schema if it doesn't exist
            create_table_query = '''
            CREATE TABLE cake.DTG_TAG (
                id INT IDENTITY(1,1) PRIMARY KEY,
                tag_ID VARCHAR(50),
                item_ID VARCHAR(50),
                order_number VARCHAR(50),
                sku VARCHAR(50),
                batch VARCHAR(50),
                status INT,
                

            )
            '''
            cursor.execute(create_table_query)
            print("Table 'cake.DTG_TAG' created successfully")
        else:
            print("Table 'cake.DTG_TAG' already exists")

        # Data to insert
        tag_ID = tag_ID
        item_ID = item_ID
        order_number = order_number
        sku = sku
        batch = batch
        status = status
        # Insert data into the table in the 'cake' schema
        insert_data_query = '''
            INSERT INTO cake.DTG_TAG (tag_ID, item_ID, order_number, sku, batch, status)
            VALUES (?, ?, ?, ?, ?, ?)
            '''
        cursor.execute(insert_data_query, (tag_ID, item_ID, order_number, sku, batch, status))
        connection.commit()
        print("Data inserted successfully")

    except odbc.Error as ex:
        print("Error:", ex)

    finally:
        # Close the connection
        if connection:
            cursor.close()
            connection.close()
            print("Connection closed")

def update_DT_tag(tag_ID, new_status):
    # SQL query to update the status based on the tag_ID
    update_status_query = '''
        UPDATE cake.DTG_TAG
        SET status = ?
        WHERE tag_ID = ?
        '''

    try:
        # Connect to the SQL Server
        conn = odbc.connect(connection_string)
        cursor = conn.cursor()

        # Update the status
        cursor.execute(update_status_query, (new_status, tag_ID))
        conn.commit()

        # Check how many rows were affected
        if cursor.rowcount > 0:
            print(f"Status updated successfully for tag_ID {tag_ID}.")
        else:
            print(f"No record found with tag_ID {tag_ID}.")

    except odbc.Error as ex:
        print("Error:", ex)

    finally:
        if conn:
            cursor.close()
            conn.close()
            print("Connection closed.")


DTG_tag_db_insert('jaftag','123jaf','jaf','jaf','jaftestbatch',0)   