import os  
import json  
import requests  
import pandas as pd  
from csv import DictWriter  
import time
from DTG_TAG_DB import get_order_by_item_ID
def appendrow(output_file, Order_Number, Item_Qty, Item_SKU, Item_Options, Due_Dates, Custom_Field3):  
    combined_dict = {  
        "Order - Number": Order_Number,  
        "Item - Qty": Item_Qty,  
        "Item - SKU": Item_SKU,  
        "Item - Options": Item_Options,  
        "Item - Name": Due_Dates,  
        "Custom - Field 3": Custom_Field3  
    }  
    # Read the existing CSV file into a DataFrame  
    try:  
        df = pd.read_csv(output_file)  
    except FileNotFoundError:  
        df = pd.DataFrame(columns=combined_dict.keys())  
  
    # Check for duplicates  
    is_duplicate = (  
        (df['Order - Number'] == Order_Number) &  
        (df['Item - Qty'] == Item_Qty) &  
        (df['Item - SKU'] == Item_SKU) &  
        (df['Item - Options'] == Item_Options) &  
        (df['Item - Name'] == Due_Dates) &  
        (df['Custom - Field 3'] == Custom_Field3)  
    ).any()  
  
    if not is_duplicate:  
        with open(output_file, 'a', newline='') as f_object:  
            dictwriter_object = DictWriter(f_object, fieldnames=combined_dict.keys())  
              
            # Write header if the file is empty  
            if f_object.tell() == 0:  
                dictwriter_object.writeheader()  
              
            dictwriter_object.writerow(combined_dict)  
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
  
def order_details(output_file, barcode, due_date):  
    #print('')  
    #print(barcode)
    #print(f"Converting Order Number: {barcode}")  
    url = "https://cwa.completeful.com/api/GetScannedOrderNumberDetails"  
    
    payload = json.dumps({"OrderNumber": str(barcode)})  
    headers = {'Content-Type': 'application/json'}  
    #print("Debug Test Point")
    try:  
        response = requests.request("GET", url, headers=headers, data=payload)  
        #print(response.text)
        response.encoding = 'ISO-8859-1'  # or 'latin1'  
        dictr = response.text  
        response_dict = json.loads(dictr)  
        jsonob = response_dict["items"]  
        
        for count in enumerate(jsonob):  
            Qty = count[1]["quantity"]  
            SKU = count[1]["sku"]  
            Item_Options = count[1]["orderItemId"]
            Item_Options_check = get_order_by_item_ID(Item_Options)
            #print(Item_Options_check)
            #print(Item_Options)
            if Item_Options_check == 69:
                for i in range(Qty):  
                    i = "{0}".format(i + 1)  
                    #print("---------------------------------------")
                    print(f"{Item_Options} Has not been added to data base adding it csv")
                    #print("---------------------------------------")
                    appendrow(output_file, barcode, Qty, SKU, Item_Options, due_date, "CustomField3")  
            else:
                skipped = 1
                #print(f"Skipping {Item_Options} Record already found in database")
    except Exception as e:
        time.sleep(5)  
        print('Rate Limited Slowing Down')
 
        try:
            response = requests.request("GET", url, headers=headers, data=payload)  
            #print(response.text)
            response.encoding = 'ISO-8859-1'  # or 'latin1'  
            dictr = response.text  
            response_dict = json.loads(dictr)  
            jsonob = response_dict["items"]  
            
            for count in enumerate(jsonob):  
                Qty = count[1]["quantity"]  
                SKU = count[1]["sku"]  
                Item_Options = count[1]["orderItemId"]
                Item_Options_check = get_order_by_item_ID(Item_Options)
                #print(Item_Options_check)
                #print(Item_Options)
                if Item_Options_check == 69:
                    for i in range(Qty):  
                        i = "{0}".format(i + 1)  
                        print("---------------------------------------")
                        print(f"{Item_Options} Has not been added to data base adding it csv")
                        print("---------------------------------------")
                        appendrow(output_file, barcode, Qty, SKU, Item_Options, due_date, "CustomField3")  
                else:
                    skipped = 1
                    #print(f"Skipping {Item_Options} Record already found in database")
        except Exception as e:
            print(f"API CALL FAIL: Order number {barcode}. Error: {e}")
def process_file_data(file_stream, file_type):  
    if file_type == 'xlsx':  
        df = pd.read_excel(file_stream)  
    elif file_type == 'csv':  
        df = pd.read_csv(file_stream)  
          
    DOWNLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Downloads")  
    output_file = os.path.join(DOWNLOAD_FOLDER, "combined.csv")  
      
    for index, row in df.iterrows():  
        if 'Package ID' in df.columns:  
            order_number = str(row['Package ID'])  
        else:  
            break  
        due_date = str(row['Ship By Date'])  
        order_details(output_file, order_number, due_date)  
          
    remove_duplicates(output_file)  
    print("CSV READY FOR LABEL GENERATION")  
      
    processed_df = pd.read_csv(output_file)  
    processed_data = processed_df.values.tolist()  
    processed_data.insert(0, list(processed_df.columns))  
      
    print('')  
    print(f"File converted. CSV exported to {DOWNLOAD_FOLDER}.")  
    print('')  
      
    return {"csv_url": "/csv/combined.csv"}  
