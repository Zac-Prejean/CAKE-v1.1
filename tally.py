import os  
import sqlite3 
import csv 
from io import StringIO   
from flask import Flask, render_template, request, jsonify, make_response, redirect, url_for
from datetime import datetime, date  
import json  
from config import *  
app = Flask(__name__)  
  

TALLY_DB_FILE = os.path.join(TALLY_DB_DIR, 'tally.db')  
  
def init_db(db_file):  
    conn = sqlite3.connect(db_file)  
    c = conn.cursor()  
    c.execute('PRAGMA journal_mode=WAL;')  # Enable WAL mode  
    c.execute('''  
        CREATE TABLE IF NOT EXISTS tally (  
            employee_name TEXT,  
            department_name TEXT,  
            scanned_in INTEGER,  
            printed INTEGER,  
            scanned_out INTEGER,  
            days_total INTEGER,  
            errors INTEGER,  
            batch TEXT,  
            date TEXT  
        )  
    ''')  
    conn.commit()  
    conn.close()  
    print("Table 'tally' created or already exists.")    
  
def get_all_dates(db_file):  
    dates = set()  
    conn = sqlite3.connect(db_file)  
    c = conn.cursor()  
    c.execute('SELECT DISTINCT date FROM tally')  
    rows = c.fetchall()  
    for row in rows:  
        # Normalize date format to 'MM/DD/YYYY'  
        normalized_date = datetime.strptime(row[0], "%m/%d/%Y").strftime("%m/%d/%Y")  
        dates.add(normalized_date)  
    conn.close()  
    return sorted(dates, key=lambda x: datetime.strptime(x, "%m/%d/%Y"))  
  
def init_tally_routes(app, db_file):  
    @app.route('/tallyPage')  
    def tallyPage():  
        date_param = request.args.get('date')  
        
        if date_param:  
            current_date = date_param  
        else:  
            current_date = date.today().strftime("%m/%d/%Y")  
    
        tally_data = []  
        total_scanned_in = 0  
        total_printed = 0  
        total_scanned_out = 0  
        days_total = None  # Initialize to None to capture the first row's "Day's Total"  
        employee_data = {}  
    
        all_dates = get_all_dates(db_file)  
        if current_date not in all_dates:  
            return render_template('tallyPage.html', tally_data=tally_data,  
                                scan_in_percentage=0,  
                                printed_percentage=0,  
                                scanned_out_percentage=0,  
                                employee_names=json.dumps([]),  
                                scanned_in_counts=json.dumps([]),  
                                printed_counts=json.dumps([]),  
                                scanned_out_counts=json.dumps([]),  
                                days_total=0,  
                                current_date=current_date,  
                                previous_date=None,  
                                next_date=None)  
    
        current_index = all_dates.index(current_date)  
        previous_date = all_dates[current_index - 1] if current_index > 0 else None  
        next_date = all_dates[current_index + 1] if current_index < len(all_dates) - 1 else None  
    
        conn = sqlite3.connect(db_file)  
        c = conn.cursor()  
        c.execute('SELECT * FROM tally WHERE date = ?', (current_date,))  
        rows = c.fetchall()  
        print(f"Contents of 'tally' table for date {current_date}: {rows}")  # Debug  
        for row in rows:  
            employee_name = row[0]  
            if employee_name not in employee_data:  
                employee_data[employee_name] = {  
                    'employee_name': employee_name,  
                    'scanned_in': 0,  
                    'printed': 0,  
                    'scanned_out': 0,  
                    'errors': 0  
                }  
            employee_data[employee_name]['scanned_in'] += row[2]  
            employee_data[employee_name]['printed'] += row[3]  
            employee_data[employee_name]['scanned_out'] += row[4]  
            employee_data[employee_name]['errors'] += row[6]  
            total_scanned_in += row[2]  
            total_printed += row[3]  
            total_scanned_out += row[4]  
            if days_total is None:  # Capture the "Day's Total" from the first row  
                days_total = row[5]  
    
        conn.close()  
    
        if days_total and days_total > 0:  
            scan_in_percentage = round((total_scanned_in / days_total / 2) * 100)  
            printed_percentage = round((total_printed / days_total / 2) * 100)  
            scanned_out_percentage = round((total_scanned_out / days_total / 2) * 100)  
        else:  
            scan_in_percentage = 0  
            printed_percentage = 0  
            scanned_out_percentage = 0  
    
        tally_data = list(employee_data.values())  
    
        return render_template('tallyPage.html', tally_data=tally_data,  
                            scan_in_percentage=scan_in_percentage,  
                            printed_percentage=printed_percentage,  
                            scanned_out_percentage=scanned_out_percentage,  
                            employee_names=json.dumps([emp['employee_name'] for emp in tally_data]),  
                            scanned_in_counts=json.dumps([emp['scanned_in'] for emp in tally_data]),  
                            printed_counts=json.dumps([emp['printed'] for emp in tally_data]),  
                            scanned_out_counts=json.dumps([emp['scanned_out'] for emp in tally_data]),  
                            days_total=days_total,  
                            current_date=current_date,  
                            previous_date=previous_date,  
                            next_date=next_date)  
 
    @app.route('/scan_in', methods=['POST'])  
    def scan_in():  
        data = request.json   
        
        employee_name = data.get('employee_name')  
        department_name = data.get('department_name')  
        batch = data.get('batch')  
        date = data.get('date')  
        
        # Normalize date format to 'MM/DD/YYYY'  
        date = datetime.strptime(date, "%m/%d/%Y").strftime("%m/%d/%Y")  
        
        conn = sqlite3.connect(TALLY_DB_FILE)  
        c = conn.cursor()  
        
        # Check if a record already exists for the given employee, batch, and date  
        c.execute('''  
            SELECT scanned_in, printed, scanned_out, days_total, errors  
            FROM tally  
            WHERE employee_name = ? AND batch = ? AND date = ?  
        ''', (employee_name, batch, date))  
        existing_record = c.fetchone()  
        
        if existing_record:  
            # Handle None values and update the existing record  
            new_scanned_in = (existing_record[0] or 0) + 1  
            new_printed = existing_record[1] or 0  
            new_scanned_out = existing_record[2] or 0  
            new_days_total = data.get('days_total')  # Assuming days_total is the same for the day  
            new_errors = existing_record[4] or 0  
            
            c.execute('''  
                UPDATE tally  
                SET scanned_in = ?, printed = ?, scanned_out = ?, days_total = ?, errors = ?  
                WHERE employee_name = ? AND batch = ? AND date = ?  
            ''', (new_scanned_in, new_printed, new_scanned_out, new_days_total, new_errors, employee_name, batch, date))  
        else:  
            # Insert a new record  
            c.execute('''  
                INSERT INTO tally (employee_name, department_name, scanned_in, printed, scanned_out, days_total, errors, batch, date)  
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)  
            ''', (employee_name, department_name, 1, 0, 0, data.get('days_total'), data.get('errors', 0), batch, date))  
        
        conn.commit()  
        conn.close()  

        return jsonify({"message": "Scan-in data recorded successfully."})  


    @app.route('/scan_printed', methods=['POST'])  
    def scan_printed():  
        data = request.json  
        
        employee_name = data.get('employee_name')  
        department_name = data.get('department_name')  
        batch = data.get('batch')  
        date = data.get('date')  
        
        # Normalize date format to 'MM/DD/YYYY'  
        date = datetime.strptime(date, "%m/%d/%Y").strftime("%m/%d/%Y")  
        
        conn = sqlite3.connect(TALLY_DB_FILE)  
        c = conn.cursor()  
        
        # Check if a record already exists for the given employee, batch, and date  
        c.execute('''  
            SELECT scanned_in, printed, scanned_out, days_total, errors  
            FROM tally  
            WHERE employee_name = ? AND batch = ? AND date = ?  
        ''', (employee_name, batch, date))  
        existing_record = c.fetchone()  
        
        if existing_record:  
            # Update the existing record  
            new_scanned_in = existing_record[0]  # Assuming scanned_in count remains the same  
            new_printed = existing_record[1] + 1  
            new_scanned_out = existing_record[2]  # Assuming scanned out count remains the same  
            new_days_total = data.get('days_total')  # Assuming days_total is the same for the day  
            new_errors = existing_record[4]  # Assuming errors count remains the same  
            
            c.execute('''  
                UPDATE tally  
                SET scanned_in = ?, printed = ?, scanned_out = ?, days_total = ?, errors = ?  
                WHERE employee_name = ? AND batch = ? AND date = ?  
            ''', (new_scanned_in, new_printed, new_scanned_out, new_days_total, new_errors, employee_name, batch, date))  
        else:  
            # Insert a new record  
            c.execute('''  
                INSERT INTO tally (employee_name, department_name, scanned_in, printed, scanned_out, days_total, errors, batch, date)  
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)  
            ''', (employee_name, department_name, 0, 1, 0, data.get('days_total'), data.get('errors', 0), batch, date))  
        
        conn.commit()  
        conn.close()  
        
        return jsonify({"message": "Printed data recorded successfully."})  

    def execute_query_with_retry(conn, query, params=(), retry_count=10, retry_delay=0.5):  
        for _ in range(retry_count):  
            try:  
                c = conn.cursor()  
                c.execute(query, params)  
                conn.commit()  
                return c.fetchall()  
            except sqlite3.OperationalError as e:  
                if 'database is locked' in str(e):  
                    time.sleep(retry_delay)  
                else:  
                    raise  
        raise sqlite3.OperationalError("Database is locked after multiple retries")  


    @app.route('/scan_out', methods=['POST'])  
    def scan_out():  
        data = request.json  
        employee_name = data.get('employee_name')  
        department_name = data.get('department_name')  
        batch = data.get('batch')  
        date = data.get('date')  
        date = datetime.strptime(date, "%m/%d/%Y").strftime("%m/%d/%Y")  
    
        conn = sqlite3.connect(TALLY_DB_FILE)  
        try:  
            query = '''  
                SELECT scanned_in, printed, scanned_out, days_total, errors  
                FROM tally  
                WHERE employee_name = ? AND batch = ? AND date = ?  
            '''  
            existing_record = execute_query_with_retry(conn, query, (employee_name, batch, date))  
    
            if existing_record:  
                new_scanned_in = existing_record[0][0]  
                new_printed = existing_record[0][1]  
                new_scanned_out = existing_record[0][2] + 1  
                new_days_total = data.get('days_total')  
                new_errors = existing_record[0][4]  
                query = '''  
                    UPDATE tally  
                    SET scanned_in = ?, printed = ?, scanned_out = ?, days_total = ?, errors = ?  
                    WHERE employee_name = ? AND batch = ? AND date = ?  
                '''  
                execute_query_with_retry(conn, query, (new_scanned_in, new_printed, new_scanned_out, new_days_total, new_errors, employee_name, batch, date))  
            else:  
                query = '''  
                    INSERT INTO tally (employee_name, department_name, scanned_in, printed, scanned_out, days_total, errors, batch, date)  
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)  
                '''  
                execute_query_with_retry(conn, query, (employee_name, department_name, 0, 0, 1, data.get('days_total'), data.get('errors', 0), batch, date))  
        finally:  
            conn.close()  
    
        return jsonify({"message": "Printed data recorded successfully."})
        
    @app.route('/error_count', methods=['POST'])  
    def error_count():  
        data = request.json  
        
        employee_name = data.get('employee_name')  
        department_name = data.get('department_name')  
        batch = data.get('batch')  
        date = data.get('date')  
        
        # Normalize date format to 'MM/DD/YYYY'  
        date = datetime.strptime(date, "%m/%d/%Y").strftime("%m/%d/%Y")  
        
        conn = sqlite3.connect(TALLY_DB_FILE)  
        c = conn.cursor()  
        
        # Check if a record already exists for the given employee, batch, and date  
        c.execute('''  
            SELECT scanned_in, printed, scanned_out, days_total, errors  
            FROM tally  
            WHERE employee_name = ? AND batch = ? AND date = ?  
        ''', (employee_name, batch, date))  
        existing_record = c.fetchone()  
        
        if existing_record:  
            # Update the existing record  
            new_scanned_in = existing_record[0]
            new_printed = existing_record[1]  
            new_scanned_out = existing_record[2]
            new_days_total = data.get('days_total') 
            new_errors = existing_record[4] + 1   
            
            c.execute('''  
                UPDATE tally  
                SET scanned_in = ?, printed = ?, scanned_out = ?, days_total = ?, errors = ?  
                WHERE employee_name = ? AND batch = ? AND date = ?  
            ''', (new_scanned_in, new_printed, new_scanned_out, new_days_total, new_errors, employee_name, batch, date))  
        else:  
            # Insert a new record  
            c.execute('''  
                INSERT INTO tally (employee_name, department_name, scanned_in, printed, scanned_out, days_total, errors, batch, date)  
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)  
            ''', (employee_name, department_name, 0, 0, 0, data.get('days_total'), data.get('errors', 1), batch, date))  
        
        conn.commit()  
        conn.close()  

        return jsonify({"message": "Printed data recorded successfully."})
    
    @app.route('/export_csv', methods=['GET'])  
    def export_csv():  
        conn = sqlite3.connect(TALLY_DB_FILE)  
        c = conn.cursor()  
        c.execute('SELECT * FROM tally')  
        rows = c.fetchall()  
        conn.close()  
  
        # Define the CSV output  
        si = StringIO()  
        writer = csv.writer(si)  
        writer.writerow(['Employee - Name', 'Department - Name', 'Scanned - In', 'Printed', 'Scanned - Out', "Day's - Total", 'Errors', 'Batch', 'Date'])  
  
        for row in rows:  
            writer.writerow(row)  
  
        # Prepare the response  
        output = make_response(si.getvalue())  
        output.headers['Content-Disposition'] = 'attachment; filename=tally_data.csv'  
        output.headers['Content-type'] = 'text/csv'  
  
        return output  
  
    @app.route('/downloadCSV')  
    def downloadCSV():  
        return redirect(url_for('export_csv'))


