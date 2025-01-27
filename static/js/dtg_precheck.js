// dtg_precheck

// import { convertSku } from './convertSku.js';  
  
let csvUploaded = false;  
let parsedCsvData;  
let rowCount = 0;  
let xlsxFile;  
  
function handleFileSelect(evt) {  
    const file = evt.target.files[0];  
  
    if (isDTGSelected || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {  
        xlsxFile = file;  
        // Show the confirmation modal  
        $('#confirmation-modal').modal('show');  
    } else {  
        console.log("Processing CSV file"); 
        // Process the CSV file as usual  
        processCsvFile(file);  
    }  
}  
  
function processCsvFile(file) {  
    Papa.parse(file, {  
        complete: function (results) {  
            parsedCsvData = results.data;  
            $('#output').html(generateTableHtml(results.data));  
            $('#preview-modal').modal('toggle');  
            csvUploaded = true;  
        }  
    });  
}  
  
$("#csv-file").on("change", handleFileSelect);  
  
// Event listener for the DTG option  
document.getElementById('dtg-option').addEventListener('click', function() {   
    document.getElementById('script-placeholder').innerHTML = ''; // Clear any existing script  
    var dtgUrl = document.getElementById('script-placeholder').getAttribute('data-dtg-url');  
    loadScript(dtgUrl);  
    updateDropdownText('DTG'); // Update the dropdown button text  
    isDTGSelected = true; // Set the DTG flag to true  
});  
  
function loadScript(url) {  
    var script = document.createElement('script');  
    script.type = 'module';  
    script.src = url;  
    document.getElementById('script-placeholder').appendChild(script);   
}  
  
function updateDropdownText(text) {  
    document.getElementById('dropdownMenuButton').innerText = text;  
} 
   
$("#confirm-xlsx-btn").on("click", function () {  
    // Start the prompt  
    startLoadingBar();  
  
    // Process the confirmed file (either CSV or XLSX)  
    const formData = new FormData();  
    formData.append("file", xlsxFile);  
  
    fetch("/process_file", {  
        method: "POST",  
        body: formData  
    })  
    .then(response => response.json())  
    .then(data => {  
        // Fetch the combined.csv file from the server  
        fetch(data.csv_url)  
        .then(response => response.text())  
        .then(csvData => {  
            // Parse the CSV data  
            const results = Papa.parse(csvData);  
  
            // Update the UI with the parsed CSV data  
            parsedCsvData = results.data;
            csvUploaded = true;  
  
            // Hide the prompt  
            hidePrompt();  
        });  
    })  
    .catch(error => {  
        console.error("Error:", error); 
        hidePrompt(); // Hide the prompt in case of error
    });  
});  

function startLoadingBar() {  
    $("#please-stand-by-prompt").show();  
}  
  
function hidePrompt() {  
    $("#confirmation-modal").modal('hide');  
}
  
// function generateTableHtml(data) {  
//     const indicesToDisplay = [0, 1, 2, 4, 5]; // Indices to display, including "Due Date" and "Batch"  
//     const maxPersonalizationLength = 150;  
//     rowCount = 0;  
//     let tableHtml = '<table class="table table-bordered">';  
  
//     for (let i = 0; i < data.length; i++) {  
//         const row = data[i];  
//         if (i !== 0 && row[2] !== undefined) {  
//             row[2] = row[2].toUpperCase();  
//         }  
//         if (i === 0) {  
//             tableHtml += '<thead><tr>';  
//             for (let j = 0; j < row.length; j++) {  
//                 if (indicesToDisplay.includes(j)) {  
//                     if (j === 4) {  
//                         tableHtml += '<th>Due Date</th>';  
//                     } else if (j === 5) {  
//                         tableHtml += '<th>Batch</th>';  
//                     } else {  
//                         tableHtml += '<th>' + row[j] + '</th>';  
//                     }  
//                 }  
//             }  
//             tableHtml += '</tr></thead><tbody>';  
//         } else {  
//             if (row[2] === "") {  
//                 tableHtml += '<tr class="separator"><td colspan="6"></td></tr>';  
//                 continue;  
//             } else if (row.includes("Discount")) {  
//                 tableHtml += '<tr class="separator"><td colspan="6"></td></tr>';  
//                 continue;  
//             }  
  
//             rowCount++;  
//             tableHtml += '<tr>';  
//             for (let j = 0; j < row.length; j++) {  
//                 const sku = row[2];  
//                 const options = row[3];  
  
//                 // if (row[2]) {  
//                 //     row[2] = row[2].replace(/-/g, ' '); // Remove all "-" from row[2]  
//                 //     row[2] = convertSku(row[2]);  
//                 // }  
//                 if (typeof options === 'string') {  
//                     if (options.includes(', Art_Location_Front:') || options.includes(', Art_Location_Back:')) {  
//                         const skuWithoutBLabel = row[2].replace("BLABEL", "");  
//                         row[2] = "BLABEL" + skuWithoutBLabel;  
//                     }  
//                 }  
//                 if (j === 4) { // Adjusted block to handle "Due Date" column  
//                     tableHtml += '<td>' + row[j] + '</td>';  
//                 } else if (j === 5) { // Adjusted block to handle "Batch" column  
//                     tableHtml += '<td>' + row[j] + '</td>';  
//                 } else {  
//                     tableHtml += '<td>' + row[j] + '</td>';  
//                 }  
//             }  
  
//             // delete btn  
//             if (row.join('').trim() !== '') {  
//                 tableHtml += '<td><img src="/static/images/minus.svg" width="25" height="25" class="icon d-inline-block align-center delete-btn" alt="Delete Button" data-toggle="tooltip" data-placement="top" title="delete line" data-row-index="' + i + '"></td></tr>';  
//             } else {  
//                 tableHtml += '<td></td></tr>';  
//             }  
  
//             // non-editable CSV line view  
//             const itemOptionsText = row[3] !== undefined ? row[3] : '';  
//             let visibilityStyle = "";  
//             if (itemOptionsText.length > maxPersonalizationLength) {  
//                 visibilityStyle = "display: none;";  
//             }  
  
//             tableHtml += '<tr><td colspan="5" style="font-size: 12px; color: #999; padding-top: 0; text-align: left;' + visibilityStyle + '">';  
//             tableHtml += '<div class="csv-line" data-row-index="' + i + '">' + itemOptionsText + '</div>';  
//             tableHtml += '</td></tr>';  
//         }  
//     }  
//     tableHtml += '</tbody></table>';  
//     return tableHtml;  
// }  
  
// $("#csv-file").on("change", handleFileSelect);  
  
// $("#preview-button").on("click", function() {  
//     if (csvUploaded) {  
//         $('#preview-modal').modal('toggle');  
//     } else {  
//         $('#warning-modal').modal('show');  
//     }  
// });  
  
// $(".close").on("click", function() {  
//     $('#warning-modal').modal('hide');  
// });  
  
// let saveButtonClicked = false;  
// $('#save-changes-btn').on('click', function () {  
//     saveButtonClicked = true;  
//     $('#preview-modal').modal('hide');  
//     $('#confirmation-modal').modal('hide');  
// });  
  
// $(document).ready(function() {  
//     $('.close, .btn.btn-secondary').on('click', function() {  
//         $('#preview-modal').modal('hide');  
//         $('#confirmation-modal').modal('hide');  
//     });  
// });  
  
// $('#preview-modal').on('hidden.bs.modal', function () {  
//     if (saveButtonClicked) {  
//         const newBatchName = $('#batch-name-input').val().trim(); // Get the new batch name  
//         const filterDate = $('#filter-date-input').val().trim(); // Get the date to filter by  
  
//         console.log('New Batch Name:', newBatchName); // Debugging output  
//         console.log('Filter Date:', filterDate); // Debugging output  
  
//         // If filterDate is empty, don't filter the data  
//         let filteredData = filterDate ? parsedCsvData.filter((row, index) => {  
//             if (index === 0) return true; // Keep the header row  
//             return row[4] === filterDate; // Assuming the date is in the fifth column (index 4)  
//         }) : parsedCsvData;  
  
//         // Remove rows that are null or contain only empty fields  
//         filteredData = filteredData.filter(row => {  
//             return row !== null && row.join('').trim() !== '';  
//         });  
  
//         for (let i = 0; i < filteredData.length; i++) {  
//             const row = filteredData[i];  
//             if (row === null || row.includes("Discount") || i === 0) {  
//                 continue;  
//             }  
  
//             // Update the batch name in row 5  
//             row[5] = newBatchName;  
  
//         }  
  
//         const updatedCsv = Papa.unparse(filteredData);  
//         const blob = new Blob([updatedCsv], { type: "text/csv;charset=utf-8;" });  
//         const downloadLink = document.createElement("a");  
//         const url = URL.createObjectURL(blob);  
//         downloadLink.href = url;  
//         downloadLink.setAttribute("download", "updated_csv.csv");  
//         document.body.appendChild(downloadLink);  
//         downloadLink.click();  
//         document.body.removeChild(downloadLink);  
//         deleteCombinedCsv();  
//         saveButtonClicked = false;  
//     }  
// });  
  
// $(document).ready(function(){  
//     $('[data-toggle="tooltip"]').tooltip();  
// });  
  
// $(document).on('click', '.delete-btn', function () {  
//     const rowIndex = parseInt($(this).data('row-index'));  
//     parsedCsvData[rowIndex] = null;  
  
//     // Find the closest 'tr' element and also the previous and next 'tr' elements  
//     const currentRow = $(this).closest('tr');  
//     const prevRow = currentRow.prev('tr');  
//     const nextRow = currentRow.next('tr');  
  
//     // Remove the current row, the previous row, and the next row  
//     currentRow.remove();  
//     prevRow.remove();  
//     nextRow.remove();  
  
//     // Remove the non-editable CSV line view  
//     const csvLine = $('.csv-line[data-row-index="' + rowIndex + '"]');  
//     csvLine.remove();  
// });  
  
// function deleteCombinedCsv() {  
//     fetch("/delete_combined_csv", {  
//         method: "POST"  
//     })  
//     .then(response => response.json())  
//     .then(data => {  
//         console.log(data.message);  
//     })  
//     .catch(error => {  
//         console.error("Error:", error);  
//     });  
// }  
