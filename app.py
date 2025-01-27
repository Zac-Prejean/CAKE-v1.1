# app.py

import requests
import json
from config import *
from designer import export_images
from PIL import Image, ImageDraw, ImageFont
from tally import get_all 
from redo import init_redo_routes
from shipOut import init_ship_out_routes
from tally import get_all, get_today_started_total, get_today_ended_total
  
app = Flask(__name__)  

init_status_routes(app)
init_redo_routes(app)

# HOME   
@app.route('/')    
def home():    
    return render_template('home.html')  

# ADMIN 
@app.route('/admin')  
def admin():  
    try:  
        data = get_all_status()  
        print(f"Passing {len(data)} items to the template.")  
        return render_template('admin.html', data=data)  
    except Exception as e:  
        print(f"Error: {e}")  
        return render_template('admin.html', error=str(e)) 
init_admin_routes(app)

# CUBBYSYSTEM
@app.route('/cubbySystem')  
def cubbysystem():    
    return render_template('cubbySystem.html')
  
# TALLYPAGE   
@app.route('/tallyPage')  
def tallyPage():  
    tally_data = get_all()  
    total_started_today = get_today_started_total()  
    total_ended_today = get_today_ended_total()
    return render_template('tallyPage.html', tally_data=tally_data, total_started_today=total_started_today, total_ended_today=total_ended_today)  
 
# PRECHECK
@app.route('/precheck')  
def precheck():  
    return render_template('precheck.html')
init_precheck_routes(app)    
    
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

# TEMPLATEMERGER    
@app.route('/templateMerger')    
def templatemerger():    
    return render_template('templateMerger.html')

# REDOPAGE
@app.route('/redo')    
def redo():    
    return render_template('redo.html')

# SCAN-IN STATION
@app.route('/scanIn')      
def scanIn(): 
    return render_template('scanIn.html') 

@app.route('/api/images/<string:prefix>', methods=['GET'])
def get_images(prefix):
    images = []
    for filename in os.listdir(DESIGNS_DTG_PATH):
        if filename.startswith(prefix):
            images.append(filename)
    return jsonify(images)

@app.route('/images/<path:filename>')
def get_image(filename):
    directory = DESIGNS_DTG_PATH
    return send_from_directory(directory, filename)

# PRINT STATION
@app.route('/printStation')    
def printStation():    
    return render_template('printStation.html') 

# SCAN-OUT STATION
@app.route('/scanOut')
def scanOut():    
    return render_template('scanOut.html') 
init_cubby_routes(app)  

# SHIP-OUT STATION
init_ship_out_routes(app) 
   
if __name__ == '__main__':    
    print("Running Print Layout Lab application... at http://127.0.0.1:5000")    
    app.run(debug=True)