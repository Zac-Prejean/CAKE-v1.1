# app.py

import socket
import ctypes
from config import *
from designer import export_images 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.event import listens_for 
from datetime import date
from dateutil import parser
from tally import init_tally_routes
from sqlalchemy import create_engine, Column, Integer, String, text 
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import sessionmaker  
from shipOut import init_ship_out_routes
from DTG_CUBBY_DB import get_all_cubbies, get_cubby, delete_cubby, search_cubby
from DTG_TAG_DB import *
global_custom_field_3 = None

# cubby  
DTG_CUBBY_DB = os.path.join(DB_DIR, 'Batch.txt', 'DTG', 'cubby', 'DTG_cubby.db') 
ENGRAVING_CUBBY_DB = os.path.join(DB_DIR, 'Batch.txt', 'Engraving', 'cubby', 'Engraving_cubby_test.db') 
# tally 
DTG_TALLY_DB = os.path.join(DB_DIR, 'Batch.txt', 'DTG', 'tallyStatus', 'tally.db')
ENGRAVING_TALLY_DB = os.path.join(DB_DIR, 'Batch.txt', 'Engraving', 'tallyStatus', 'tally.db')
# status
DESIGNED_NUMBERS_FILE = os.path.join(DB_DIR, 'Batch.txt', 'DTG', 'status', f'{global_custom_field_3}.txt')
ARCHIVED_NUMBERS_FILE = os.path.join(DB_DIR, 'Batch.txt', 'DTG', 'archive', f'{global_custom_field_3}_archive.txt')
ENGRAVING_DESIGNED = os.path.join(DB_DIR, 'Batch.txt', 'Engraving', 'status', f'{global_custom_field_3}.txt')
ENGRAVING_ARCHIVED = os.path.join(DB_DIR, 'Batch.txt', 'Engraving', 'archive', f'{global_custom_field_3}_archive.txt')
# sign-in
PRODUCTION_DB_FILE = os.path.join(DB_DIR, 'Employee.db', 'production.db')  
ADMIN_DB_FILE = os.path.join(DB_DIR, 'Employee.db', 'admin.db') 
DOWNLOAD_FOLDER = str(Path.home() / 'Downloads') 

# flask app setup    
app = Flask(__name__)  
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DTG_CUBBY_DB}'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  
db = SQLAlchemy(app) 

# Database setup for production and admin  
production_db_engine = create_engine(f'sqlite:///{PRODUCTION_DB_FILE}')  
admin_db_engine = create_engine(f'sqlite:///{ADMIN_DB_FILE}') 

Base = declarative_base()  
  
class AdminUser(Base):  
    __tablename__ = 'admin_users'  
    id = Column(Integer, primary_key=True)  
    name = Column(String, nullable=False)  
    password = Column(String, nullable=False)  
  
class ProductionUser(Base):  
    __tablename__ = 'production_users'  
    id = Column(Integer, primary_key=True)  
    name = Column(String, nullable=False)  
    password = Column(String, nullable=False)  
  
# Creating sessions for admin and production databases  
AdminSession = sessionmaker(bind=admin_db_engine)  
ProductionSession = sessionmaker(bind=production_db_engine)  
  
# Create tables for main database if they don't exist  
with app.app_context():  
    db.create_all()  
  
# Initialize tally routes  
init_tally_routes(app, DTG_TALLY_DB) 

# ADMIN
@app.route('/admin')    
def admin():    
    return render_template('admin.html')  
  
app.route('/admin_update_status', methods=['POST'])  
def admin_update_status():  
    # Extract the required data from the request  
    order_number = request.form.get('order_number')  
    item_id = request.form.get('item_id')  
    new_status = request.form.get('new_status') 
  
    # Call the updateStatus function with the extracted is_admin parameter  
    result, status_code = updateStatus(order_number, item_id, new_status)  
    db_status = text2numstatusupdate(item_id,new_status)
    update_DTG_tag_status(item_id, db_status)

    return result, status_code

@app.route('/check_password', methods=['POST'])  
def check_password():  
    password = request.json.get('password', '').strip()  
    admin_session = AdminSession()  
    production_session = ProductionSession()  
  
    try:  
        admin_user = admin_session.execute(  
            text("SELECT * FROM IDCards WHERE EmployeeNumber = :password"), {'password': password}  
        ).fetchone() 
  
        if admin_user:  
            print("Password check successful")  
            return jsonify({"result": "success"})  
        else:  
            print("Password check failed")  
            return jsonify({"result": "failure"})  
    except Exception as e:  
        print(f"Error during password check: {e}")  
        return jsonify({"error": str(e)}), 500  
    finally:  
        admin_session.close()  
        production_session.close()  
  
@app.route('/signin', methods=['POST'])  
def signin():  
    employee_id = request.json.get('employeeID', '').strip()  
    admin_session = AdminSession()  
    production_session = ProductionSession()  
  
    try:  
  
        admin_user = admin_session.execute(  
            text("SELECT * FROM IDCards WHERE EmployeeNumber = :password"), {'password': employee_id}  
        ).fetchone()  
  
        production_user = production_session.execute(  
            text("SELECT * FROM IDCards WHERE EmployeeNumber = :password"), {'password': employee_id}  
        ).fetchone()  
  
        if admin_user:  
            print(f"Admin user signed in: {admin_user[1]}")  # Access by index  
            return jsonify({"result": "success", "employeeName": admin_user[1]})  
        elif production_user:  
            print(f"Production user signed in: {production_user[1]}")  # Access by index  
            return jsonify({"result": "success", "employeeName": production_user[1]})  
        else:  
            print("Sign-in failed")  
            return jsonify({"result": "failure"})  
    except Exception as e:  
        print(f"Error during sign-in: {e}")  
        return jsonify({"error": str(e)}), 500  
    finally:  
        admin_session.close()  
        production_session.close()  
  
# Routes 
@app.route('/cubbysystem')  
def cubbysystem():  
    scanned_numbers = get_all_cubbies()
    scanned_numbers_list = []
    for cubby in scanned_numbers:
        ItemID, OrderID, Qty, SKU, ScannedBy, CubbyID, Batch, DateTime = cubby
        cubby_list = {  
            "itemID": ItemID,  
            "qty": OrderID,  
            "Qty": Qty,  
            "sku": SKU,  
            "scannedBy": ScannedBy,
            "cubbyID": CubbyID,  
            "batch": Batch,  
            "dateTime": DateTime  
            }
        scanned_numbers_list.append(cubby_list)
    return render_template('cubbysystem.html', scanned_numbers=scanned_numbers_list)
 
@app.route('/add_box', methods=['POST'])  
def add_box():  
    try:  
        itemID = request.form['itemID']  
        orderID = request.form['orderID']  
        qty = int(request.form['qty'])  
        sku = request.form['sku']  
        batch = request.form['batch']  
        dateTime = request.form['dateTime']  
        scannedBy = request.form['scannedBy']  
        dateTime = parser.parse(dateTime)  
        sku = sku.replace('BLABEL', '')  
  
        cubbyID = get_cubby(itemID, orderID, qty, sku, scannedBy, batch, dateTime)  
  
        scanned_numbers = get_all_cubbies()  
        scanned_numbers_list = [  
            {  
                "itemID": scan["ItemID"],  
                "orderID": scan["OrderID"],  
                "qty": scan["Qty"],  
                "sku": scan["SKU"],  
                "scannedBy": scan["ScannedBy"],  
                "cubbyID": scan["CubbyID"],  
                "batch": scan["Batch"],  
                "dateTime": scan["DateTime"]  
            } for scan in scanned_numbers  
        ]  
        return jsonify({"scanned_numbers": scanned_numbers_list, "dateTime": dateTime.strftime('%m-%d-%Y %H:%M'), "cubbyID": cubbyID})  
    except Exception as e:  
        print("Error:", str(e))  
        return jsonify({"error": str(e)}), 500  
 
@app.route('/delete_box', methods=['POST'])  
def delete_box():  
    try:  
        box_number = int(request.form['box_number'])  
        # Delete all items associated with the box_number from the database  
        delete_cubby(box_number)  
        return jsonify({"result": "success"})  
    except Exception as e:  
        return jsonify({"error": str(e)}), 500    
    
@app.route('/search_item', methods=['GET'])  
def search_item():  
    search_term = request.args.get('search_term')  
    if not search_term:  
        return jsonify({"error": "Search term not provided"}), 400  

    items = search_cubby(search_term)  
    if not items:  
        return jsonify({"error": "Item not found"}), 404  

    results = [  
        {  
            "itemID": item["ItemID"],  
            "orderID": item["OrderID"],  
            "qty": item["Qty"],  
            "sku": item["SKU"],  
            "scannedBy": item["ScannedBy"],  
            "cubbyID": item["CubbyID"],  
            "batch": item["Batch"],  
            "dateTime": item["DateTime"]  
        }  
        for item in items  
    ]  
    return jsonify(results)  

@app.route('/set_global_custom_field_3/<value>')  
def set_global_custom_field_3(value):  
    global global_custom_field_3  
    global_custom_field_3 = value  
    print("Updated global_custom_field_3:", global_custom_field_3)  
    return "OK" 

@app.route('/get_image_data/<item_number>/<selected_filename>')  
def get_image_data(item_number, selected_filename):  
    # Construct the DESIGNED_NUMBERS_FILE path using the selected_filename  
    designed_numbers_file = os.path.join(os.path.dirname(os.path.realpath(__file__)), DESIGNS_DTG_PATH, 'Batch.txt', 'DTG', 'status', selected_filename) 
    # Read the status.txt file  
    with open(designed_numbers_file, 'r') as file:  
        lines = file.readlines()  
  
    # Find the line with the matching item_number  
    matching_line = None  
    for line in lines:  
        if line.startswith(item_number):  
            matching_line = line.strip()  
            break  
  
    if matching_line:  
        # Extract the image filename from the matching line  
        parts = matching_line.split('_')  
        image_filename = parts[2]  
  
        # Return the image filename  
        return jsonify({"filename": image_filename})  
    else:  
        return jsonify({"error": "Item number not found"}), 404 

@app.route('/get_scanned_numbers')  
def get_scanned_numbers():  
    scanned_numbers = get_all_cubbies()  
    return jsonify(scanned_numbers)  
 
@app.route('/get_order_and_total_quantity/<itemID>/<selectedTxtFile>')  
def get_order_and_total_quantity(itemID, selectedTxtFile):   
    file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), DESIGNS_DTG_PATH, 'Batch.txt', 'DTG', 'status', selectedTxtFile) 
    if not os.path.exists(file_path):  
        return "File not found", 404  
  
    with open(file_path, 'r') as file:  
        lines = file.readlines()  
  
    order_number = None  
    total_quantity = None  
  
    for line in lines:  
        number_parts = line.strip().split('_')  
        if number_parts[0] == itemID:  
            order_number = number_parts[1]  
            total_quantity = number_parts[3]  
            break  
  
    if order_number is not None and total_quantity is not None:  
        return jsonify({"order_number": order_number, "total_quantity": total_quantity})  
  
    return jsonify(None)  

# DESIGNER

@app.route('/designer')    
def designer():    
    return render_template('designer.html') 

def processing_generator(csv_data, folder_name, process_image, process_label, process_pick):         
    csv_reader = csv.DictReader(csv_data)          
    rows = [row for row in csv_reader]          
            
    df = pd.DataFrame(rows)

    processed_count = 0      
          
    for index, row in df.iterrows():    
        item_qty = int(row['Item - Qty'])    
        for qty_index in range(item_qty):    
            if pd.isna(row['Item - SKU']) or row['Item - SKU'] == "":            
                continue        
      
            # extract clean_sku from row['Item - SKU']      
            sku = row['Item - SKU'].strip()      
            clean_sku_match = re.search(r"(?:DSWCLR001)?UVP[A-Z0-9]+", sku)  
            if not clean_sku_match:  
                clean_sku_match = re.search(r"CLABEL[A-Z0-9]*", sku)
            if not clean_sku_match:  
                clean_sku_match = re.search(r"GLS[A-Z0-9]+", sku)  
            if not clean_sku_match:  
                continue  
            clean_sku = clean_sku_match.group(0) 

            processed_count += 1          
            progress_message = f"Processed order {row['Order - Number']}, {row['Item - SKU']}: {index}\n"           
            yield progress_message          
          
    yield f"Processing complete. Processed {processed_count} rows." 

@app.route('/run-script', methods=['POST'])  
def run_script():  
    global csv_load_count  
  
    process_image_str = request.form.get('processIMAGE', 'false')  
    process_image = process_image_str.lower() == 'true'  
    process_label_str = request.form.get('processLABEL', 'false')  
    process_label = process_label_str.lower() == 'true'  
    process_pick_str = request.form.get('processPICK', 'false')  
    process_pick = process_pick_str.lower() == 'true'  
    csv_file = request.files.get('csv_file')  
  
    if csv_file:  
        decoded_csv = csv_file.read().decode('utf-8')  
        # Check if the CSV file is empty  
        if not decoded_csv.strip():  
            return jsonify({"error": "Empty CSV file provided"}), 400  
        df = pd.read_csv(io.StringIO(decoded_csv))  
  
        # increment the csv_load_count  
        csv_load_count += 1  
  
        # create the full folder path with index  
        folder_name = f"{datetime.now().strftime('%m-%d-%Y %H%M')}"  
        full_folder_path = os.path.join(os.path.expanduser('~\\Downloads'), folder_name)  
        if not os.path.exists(full_folder_path):  
            os.makedirs(full_folder_path)  
  
        result = export_images(df, full_folder_path, process_image, process_label, process_pick)  
        if result is None or result.get('error'):  
            error_message = result.get('error', 'Unknown error occurred') if result else 'Unknown error occurred'  
            return jsonify({"error": error_message}), 400  
  
        return Response(stream_with_context(processing_generator(io.StringIO(decoded_csv), full_folder_path, process_image, process_label, process_pick)), mimetype='text/html')  
    else:  
        return jsonify({"error": "CSV file not provided"}), 400  


@app.route('/')    
def home():    
    return render_template('home.html')    


# PRECHECK
@app.route('/precheck')    
def precheck():    
    return render_template('precheck.html')    

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

@app.route('/printStation')    
def printStation():    
    return render_template('printStation.html')   

@app.route("/csv/combined.csv")  
def serve_combined_csv():  
    downloads_folder = os.path.join(os.path.expanduser("~"), "Downloads")  
    return send_from_directory(downloads_folder, "combined.csv") 

@app.route('/delete_combined_csv', methods=['POST'])  
def delete_combined_csv():  
    downloads_folder = os.path.join(os.path.expanduser("~"), "Downloads")  
    combined_csv_path = os.path.join(downloads_folder, "combined.csv")  
      
    try:  
        os.remove(combined_csv_path)  
        return jsonify({"message": "combined.csv deleted successfully."})  
    except FileNotFoundError:  
        return jsonify({"message": "combined.csv not found."})  
    except Exception as e:  
        return jsonify({"message": f"An error occurred while deleting combined.csv: {e}"})  
    

# SCAN-IN STATION

@app.route('/scanIn')      
def scanIn():    
    blank_image_path = url_for('blank_image')  
    return render_template('scanIn.html', blank_image_path=blank_image_path)  

@app.route('/Designed_status.txt')  
def designed_status_txt():  
    if global_custom_field_3 is None:  
        return "Custom field 3 not set", 404  
    file_path = DESIGNED_NUMBERS_FILE
    if not os.path.exists(file_path):  
        return "File not found", 404  
    return send_from_directory(os.path.dirname(file_path), os.path.basename(file_path)) 

@app.route('/dtg_item_description.json')
def dtg_item_description_json():
    file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'dtg_item_description.json')
    if not os.path.exists(file_path):
        return "File not found", 404
    return send_from_directory(os.path.dirname(file_path), os.path.basename(file_path))

@app.route('/images/<path:filename>')
def get_image(filename):
    directory = os.path.join(os.path.dirname(os.path.realpath(__file__)), DESIGNS_DTG_PATH) 
    return send_from_directory(directory, filename)
@app.route('/blank_image')  
def blank_image():  
    blank_image_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'background', 'clabel', 'blank_image.png')  
    if not os.path.exists(blank_image_path):  
        return "File not found", 404  
    return send_from_directory(os.path.dirname(blank_image_path), os.path.basename(blank_image_path))


# STATUS OF ITEM ID
@app.route('/update_status/<filename>', methods=['POST'])  
def update_status_route(filename):  
    item_id = request.form.get('itemID')  
    order_number = request.form.get('order_number')  
    itemName = request.form.get('itemName')  
    new_status = request.form.get('new_status')  
    scanned = request.form.get('scanned') == 'true'  
    cubby_number = request.form.get('cubby_number')  
    result, status_code = updateStatus(item_id, order_number, itemName, new_status, scanned, filename, cubby_number)  
    db_status = text2numstatusupdate(item_id,new_status)
    update_DTG_tag_status(item_id, db_status)
    return result, status_code 

@app.route('/update_all_items_status/<filename>', methods=['POST'])  
def update_all_items_status_route(filename):  
    order_number = request.form.get('order_number')  
    new_status = request.form.get('new_status')  
    cubby_number = request.form.get('cubby_number')  
  
    print("Filename:", filename)  
    print("Order number:", order_number)  
    print("New status:", new_status)  
    print("Cubby number:", cubby_number)  
  
    result, status_code = updateAllItemsStatus(order_number, new_status, filename, cubby_number)  
    db_status = text2numstatusupdate(order_number,new_status)
    update_DTG_order_status(order_number, db_status)
    return result, status_code  


@app.route('/get_status', methods=['POST'])    
def get_status():    
    scanned_number = request.form.get('scanned_number')    
    filename = request.form.get('filename')  
  
    if not filename:  
        return "Filename not provided", 400  
  
    status = getStatus(scanned_number, filename)  
    return status

@app.route('/get_designed_status/<filename>')       
def get_designed_status(filename):   
    folder = request.args.get('folder', 'status')  
    print(folder)
    file_path = os.path.join(CAKE_PATH, 'Batch.txt', 'DTG', folder, filename) 
    print(file_path)      
    if not os.path.exists(file_path) and folder == 'status':  
        # Check in the 'archive' folder if not found in 'status' folder  
        folder = 'archive'  
        file_path = os.path.join(CAKE_PATH, 'Batch.txt', 'DTG', folder, filename)  
     
    if not os.path.exists(file_path):  
        print("ISSUE")
        return jsonify({"error": "File not found"}), 404  
      
    with open(file_path, "r") as file:      
        content = file.readlines()      
    return jsonify({"content": content})  

@app.route('/get_txt_files', defaults={'folder': 'status'})  
@app.route('/get_txt_files/<folder>')  
def get_txt_files_route(folder):  
    files = get_txt_files(folder)  
    return jsonify(files)  

# SCAN-OUT
@app.route('/scanOut')
def scanOut():    
    return render_template('scanOut.html')    

# SHIP-OUT
init_ship_out_routes(app) 

# TEMPLATEMERGER
@app.route('/templatemerger')    
def templatemerger():    
    return render_template('templatemerger.html') 

app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER

pdf_directory = 'static/'
 
def download_png(url, file_name):
    full_path = os.path.join(pdf_directory, file_name)
    urllib.request.urlretrieve(url, full_path)
    print(full_path)

    return full_path 
if __name__ == '__main__':  
    print("Running C.A.K.E application... at http://127.0.0.1:5000")  
    app.run(debug=True)