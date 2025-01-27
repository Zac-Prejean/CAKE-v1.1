import pyodbc as odbc
#from api_download import get_order_images
# Define connection parameters
server = 'completefulserver.database.windows.net,1433'
database = 'MainDatabase'
username = 'JoeF'
password = 'SEg4FFFoQUP*5Fi**rD#kh3'
connection_string = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'

def text2numstatusupdate(item_id,newstatus):
    item_id = item_id
    if newstatus == 'Designed':
        return 0
    elif newstatus == 'Scanned-In':
        return 1
    elif newstatus == 'Printed':
        return 2
    elif newstatus == 'Scanned-Out':
        return 3
    elif newstatus == 'Cubby':
        return 4
    elif newstatus == 'Shipped':
        return 5
    
def get_connection():
    try:
        conn = odbc.connect(connection_string)
        return conn
    except odbc.Error as ex:
        print(f"Connection error: {ex}")
        return None
    
# Connect to the SQL Server
def add_tag(tag_ID, item_ID, order_number, sku, batch, status):
    try:
        connection = get_connection()
        if connection is None:
            print("Failed to connect to the database.")
            return None

        cursor = connection.cursor()

        # Data to insert
        tag_ID = str(tag_ID)
        item_ID = str(item_ID)
        order_number = str(order_number)
        sku = sku
        batch = batch
        status = status

        # Check if the entry already exists
        match_query = "SELECT * FROM cake.DTG_TAG WHERE tag_ID = ?"
        cursor.execute(match_query, (tag_ID,))
        line_id_check = cursor.fetchall()

        if line_id_check:
            print(f"Entry Already Exists in database {line_id_check}")
            return line_id_check[0][0]  # Return the existing customtagID

        # Insert data into the table in the 'cake' schema
        insert_data_query = """
        INSERT INTO cake.DTG_TAG (tag_ID, item_ID, order_number, sku, batch, status)
        VALUES (?, ?, ?, ?, ?, ?)
        """
        cursor.execute(insert_data_query, (tag_ID, item_ID, order_number, sku, batch, status))
        connection.commit()
        print("Data inserted successfully.")
        return tag_ID

    except odbc.Error as ex:
        print(f"An error occurred: {ex}")
        return None

    finally:
        if connection:
            connection.close()
            print("Connection closed")

def update_DTG_tag_status(tag_ID, new_status):
    tag_ID = str(tag_ID)
    # SQL query to update the status based on the tag_ID
    update_status_query = '''
        UPDATE cake.DTG_TAG
        SET status = ?
        WHERE tag_ID = ?
        '''

    try:
        # Connect to the SQL Server
        conn = get_connection()
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

def update_DTG_item_id_status(item_ID, new_status):
    item_ID = str(item_ID)
    # SQL query to update the status based on the tag_ID
    update_status_query = '''
        UPDATE cake.DTG_TAG
        SET status = ?
        WHERE item_ID = ?
        '''

    try:
        # Connect to the SQL Server
        conn = get_connection()
        cursor = conn.cursor()

        # Update the status
        cursor.execute(update_status_query, (new_status, item_ID))
        conn.commit()

        # Check how many rows were affected
        if cursor.rowcount > 0:
            print(f"Status updated successfully for item_ID {item_ID}.")
        else:
            print(f"No record found with item_ID {item_ID}.")

    except odbc.Error as ex:
        print("Error:", ex)

    finally:
        if conn:
            cursor.close()
            conn.close()
            print("Connection closed.")

def update_DTG_order_status(order_number, new_status):
    order_number = str(order_number)
    # SQL query to update the status based on the tag_ID
    update_status_query = '''
        UPDATE cake.DTG_TAG
        SET status = ?
        WHERE order_number = ?
        '''

    try:
        # Connect to the SQL Server
        conn = get_connection()
        cursor = conn.cursor()

        # Update the status
        cursor.execute(update_status_query, (new_status, order_number))
        conn.commit()

        # Check how many rows were affected
        if cursor.rowcount > 0:
            print(f"Status updated successfully for order_number {order_number}.")
        else:
            print(f"No record found with order_number {order_number}.")

    except odbc.Error as ex:
        print("Error:", ex)

    finally:
        if conn:
            cursor.close()
            conn.close()
            print("Connection closed.")
def get_order_by_tag(tag_ID):
    tag_ID = str(tag_ID)
    conn = get_connection()
    if conn:
        try:
            cursor = conn.cursor()

            # Find cubbies that match the provided orderID
            match_query = "SELECT * FROM cake.DTG_TAG WHERE tag_ID = ?"
            cursor.execute(match_query, (tag_ID,))
            order = cursor.fetchall()
            
            if order:
                for tag in order:
                    tag_id, item_ID, order_number, sku, batch, status = tag
                    if status != 5:
                        print(order_number)
                        return order_number
                    else:
                        return order_number
                        return f"Warning this order has been shipped: {order_number}"

        except odbc.Error as ex:
            print(f"There was a problem fetching this order number {ex}")

        finally:
            cursor.close()
            conn.close()

def get_status_by_tag(tag_ID):
    tag_ID = str(tag_ID)
    conn = get_connection()
    if conn:
        try:
            cursor = conn.cursor()

            # Find cubbies that match the provided orderID
            match_query = "SELECT * FROM cake.DTG_TAG WHERE tag_ID = ?"
            cursor.execute(match_query, (tag_ID,))
            order = cursor.fetchall()
            
            if order:
                for tag in order:
                    tag_id, item_ID, order_number, sku, batch, status = tag
                    if status != 5:
                        print(status)
                        return status
                    else:
                        print(f"Warning this order has been shipped: {order_number}")
                        return status

        except odbc.Error as ex:
            print(f"There was a problem fetching this order number {ex}")

        finally:
            cursor.close()
            conn.close()

def get_status_by_item_id(item_ID):
    item_ID = str(item_ID)
    conn = get_connection()
    if conn:
        try:
            cursor = conn.cursor()

            # Find cubbies that match the provided orderID
            match_query = "SELECT * FROM cake.DTG_TAG WHERE item_ID = ?"
            cursor.execute(match_query, (item_ID,))
            order = cursor.fetchall()
            print('DB CHECK')
            print(order)
            if order:
                print('order exists')
                for tag in order:
                    tag_id, item_ID, order_number, sku, batch, status = tag
                    if status != 5:
                        print(status)
                        return status
                    else:
                        print(f"Warning this order has been shipped: {order_number}")
                        return status
            else: 
                status = 69
                return status
        except odbc.Error as ex:
            print(f"There was a problem fetching this order number {ex}")

        finally:
            cursor.close()
            conn.close()

def get_order_by_item_ID(item_ID):
    item_ID = str(item_ID)
    conn = get_connection()
    if conn:
        try:
            cursor = conn.cursor()

            # Find cubbies that match the provided orderID
            match_query = "SELECT * FROM cake.DTG_TAG WHERE item_ID = ?"
            cursor.execute(match_query, (item_ID,))
            order = cursor.fetchall()
            
            if order:
                for tag in order:
                    tag_id, item_ID, order_number, sku, batch, status = tag
                    if status != 5:
                        return order_number
                    else:
                        return order_number
                        return f"Warning this order has been shipped: {order_number}"
            else:
                return 69
        except odbc.Error as ex:
            print(f"There was a problem fetching this order number {ex}")

        finally:
            cursor.close()
            conn.close()
def get_status_by_order(order_number):
    order_number = str(order_number)
    conn = get_connection()
    if conn:
        try:
            cursor = conn.cursor()
            tag_list = []
            # Find cubbies that match the provided orderID
            match_query = "SELECT * FROM cake.DTG_TAG WHERE order_number = ?"
            cursor.execute(match_query, (order_number,))
            tags = cursor.fetchall()
            
            if tags:
                for tag in tags:
                    tag_id, item_ID, order_number, sku, batch, status = tag
                    tag_list.append(status)
                return tag_list
                
            else:
                return 'Order number has been shipped or does not exist'

        except odbc.Error as ex:
            print(f"There was a problem fetching this order number {ex}")
        finally:
            cursor.close()
            conn.close()
def find_tags_by_order(order_number):
    order_number = str(order_number)
    conn = get_connection()
    if conn:
        try:
            cursor = conn.cursor()
            tag_list = []
            # Find cubbies that match the provided orderID
            match_query = "SELECT * FROM cake.DTG_TAG WHERE order_number = ?"
            cursor.execute(match_query, (order_number,))
            tags = cursor.fetchall()
            
            if tags:
                for tag in tags:
                    tag_id, item_ID, order_number, sku, batch, status = tag
                    tag_list.append(tag_id)
                return tag_list
                
            else:
                return 'Order number has been shipped or does not exist'

        except odbc.Error as ex:
            print(f"There was a problem fetching this order number {ex}")
        finally:
            cursor.close()
            conn.close()
def get_all_tags():  
    conn = get_connection()  
    try:  
        cursor = conn.cursor()  
        query = "SELECT * FROM cake.DTG_TAG"  
        cursor.execute(query)  
        tags = cursor.fetchall()  
        if tags:  
            tag_list = []  
            for tag in tags:  
                print(tag)
            return tags 
        else:  
            print("No Tags found.")  
            return []  
    except odbc.Error as ex:  
        print(f"Error querying cubbies: {ex}")  
        return []  
    finally:  
        if conn:  
            cursor.close()  
            conn.close()  
            print("Connection closed.")  
   

def delete_tag(status):  
    conn = get_connection()  
    if conn:  
        try:  
            cursor = conn.cursor()  
            # Delete the cubby with the specified cubbyID  
            delete_query = "DELETE FROM cake.DTG_TAG WHERE status = ?"  
            cursor.execute(delete_query, (status,))  
            conn.commit()  
            if cursor.rowcount > 0:  
                print(f"Tag with Status {status} deleted successfully.")  
            else:  
                print(f"No cubby found with cubbyID: {status}")  
        except odbc.Error as ex:  
            print(f"Error deleting cubby: {ex}")  
        finally:  
            cursor.close()  
            conn.close()  

def archive_order(order_number):
    order_number = str(order_number)
    # SQL query to update the status based on the tag_ID
    update_status_query = '''
        UPDATE cake.DTG_TAG
        SET tag_ID = ?
        WHERE order_number = ?
        '''

    try:
        # Connect to the SQL Server
        conn = get_connection()
        cursor = conn.cursor()
        archive_tag = 'Archive'
        # Update the status
        cursor.execute(update_status_query, ('Archive', order_number))
        conn.commit()

        # Check how many rows were affected
        if cursor.rowcount > 0:
            print(f"Tag updated successfully for order_number {order_number}.")
        else:
            print(f"No record found with order_number {order_number}.")

    except odbc.Error as ex:
        print("Error:", ex)

    finally:
        if conn:
            cursor.close()
            conn.close()
            print("Connection closed.")

#delete_tag(0)
def get_all_by_status(status):  
    conn = get_connection()  
    try:  
        cursor = conn.cursor()  
        match_query = "SELECT * FROM cake.DTG_TAG WHERE status = ?"
        cursor.execute(match_query, (status,)) 
        tags = cursor.fetchall()  
        if tags:  
            tag_list = []  
            for tag in tags:  
                print(tag)
            return tags 
        else:  
            print("No Tags found.")  
            return []  
    except odbc.Error as ex:  
        print(f"Error querying cubbies: {ex}")  
        return []  
    finally:  
        if conn:  
            cursor.close()  
            conn.close()  
            print("Connection closed.")  

#order_number = get_order_by_tag(78070036)
#order_info = get_status_by_order(order_number)
#order_status = min(order_info)
#print(order_status)
#print(order_number)  
#add_tag(37030002, 169680217275869249, 2500001099751933973,'GIL.G500L.XL.BLACK', '10232024KL', 0)
#get_all_tags()
##status = get_status_by_tag(32110188)
#print(status)
#if status <4:
    #print('yaya')
#else:
    #print('nope')
#get_all_by_status(4)
#update_DTG_order_status(2500001100224055466, 5)
#archive_order(2500001100224055466)
#t= find_tags_by_order(2500001100224055466)
#print(t)
#get_status_by_order(order_number)