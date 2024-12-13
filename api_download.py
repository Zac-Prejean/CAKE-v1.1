
from config import *

# Initialize used_numbers and current_index  
used_numbers = set()  
current_index = 1  
 
def generate_custom_id_tag():  
    global current_index  
     
    # Generate a unique 4-digit random number  
    random_number = random.randint(1000, 9999)  
    while random_number in used_numbers:  
        random_number = random.randint(1000, 9999)  
    used_numbers.add(random_number)  
     
    # Format the index to be 4 digits  
    index_str = f"{current_index:04}"  
     
    # Increment the index and reset if necessary  
    current_index += 1  
    if current_index > 9999:  
        current_index = 1  
     
    return f"{random_number}{index_str}"  

def create_txt_file(order_number, item_options, sku, index, order_total_qty, txt_output_folder, custom_field_3, customtagID):  
    current_datetime = datetime.now().strftime("%m-%d-%Y %H:%M")  
    file_path = os.path.join(txt_output_folder, f"{custom_field_3}.txt")  
    #archive_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), '\\\\comwin2k19dc01\\Shares\\CAKE', 'Batch.txt', 'DTG', 'archive', f"{custom_field_3}_archive.txt")  
    archive_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), '\\\\192.168.80.254\\Shares\\CAKE', 'Batch.txt', 'DTG', 'archive', f"{custom_field_3}_archive.txt")  
  
    with open(file_path, 'a') as file:  
        file.write(f"{customtagID}_{order_number}_{item_options}_{order_total_qty}_{sku}_{custom_field_3}_Designed_{current_datetime}_0\n")  
  
    with open(archive_path, 'a') as archive_file:  
        archive_file.write(f"{customtagID}_{order_number}_{item_options}_{order_total_qty}_{sku}_{custom_field_3}_Archive_{current_datetime}_0\n")  
  
    return customtagID 

def process_csv(file_path, order_number, item_qty, item_options, customtagID):  
    with open(file_path, newline='') as csvfile:  
        reader = csv.DictReader(csvfile)  
        for row in reader:  
            item_id = item_options  # Assuming Item_ID is stored in 'Item - Options'  
            get_order_images(order_number, item_qty, item_id, customtagID)  
  
def get_order_images(order_number, item_qty, item_id, customtagID):  
    url = "https://cwa.completeful.com/api/GetScannedOrderNumberDetails"  
    payload = json.dumps({"OrderNumber": order_number})  
    headers = {'Content-Type': 'application/json'}  
    print("Debug")
    try:  
        response = requests.request("GET", url, headers=headers, data=payload)  
        #print(response)
        if response.status_code != 200:  
            print(f"API call failed with status code: {response.status_code}")  
            return  
           
        dictr = response.text  
        response_dict = json.loads(dictr)  
        jsonob = response_dict["items"]    
        print(f"Target Item: {item_id}")            
        for item in jsonob:
            if str(item["orderItemId"]) == str(item_id):  
                print(f"MATCH: {item_id}")
                download_images(item, item_id, customtagID)
                break  
           
    except Exception as e:  
        print(f"Order_Number {order_number} has failed please check. Error: {e}")
def get_front_back(order_number, item_id):  
    url = "https://cwa.completeful.com/api/GetScannedOrderNumberDetails"  
    payload = json.dumps({"OrderNumber": str(order_number)})  
    headers = {'Content-Type': 'application/json'}  

    response = requests.request("GET", url, headers=headers, data=payload) 
    response_status =  response.status_code
    if response_status != 200:  
        print(f"API call failed with status code: {response_status}")  
        return  
    response_dict = json.loads(response.text)  
    jsonob = response_dict["items"]
    match =0
    #print(f"Target Item: {item_id}")   
    for item in jsonob:
        if ((str(item["orderItemId"]) == str(item_id))):  
            match = 1
            #print(f"MATCH: {item_id}") 
            match_item = item

    if match ==0:
        print("ERROR: There is an issue with the item id matching within order number order details", item_id )

    front, back = get_modifiers(match_item, item_id)      
    return front, back 

def get_modifiers(item, item_id):
    options = item.get('options')
    front = 0
    back = 0
    for op in options:
        if 'design.areas' in op.get('name'):
            if 'front' in op.get('value'):
                front = 1
            if 'back' in op.get('value'):
                back = 1
    if (front == 0 and back == 0):
        print("ERROR: There is a design issue with  ", item_id)
        print(options)
        


    return front, back 
 
def download_images(item, item_id, customtagID):  
    front = 0
    back = 0
    try:
       
        #print(item)
        #print('test')
        options = item.get('options')
        #print(options)
        lines = item.get('orderItemId')
        #print(lines)
        if str(lines) == str(item_id):
            image_prefix = str(customtagID) + '_' + str(lines) + '_'
            image_suffix = '.png'
            for op in options:
                if 'design.areas' in op.get('name'):
                    if 'front' in op.get('value'):
                        front = 1
                    if 'back' in op.get('value'):
                        back = 1
            for option in options:
                url_identifier = option.get('value')
                option_identifier = (option.get('name')).replace(" ","_")
                # print(option_identifier)
                if 'https' in url_identifier:
                    name = image_prefix + option_identifier + image_suffix
                    url = option.get('value')
                    ####Handle mockups####
                    if 'preview' in url_identifier:
                        if 'full' in option_identifier:
                            name = name.replace('full','mockup')
                            if 'back' in option_identifier and back==True:
                                # print('getting back mockup image')
                                download_png(url, name)
                            if 'front' in option_identifier and front==True:
                                url = option.get('value')
                                # print('getting front mockup image')
                                download_png(url, name)
                        else:
                            option_identifier = option_identifier + '_mockup'
                            name = image_prefix + option_identifier + image_suffix
                            if 'back' in option_identifier and back==True:
                                url = option.get('value')
                                # print('getting back mockup image')
                                download_png(url, name)
                            if 'front' in option_identifier and front==True:
                                url = option.get('value')
                                # print('getting front mockup image')
                                download_png(url, name)
                    if 'print' in url_identifier:
                        if 'back' in option_identifier and back==True:
                                # print('getting back print image')
                                download_png(url, name)
                        if 'front' in option_identifier and front==True:
                                # print('getting front print image')
                                download_png(url, name)
        if (front == 0 and back == 0):
            print("ERROR: There was an issue retrieving the images", item_id)

    except Exception as e:  
        print(f"Order_Number {item_id} has failed please check. Error: {e}")
 
 
def download_png(url, file_name): 
     
    DOWNLOAD_FOLDER = str(Path.home() / 'Downloads') 
    # if remote_activator == 1:
    #     dtg_folder = DOWNLOAD_FOLDER
    # else:
    dtg_folder = os.path.join(os.path.dirname(os.path.realpath(__file__)), '\\\\comwin2k19dc01\\Shares\\Designs-DTG') 

    full_path_down = os.path.join(dtg_folder, file_name)    
    urllib.request.urlretrieve(url, full_path_down)
    # Check if the file exists and is not empty
    i = 0
    while True:
        if os.path.exists(full_path_down) and os.path.getsize(full_path_down) > 0:
            print(f"Download successful: {full_path_down}")
            break

        if i==10:
            print("Download failed or file is empty.")
            return None  # Optionally handle the error here
        i =i +1
    return full_path_down