# redo.py

from config import *
from JEWELRY_REDO_DB import add_redo
def init_redo_routes(app):  
    @app.route('/submit_redo', methods=['POST'])  
    def redo_input():  
        #data = request.get_json()  
        #print(data)
        #signedInEmployeeName = data.get('signedInEmployeeName') 
        #print(signedInEmployeeName) 
        barcode = request.json.get("barcode")
        reason_string = request.json.get("reason")
        user = request.json.get("user")
        user = user.replace("SIGNED IN AS: ","")
        print(barcode)
        print(reason_string)
        print(user)
        try:
            redo = add_redo(barcode, reason_string, user, datetime.now())
            if redo == "Success":
                message =  "Redo Successfully Entered"
            else:
                message = redo
            return jsonify({"status": "success","message":message})
        except:
            return jsonify({"status": "error","message":"Something Went wrong"})
    
    @app.route('/export_redo', methods=['POST'])  
    def export_redos():
        redos = get_all_redos()