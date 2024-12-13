# DTG_CUBBY_DB.py

import pyodbc
import pyodbc as odbc
from config import *

# Define connection parameters
server = 'completefulserver.database.windows.net,1433'
database = 'MainDatabase'
username = 'JoeF'
password = 'SEg4FFFoQUP*5Fi**rD#kh3'
connection_string = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'

def get_connection():
    try:
        conn = odbc.connect(connection_string)
        return conn
    except odbc.Error as ex:
        print(f"Connection error: {ex}")
        return None

# ADDS DB INDEX CAN ONLY BE DONE ONCE!!!    
# def create_index():  
#     conn = get_connection()  
#     if conn:  
#         try:  
#             cursor = conn.cursor()  
#             cursor.execute("""  
#                 IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_cubbyID')  
#                 BEGIN  
#                     CREATE INDEX idx_cubbyID ON cake.DTG_cubby (cubbyID);  
#                 END  
#             """)  
#             conn.commit()  
#             print("Index created successfully")  
#         except pyodbc.Error as ex:  
#             print(f"Error creating index: {ex}")  
#         finally:  
#             cursor.close()  
#             conn.close() 
    
def get_all_cubbies():  
    conn = get_connection()  
    try:  
        cursor = conn.cursor()  
        query = "SELECT * FROM cake.DTG_cubby"  
        cursor.execute(query)  
        cubbies = cursor.fetchall()  
        if cubbies:  
            cubby_list = []  
            for cubby in cubbies:  
                cubby_list.append({  
                    "ItemID": cubby[0],  
                    "OrderID": cubby[1],  
                    "Qty": cubby[2],  
                    "SKU": cubby[3],  
                    "ScannedBy": cubby[4],  
                    "CubbyID": cubby[5],  
                    "Batch": cubby[6],  
                    "DateTime": cubby[7].strftime('%Y-%m-%d %H:%M:%S')  
                })  
            return cubby_list  
        else:  
            print("No cubbies found.")  
            return []  
    except odbc.Error as ex:  
        print(f"Error querying cubbies: {ex}")  
        return []  
    finally:  
        if conn:  
            cursor.close()  
            conn.close()  
            print("Connection closed.")  
   

def create_cubby(itemID, orderID, qty, sku, scannedBy, batch, dateTime):  
    conn = get_connection()  
    cubbyID = None  # Initialize cubbyID  
      
    if conn:  
        try:  
            cursor = conn.cursor()  
              
            # Find the next available cubbyID between 1 and 250  
            cursor.execute("""  
                SELECT MIN(cubbyID + 1)  
                FROM (  
                    SELECT 0 AS cubbyID  
                    UNION  
                    SELECT cubbyID  
                    FROM cake.DTG_cubby  
                ) AS subquery  
                WHERE (cubbyID + 1) <= 250  
                  AND (cubbyID + 1) NOT IN (SELECT cubbyID FROM cake.DTG_cubby)  
            """)  
              
            result = cursor.fetchone()  
            next_cubbyID = result[0] if result[0] is not None else 1  # If all 1-250 are occupied, start at 1  
              
            # Insert cubby into the DTG_cubby table  
            insert_query = '''  
            INSERT INTO cake.DTG_cubby (itemID, orderID, qty, sku, scannedBy, cubbyID, batch, dateTime)  
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)  
            '''  
            cursor.execute(insert_query, (itemID, orderID, qty, sku, scannedBy, next_cubbyID, batch, dateTime))  
            conn.commit()  
            cubbyID = next_cubbyID  # Set cubbyID to the newly created ID  
            print(f"Cubby created with cubbyID: {next_cubbyID}")  
          
        except pyodbc.Error as ex:  
            print(f"Error creating cubby: {ex}")  
          
        finally:  
            cursor.close()  
            conn.close()  
      
    return cubbyID  # Return cubbyID    
 
def get_cubby(itemID, orderID, qty, sku, scannedBy, batch, dateTime):  
    conn = get_connection()  
    cubbyID = None  # Initialize cubbyID  
    if conn:  
        try:  
            cursor = conn.cursor()  
            # Find cubbies that match the provided orderID  
            match_query = "SELECT * FROM cake.DTG_cubby WHERE orderID = ?"  
            cursor.execute(match_query, (orderID,))  
            cubbies = cursor.fetchall()  
            if cubbies:  
                for cubby in cubbies:  
                    print(f"ItemID: {cubby[0]}, OrderID: {cubby[1]}, Qty: {cubby[2]}, SKU: {cubby[3]}, ScannedBy: {cubby[4]}, CubbyID: {cubby[5]}, Batch: {cubby[6]}, DateTime: {cubby[7]}")  
                    cubbyID = cubby[5]  
                # Add the new item information to the existing cubby  
                insert_query = '''  
                INSERT INTO cake.DTG_cubby (itemID, orderID, qty, sku, scannedBy, cubbyID, batch, dateTime)  
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)  
                '''  
                cursor.execute(insert_query, (itemID, orderID, qty, sku, scannedBy, cubbyID, batch, dateTime))  
                conn.commit()  
            if cubbyID is None:  
                print(f"No cubbies found for orderID: {orderID}")  
                cubbyID = create_cubby(itemID, orderID, qty, sku, scannedBy, batch, dateTime)  
        except odbc.Error as ex:  
            print(f"Error finding cubby: {ex}")  
        finally:  
            cursor.close()  
            conn.close()  
    return cubbyID  # Return cubbyID  

def delete_cubby(cubbyID):  
    conn = get_connection()  
    if conn:  
        try:  
            cursor = conn.cursor()  
            # Delete the cubby with the specified cubbyID  
            delete_query = "DELETE FROM cake.DTG_cubby WHERE cubbyID = ?"  
            cursor.execute(delete_query, (cubbyID,))  
            conn.commit()  
            if cursor.rowcount > 0:  
                print(f"Cubby with cubbyID {cubbyID} deleted successfully.")  
            else:  
                print(f"No cubby found with cubbyID: {cubbyID}")  
        except odbc.Error as ex:  
            print(f"Error deleting cubby: {ex}")  
        finally:  
            cursor.close()  
            conn.close()  


def search_cubby(search_term):  
    conn = get_connection()  
    try:  
        cursor = conn.cursor()  
        # Search in both itemID and orderID  
        query = """  
            SELECT * FROM cake.DTG_cubby   
            WHERE itemID = ? OR orderID = ?  
        """  
        cursor.execute(query, (search_term, search_term))  
        cubbies = cursor.fetchall()  
        if cubbies:  
            cubby_list = []  
            for cubby in cubbies:  
                cubby_list.append({  
                    "ItemID": cubby[0],  
                    "OrderID": cubby[1],  
                    "Qty": cubby[2],  
                    "SKU": cubby[3],  
                    "ScannedBy": cubby[4],  
                    "CubbyID": cubby[5],  
                    "Batch": cubby[6],  
                    "DateTime": cubby[7].strftime('%Y-%m-%d %H:%M:%S')  
                })  
            return cubby_list  
        else:  
            print(f"No cubbies found for search term: {search_term}")  
            return []  
    except odbc.Error as ex:  
        print(f"Error searching cubbies: {ex}")  
        return []  
    finally:  
        if conn:  
            cursor.close()  
            conn.close()
            print("Connection closed.")

# cubbies = get_all_cubbies()
# print(cubbies)

