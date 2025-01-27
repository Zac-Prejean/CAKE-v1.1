# precheck.py

import requests 
import os
import io   
import pandas as pd  
from csv import DictWriter  
import time 
import json  
from flask import request, jsonify, send_from_directory  
from DTG_TAG_DB import get_order_by_item_ID  
from datetime import datetime

def init_precheck_routes(app):  
    @app.route('/process_file', methods=['POST'])  
    def process_file():  
        file = request.files['file']  
        filename = file.filename  
        file_stream = io.BytesIO(file.read())  
        
        if filename.endswith('.xlsx'):  
            processed_data = process_file_data(file_stream, file_type='xlsx')  
        elif filename.endswith('.csv'):  
            processed_data = process_file_data(file_stream, file_type='csv')  
        else:  
            return jsonify({"error": "Unsupported file type"}), 400  
        
        return jsonify(processed_data)
    
    @app.route('/csv/<filename>', methods=['GET'])
    def download_csv(filename):
        DOWNLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Downloads")
        return send_from_directory(DOWNLOAD_FOLDER, filename)

    def appendrow(output_file, Order_Number, Item_Qty, Total_Order_Qty, Item_SKU, Item_Options, Due_Dates, Custom_Field3):  
        # Read the existing CSV file into a DataFrame  
        try:  
            df = pd.read_csv(output_file)  
        except FileNotFoundError:  
            df = pd.DataFrame(columns=["Line - ID", "Order - Number", "Item - Qty", "Total Order Qty", "Item - SKU", "Item - Options", "Item - Name", "Order - Date", "Custom - Field 3"])  

        new_rows = []
        # Check if Item_Qty is greater than one
        if Item_Qty > 1:
            for i in range(Item_Qty):
                new_line_id = f"{Item_Options}{i}"
                new_row = {
                    "Line - ID": str(new_line_id),
                    "Order - Number": Order_Number,
                    "Item - Qty": 1,
                    "Total Order Qty": Total_Order_Qty,
                    "Item - SKU": Item_SKU,
                    "Item - Options": Item_Options,
                    "Item - Name": Item_SKU,
                    "Order - Date": Due_Dates,
                    "Custom - Field 3": Custom_Field3.strftime('%m%d%Y %H%M')
                }
                new_rows.append(new_row)
        else:
            new_row = {
                "Line - ID": str(Item_Options),
                "Order - Number": Order_Number,
                "Item - Qty": Item_Qty,
                "Total Order Qty": Total_Order_Qty,
                "Item - SKU": Item_SKU,
                "Item - Options": Item_Options,
                "Item - Name": Item_SKU,
                "Order - Date": Due_Dates,
                "Custom - Field 3": Custom_Field3.strftime('%m%d%Y %H%M')
            }
            new_rows.append(new_row)

        new_df = pd.DataFrame(new_rows)
        
        # Check for duplicates  
        is_duplicate = ( 
            (df['Line - ID'].isin(new_df['Line - ID'])) &
            (df['Order - Number'] == Order_Number) &  
            (df['Item - Qty'].isin(new_df['Item - Qty'])) & 
            (df['Total Order Qty'] == Total_Order_Qty) & 
            (df['Item - SKU'] == Item_SKU) &  
            (df['Item - Options'] == Item_Options) &  
            (df['Item - Name'] == Item_SKU) &  
            (df['Order - Date'] == Due_Dates) &  
            (df['Custom - Field 3'] == Custom_Field3.strftime('%m%d%Y %H%M'))
        ).any()  
        
        if not is_duplicate:  
            df = pd.concat([df, new_df], ignore_index=True)
            df.to_csv(output_file, index=False)
        else:  
            print("Duplicate row found. No row appended.")
    
    def remove_duplicates(output_file):  
        try:  
            # Read the existing CSV file into a DataFrame  
            df = pd.read_csv(output_file)  
            # Drop duplicate rows  
            df.drop_duplicates(inplace=True)  
            
            # Save the DataFrame to the Downloads folder  
            df.to_csv(output_file, index=False)  
            print(f"The file {output_file} has been created.")  
            
            print("Duplicates removed successfully.")  
        except FileNotFoundError:  
            print(f"The file {output_file} does not exist.")  
        except Exception as e:  
            print(f"An error occurred: {e}")  
    
    def order_details(output_file, barcode, due_date, orderQuantities):  
        print('')  
        print(f"Converting Order Number: {barcode}")  
        url = "https://cwa.completeful.com/api/GetScannedOrderNumberDetails"  
    
        payload = json.dumps({"OrderNumber": barcode})  
        headers = {'Content-Type': 'application/json'}  
        try:  
            response = requests.request("GET", url, headers=headers, data=payload)  
            response.encoding = 'ISO-8859-1'  # or 'latin1'  
            dictr = response.text  
            response_dict = json.loads(dictr)  
            jsonob = response_dict["items"]  
    
            for count in enumerate(jsonob):  
                Qty = count[1]["quantity"]  
                SKU = count[1]["sku"]  
                Item_Options = count[1]["orderItemId"]  
                Total_Order_Qty = orderQuantities.get(barcode, 0)
                for i in range(Qty):  
                    i = "{0}".format(i + 1)  
                    appendrow(output_file, barcode, Qty, Total_Order_Qty, SKU, Item_Options, due_date, datetime.now())  # Pass current datetime
    
        except Exception as e:  
            print(f"API CALL FAIL: Order number {barcode}. Error: {e}")  
    
    def process_file_data(file_stream, file_type):  
        if file_type == 'xlsx':  
            df = pd.read_excel(file_stream)  
        elif file_type == 'csv':  
            df = pd.read_csv(file_stream)  
        
        DOWNLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Downloads")  
        current_datetime = datetime.now().strftime('%Y%m%d %H%M')
        output_file = os.path.join(DOWNLOAD_FOLDER, f"dtg_updated_{current_datetime}.csv")  
        
        orderQuantities = {}
        for index, row in df.iterrows():  
            if 'Package ID' in df.columns:  
                order_number = str(row['Package ID'])  
                item_qty = int(row['Quantity']) if 'Quantity' in row else 0
                if order_number not in orderQuantities:
                    orderQuantities[order_number] = 0
                orderQuantities[order_number] += item_qty
            else:  
                break  
        
        for index, row in df.iterrows():  
            if 'Package ID' in df.columns:  
                order_number = str(row['Package ID'])  
                due_date = str(row['Ship By Date'])  
                order_details(output_file, order_number, due_date, orderQuantities)  
        
        remove_duplicates(output_file)  
        print("CSV READY FOR LABEL GENERATION")  
        
        processed_df = pd.read_csv(output_file)  
        processed_data = processed_df.values.tolist()  
        processed_data.insert(0, list(processed_df.columns))  
        
        print('')  
        print(f"File converted. CSV exported to {DOWNLOAD_FOLDER}.")  
        print('')  
        
        return {"csv_url": f"/csv/dtg_updated_{current_datetime}.csv"}