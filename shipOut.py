import json  
import base64  
import requests  
import socket  
import os  
import urllib.request  
from pathlib import Path  
from flask import Flask, request, jsonify, render_template  
import ctypes  
from DTG_TAG_DB import *
from fpdf import FPDF
script_dir = os.path.dirname(os.path.realpath(__file__))  
hidapi_path = os.path.join(script_dir, 'hidapi.dll')  
  
ctypes.CDLL(hidapi_path)  
  
import hid
  
try:  
    for device in hid.enumerate():  
        pass 
except Exception as e:  
    print(f"Error: {e}")

m_2_in_factor = 39.3701  
scale_height_offset = 2  
  
# Camera Connection Information  
device_ip = "169.254.141.72"  
device_port = 50010  
  
# Scale Connection information  
# This is the HID information for a Dymo S100 Scale  
VID = 0x0922  
PID = 0x8009  
  
pdf_directory = 'static/'  

def url_to_base64(url):
    # Fetch the content from the URL
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Encode the content to Base64
        encoded_content = base64.b64encode(response.content).decode('utf-8')
        return encoded_content
    else:
        raise Exception(f"Failed to retrieve content. Status code: {response.status_code}")
  
def download_png(url, file_name):  
    full_path = os.path.join(pdf_directory, file_name)  
    urllib.request.urlretrieve(url, full_path)  
    print(full_path)  
    return full_path  

def test():
    response = "https://vendor.zazzle.com/v100/api.aspx?method=getshippingdocument&tracking=1ZB347070300007622&type=1&hash=f8968400ade47331b52280b783ba19d6&page=0"
    file_name = "Labels-" + '1234' + ".pdf"  
    if 'https' in response:
        pdf64 = url_to_base64(response)
        print(pdf64)
    else:
        sr = response.split(';')  
        pdf64 = sr[1].split(',')
        pdf64 = pdf64[1]  

    pdf_filename = file_name  
    pdf_path = os.path.join(str(Path.home() / 'Downloads'), pdf_filename)  
    with open(pdf_path, "wb") as f:  
        f.write(base64.b64decode(pdf64))  
    if pdf_filename:  
        pdf_path = os.path.join(str(Path.home() / 'Downloads'), pdf_filename)  
        #update_DTG_order_status(order_number, 4)
        return jsonify({'status': 'success', 'pdf_path': pdf_path})  
    else:  
        return jsonify({'status': 'error', 'message': 'Barcode not found.'}), 404  
    
def receive_data_from_device(ip, port):  
    # Create a TCP/IP socket  
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:  
        # Connect the socket to the device (IP address and port)  
        sock.connect((ip, port))  
        print(f"Connected to {ip}:{port}")  
        good_read = 0  
        print("Waiting for a good read")  
        while True:  
            # Receive data from the device  
            camera = sock.recv(2147483647)  
            camera_data = str(camera).strip()  
            camera_list = camera_data.split(';')  
            try:  
                length = round(float(camera_list[4]) * m_2_in_factor, 1)  
                print("length: " + str(length) + " in")  
                width = round(float(camera_list[2]) * m_2_in_factor, 1)  
                print("Width: " + str(width) + " in")  
                height = round(float(camera_list[3]) * m_2_in_factor - 2, 1)  
                print("height: " + str(height) + " in")  
                break  
            except:  
                pass  
    return length, width, height  
  
def get_scale_data():  
    # Creation of scale object  
    units = 0  
    scale = hid.Device(VID, PID).read(64)  
    while True:  
        try:  
            # Converting Byte date to integer  
            scale_data = list(scale)  
            units = scale_data[2]  
            # Scale is in lbs if units is 12 and in kg if 3  
            if (units == 3):  
                unitstr = "kg"  
            if (units == 12):  
                unitstr = "lb"  
            # Converting weight to correct decimal place  
            weight = scale_data[4] / 10  
            print("package weight: " + str(weight) + " " + unitstr)  
            break  
        except:  
            print("Turn Scale on")  
    return weight  
  
def init_ship_out_routes(app):  
    @app.route('/shipOut', methods=['GET', 'POST'])  
    def shipOut():  
        barcode = None  
        if request.method == 'POST':  
            barcode = request.form.get('barcode', barcode=barcode)  
            use_sensors = request.form.get('use_sensors', use_sensors=use_sensors)  
        return render_template('shipOut.html')  
  
    @app.route('/order_details', methods=['POST'])  
    def order_details():  
        #image_folder = 'static'  
        #barcode = request.json.get('barcode')
        input_bar = request.json.get('barcode')
        print(len(input_bar))
        if len(input_bar) < 11:
            print(len(input_bar))
            tag_ID = input_bar
            order_number = str(get_order_by_tag(tag_ID))
            #status = get_status_by_tag(tag_ID) 
        # if len(input_bar) > 11 and len(input_bar) < 17:
        #     item_ID = input_bar
        #     order_number = str(get_order_by_item_ID(item_ID))
        #     status = get_status_by_item_id(item_ID)
        if len(input_bar) > 17:
            order_number = input_bar

        print(order_number)
        url = "https://cwa.completeful.com/api/GetScannedOrderNumberDetails"  
        payload = json.dumps({"OrderNumber": str(order_number)})  
        headers = {'Content-Type': 'application/json'}        
        response = requests.request("GET", url, headers=headers, data=payload)  
        if response.status_code != 200:  
            print(f"API call failed with status code: {response.status_code}")  
            return  
        dictr = response.text  
        response_dict = json.loads(dictr)  
        jsonob = response_dict["items"]   
        print(jsonob)   
        preview_dict = []
        order_dict = []
        order_qty = 0     
        previewnotinoptions = 0
        try:

            for item in jsonob:
                #print(item)
                lineItemKey=item.get('lineItemKey')
                if lineItemKey == 'Discount':
                    break
                options = item.get('options')
                item_id = item.get('orderItemId')
                sku = item.get('sku')
                qty = item.get('quantity')
                
                order_qty = order_qty + int(qty)
                item_dict = [item_id,sku,qty]
                
                for option in options:
                    url_identifier = option.get('value')
                    name_identifier = option.get('name')
                    print(name_identifier)
                    if 'https' in url_identifier:
                        if 'print' in url_identifier:
                            continue
                        if 'print' in name_identifier:
                            continue
                        if 'preview' or 'merch' or 'mockup' or 'blank' or 'full' in name_identifier:
                            previewnotinoptions = previewnotinoptions + 1
                            #print('preview')
                            print(url_identifier)
                            preview_dict.append(url_identifier)
                            order_dict.append(item_dict)
        except:
            pass

            if previewnotinoptions == 0:
                url_identifier = item.get('imageUrl')
                #print(url_identifier)
                preview_dict.append(url_identifier)
                order_dict.append(item_dict)
        return jsonify({'status': 'success', 'order_quantity': order_qty, 'image_url' : preview_dict, 'order':order_dict})
  
    @app.route('/print-pdf', methods=['POST'])  
    def print_pdf():  
        barcode = request.json.get('barcode')  
        input_bar = barcode
        use_sensors = 0
        #use_sensors = request.json.get('use_sensors') 
        print(len(input_bar))
        if len(input_bar) < 11:
            print(len(input_bar))
            tag_ID = input_bar
            order_number = str(get_order_by_tag(tag_ID))
            status = get_status_by_tag(tag_ID) 
        # if len(input_bar) > 11 and len(input_bar) < 17:
        #     item_ID = input_bar
        #     order_number = str(get_order_by_item_ID(item_ID))
        #     status = get_status_by_item_id(item_ID)
        if len(input_bar) >17:
            order_number = input_bar

        
        barcode_scan = barcode  
        Order_number = "{0}".format(barcode_scan) 
        order_info = get_status_by_order(order_number)
        order_status = min(order_info)
        print(order_status)
        print(order_number)  
        file_name = "Labels-" + order_number + ".pdf"  
        url = "https://cwa.completeful.com/api/ShipScannedOrderNumber" 
        if order_status > 2 or order_status < 5: 
            if (use_sensors == 1):  
                dimensional_data = receive_data_from_device(device_ip, device_port)  
                length = dimensional_data[0]  
                width = dimensional_data[1]  
                height = dimensional_data[2]  
                weight = get_scale_data()  
                payload = json.dumps({"OrderNumber": order_number, "Weight": weight, "WeightUnits": "pounds", "Height": height, "Length": length, "Width": width, "DimUnits": "inches"})  
            else:  
                payload = json.dumps({"OrderNumber":order_number})  
            headers = {'Content-Type': 'application/json'}  
            response = requests.request("POST", url, headers=headers, data=payload)  
            response = response.text  
            if 'https' in str(response):
                pdf64 = url_to_base64(response)
                print(pdf64)
            else:
                sr = response.split(';')  
                pdf64 = sr[1].split(',')
                pdf64 = pdf64[1]  

            pdf_filename = file_name  
            pdf_path = os.path.join(str(Path.home() / 'Downloads'), pdf_filename)  
            with open(pdf_path, "wb") as f:  
                f.write(base64.b64decode(pdf64))  
            if pdf_filename:  
                pdf_path = os.path.join(str(Path.home() / 'Downloads'), pdf_filename)  
                update_DTG_order_status(order_number, 5)
                archive_order(order_number)
                return jsonify({'status': 'success', 'pdf_path': pdf_path})  
            else:  
                return jsonify({'status': 'error', 'message': response}), 404
        elif order_status == 5:
            return jsonify({'status': 'error', 'message': 'Order has already been shipped'}), 404
        else:
            return jsonify({'status': 'error', 'message': 'Not all items have progressed far enough in system'}), 404
  
    @app.route('/get_scale_data')  
    def get_scale_data():  
        units = 0  
        scale = hid.Device(VID, PID).read(64)  
        while True:  
            try:  
                scale_data = list(scale)  
                units = scale_data[2]  
                if (units == 3):  
                    unitstr = "kg"  
                if (units == 12):  
                    unitstr = "lb"  
                weight = scale_data[4] / 10  
                print("package weight: " + str(weight) + " " + unitstr)  
                break  
            except:  
                print("Turn Scale on")  
        return weight  
  
    @app.route('/get_camera_data')  
    def receive_data_from_device(ip, port):  
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:  
            sock.connect((ip, port))  
            print(f"Connected to {ip}:{port}")  
            good_read = 0  
            print("Waiting for a good read")  
            while True:  
                camera = sock.recv(2147483647)  
                camera_data = str(camera).strip()  
                camera_list = camera_data.split(';')  
                try:  
                    length = round(float(camera_list[4]) * m_2_in_factor, 1)  
                    print("length: " + str(length) + " in")  
                    width = round(float(camera_list[2]) * m_2_in_factor, 1)  
                    print("Width: " + str(width) + " in")  
                    height = round(float(camera_list[3]) * m_2_in_factor - 2, 1)  
                    print("height: " + str(height) + " in")  
                    break  
                except:  
                    pass  
        return length, width, height  
  
    @app.route('/get_package_data', methods=['POST'])  
    def getpackagedata():  
        use_sensors = request.json.get('use_sensors')  
        print(use_sensors)  
        dimensional_data = receive_data_from_device(device_ip, device_port)  
        length = dimensional_data[0]  
        width = dimensional_data[1]  
        height = dimensional_data[2]  
        weight = get_scale_data()  
        return jsonify({'status': 'success', 'length': length, 'width': width, 'height': height, 'weight': weight})  
  
