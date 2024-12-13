let originalTableContent;   
  
function reloadPage() {    
  location.reload();    
}    
    
setTimeout(reloadPage, 180000); // 6000 milliseconds = 1 minute  
  
document.addEventListener('DOMContentLoaded', fetchDesignedStatus);    

function onArchiveButtonClick() {  
  const archiveButton = document.getElementById("archiveButton");  
  
  if (archiveButton.textContent === "ARCHIVE") {  
    archiveButton.textContent = "STATUS";  
    loadTxtFilesDropdown("archive");  
  } else {  
    archiveButton.textContent = "ARCHIVE";  
    loadTxtFilesDropdown("status");  
  }  
}  
  
// Add this line inside your `DOMContentLoaded` event listener  
archiveButton.addEventListener("click", onArchiveButtonClick); 


function fetchDesignedStatus(selectedFile) {   
  let lineCountElement;     
  if (selectedFile instanceof Event) {    
    return;    
  }    
  
  function getBackgroundColor(status) {    
    switch (status) {    
      case 'Designed':    
        return '#736B99';    
      case 'Scanned-In':    
        return '#9094CC';    
      case 'Printed':    
        return '#ABBDFF';    
      case 'Scanned-Out':    
        return '#B38EDE';    
      case 'Cubby':    
        return '#BF5F97';    
      case 'Shipped':    
        return '#CC5566';    
      default:    
        return '';    
    }    
  }    
    
  fetch(`/get_designed_status/${encodeURIComponent(selectedFile)}`)  
  .then(response => response.json())  
  .then(data => {  
    const tableBody = document.getElementById('designed-status-table').getElementsByTagName('tbody')[0];  
    tableBody.innerHTML = '';  
    if (data.error) {  
      const errorRow = tableBody.insertRow();  
      const errorCell = errorRow.insertCell(0);  
      errorCell.colSpan = 9;  
      errorCell.innerText = data.error;  
    } else {  
      data.content.forEach(line => {  
        const [itemID, orderNumber, itemName, totalQty, skuPart, batch, status, date, cubby] = line.split('_');  
        const sku = `${skuPart}`.replace('BLABEL', '');  
        const lastScan = `${date}`.trim();  
  
        const row = tableBody.insertRow();  
        row.insertCell().innerText = itemID;  
        row.insertCell().innerText = orderNumber;  
        const itemNameCell = row.insertCell();  
        itemNameCell.innerHTML = `<a href="https://zstat.zazzle.com/order/${orderNumber}" target="_blank";">${itemName}</a>`;  
  
        const statusCell = row.insertCell();  
  
        // Check if the selected file is from the 'archive' folder  
        const isArchive = selectedFile.includes("archive");  
  
        if (!isArchive) {  
          const statusDropdown = document.createElement('select');  
  
          statusDropdown.innerHTML = `  
            <option value="Designed" ${status === 'Designed' ? 'selected' : ''}>Designed</option>  
            <option value="Scanned-In" ${status === 'Scanned-In' ? 'selected' : ''}>Scanned-In</option>  
            <option value="Printed" ${status === 'Printed' ? 'selected' : ''}>Printed</option>  
            <option value="Scanned-Out" ${status === 'Scanned-Out' ? 'selected' : ''}>Scanned-Out</option>  
            <option value="Cubby" ${status === 'Cubby' ? 'selected' : ''}>Cubby</option>  
            <option value="Shipped" ${status === 'Shipped' ? 'selected' : ''}>Shipped</option>  
          `;  
  
          function updateDropdownBackgroundColor() {  
            const selectedOption = statusDropdown.options[statusDropdown.selectedIndex];  
            statusDropdown.style.backgroundColor = getBackgroundColor(selectedOption.value);  
          }  
  
          updateDropdownBackgroundColor();  
  
          statusDropdown.onchange = function () {  
            updateStatus(itemID, orderNumber, itemName, this.value);  
            updateDropdownBackgroundColor();  
          };  
  
          statusCell.appendChild(statusDropdown);  
        } else {  
          // If it's an archive file, display only the status text  
          statusCell.innerText = status;  
        }  
  
        row.insertCell().innerText = lastScan;  
        row.insertCell().innerText = sku;  
        row.insertCell().innerText = totalQty;  
        row.insertCell().innerText = cubby;  
        row.insertCell().innerText = batch;  
      });

      lineCountElement = document.getElementById('line-count-indicator');    
      if (lineCountElement) {    
        lineCountElement.innerText = `Total Items: ${data.content.length}`;    
      }  
    }  
  })  
  .catch(error => {  
    console.error('Error fetching designed status:', error);  
  });  
}  

  
function loadTxtFilesDropdown(folder = "status") {  
  fetch(`/get_txt_files/${folder}`)  
    .then(response => response.json())  
    .then(files => {  
      const dropdown = document.getElementById('txt-files-dropdown');  
      dropdown.innerHTML = '';  
      files.forEach(file => {  
        const option = document.createElement('option');  
        option.value = file;  
        option.innerText = file;  
        dropdown.appendChild(option);  
      });  
  
      dropdown.addEventListener('change', function () {  
        fetchDesignedStatus(this.value);  
      });  
  
      if (files.length > 0) {  
        fetchDesignedStatus(files[0]);  
      }  
    })  
    .catch(error => {  
      console.error('Error fetching txt files:', error);  
    });  
}  
  
document.addEventListener('DOMContentLoaded', () => {  
});  
window.onload = function() {  
  loadTxtFilesDropdown();  
}; 
  
function searchItemTag(searchValue) {  
  const table = document.getElementById('designed-status-table');  
  const rows = table.getElementsByTagName('tr');  
  
  // Store original table content before the search, starting from the second row  
  if (!originalTableContent) {  
    originalTableContent = Array.from(rows).slice(1).map(row => row.cloneNode(true));  
  }  
  
  // Convert searchValue to lowercase  
  searchValue = searchValue.toLowerCase();  
  
  for (let i = 1; i < rows.length; i++) {  
    const cells = rows[i].getElementsByTagName('td');  
    const itemIdCell = cells[0];  
    const orderNumberCell = cells[1];  
    const itemNameCell = cells[2];  
    const skuCell = cells[5];  
    const statusCell = cells[3];  
  
    // Get the selected value from the <select> element and convert it to lowercase  
    const statusValue = statusCell.querySelector('select') ? statusCell.querySelector('select').value.toLowerCase() : statusCell.innerText.toLowerCase();  
  
    if (itemIdCell && orderNumberCell) {  
      if (itemIdCell.innerText.toLowerCase().indexOf(searchValue) > -1 || orderNumberCell.innerText.toLowerCase().indexOf(searchValue) > -1 || itemNameCell.innerText.toLowerCase().indexOf(searchValue) > -1 || skuCell.innerText.toLowerCase().indexOf(searchValue) > -1 || statusValue.indexOf(searchValue) > -1) {  
        rows[i].style.display = '';  
      } else {  
        rows[i].style.display = 'none';  
      }  
    }  
  }  
}  

function restoreOriginalTable() {  
  if (originalTableContent) {  
    const table = document.getElementById('designed-status-table');  
    const tbody = table.getElementsByTagName('tbody')[0];  
    tbody.innerHTML = '';  
  
    originalTableContent.forEach(row => {  
      tbody.appendChild(row);  
    });  
  
    originalTableContent = null;  
  }  
} 
  
function updateStatus(itemID, order_number, itemName, new_status) {  
  const formData = new FormData();  
  formData.append('itemID', itemID);  
  formData.append('order_number', order_number);  
  formData.append('itemName', itemName);  
  formData.append('new_status', new_status);  
  
  const selectedFile = document.getElementById('txt-files-dropdown').value;  
  
  fetch(`/update_status/${encodeURIComponent(selectedFile)}`, {  
    method: 'POST',  
    body: formData,  
  })  
    .then(response => {  
      response  
        .clone()  
        .text()  
        .then(text => console.log('Raw response text:', text));  
      return response.json();  
    })  
    .then(data => {  
      if (data.message) {  
        console.log(data.message);  
      } else if (data.error) {  
        console.error(data.error);  
      }  
    })  
    .catch(error => {  
      console.error('Error updating status:', error);  
    });  
}  



function showPasswordModal() {  
  return new Promise((resolve, reject) => {  
    const passwordModal = new bootstrap.Modal(  
      document.getElementById("passwordModal")  
    );  
    const submitButton = document.querySelector("#passwordModal .btn-primary");  
  
    passwordModal.show();  
  
    function handleModalHidden(event) {  
      submitButton.removeEventListener("click", handleSubmitButtonClick);  
    }  
  
    function handleSubmitButtonClick() {  
      const passwordInput = document.querySelector(  
        "#passwordModal #passwordInput"  
      );  
      const password = passwordInput.value;  
  
      checkPassword(password)  
        .then(() => {  
          passwordInput.value = "";  
          passwordModal.hide();  
          resolve(password);  
        })  
        .catch(() => {  
          passwordInput.value = "";  
          reject();  
        });  
    }  
  
    document  
      .getElementById("passwordModal")  
      .addEventListener("hidden.bs.modal", handleModalHidden, { once: true });  
    submitButton.addEventListener("click", handleSubmitButtonClick);  
  });  
}  

function checkPassword(input_password) {      
  return new Promise((resolve, reject) => { 
    fetch('/check_password', {  
      method: 'POST',  
      body: JSON.stringify({ password: input_password }),  
      headers: {  
        'Content-Type': 'application/json'  
      }  
    })  
    .then(response => {  
      if (!response.ok) {  
        throw new Error('Network response was not ok');  
      }  
      return response.json();  
    })  
    .then(data => {
  
      if (data.result !== 'failure') {  
        resolve();  
      } else {  
        alert('Incorrect password. Access denied.');  
        reject();  
      }  
    })  
    .catch(error => {  
      console.error('There was a problem with the fetch operation:', error);  
      reject();  
    });  
  });  
}   

function confirmDeleteBox() {  
  const password = document.getElementById('deletePasswordInput').value;  

  // Send a request to the Flask endpoint to check the password  
  fetch('/check_password', {  
      method: 'POST',  
      headers: {  
          'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({password: password}),  
  })  
  .then(response => response.json())  
  .then(data => {  
      if (data.result === 'success') {  
          const boxNumber = parseInt(document.getElementById('deleteBoxNumber').innerText, 10);  
          removeBox(boxNumber);  

          // Clear the password input field  
          document.getElementById('deletePasswordInput').value = '';  

          // Close the delete warning modal  
          $('#deleteWarningModal').modal('hide');  
          // Close the box info modal  
          $('#boxInfoModal').modal('hide');  
      } else {  
          alert('Incorrect password. Please try again.');  
      }  
  });  
}

  document.addEventListener('DOMContentLoaded', function() {  
    // Check if you are on the admin page  
    if (document.getElementById('admin-page')) {  
      showPasswordModal()  
        .then(password => {  
          return checkPassword(password);  
        })  
        .then(() => {  
          // The password is correct, display the content container and initialize your admin page here  
          document.querySelector('.content-container').style.display = 'block';  
        })  
        .catch(() => {  
          // The password is incorrect or not entered, the user is redirected to the home route  
          window.location.href = '/';  
        });  
    }   

    var deleteBoxBtn = document.getElementById('deleteBoxBtn');  
    if (deleteBoxBtn) {  
        deleteBoxBtn.addEventListener('click', function () {  
            const boxNumber = parseInt(document.getElementById('boxInfoNumber').innerText, 10);  
            deleteBox(boxNumber);  
        });  
    }  
    var confirmDeleteBtn = document.getElementById('confirmDeleteBtn');  
    if (confirmDeleteBtn) {  
        confirmDeleteBtn.addEventListener('click', confirmDeleteBox);  
    } 
  // Add event listeners for the password modal  
  if (document.getElementById('passwordModal')) {  
      document.getElementById('passwordModal').addEventListener('shown.bs.modal', function () {  
          document.getElementById('passwordInput').focus();  
      });  

      document.getElementById('passwordModal').addEventListener('hidden.bs.modal', function () {  
          document.getElementById('passwordInput').value = '';  
      });  
  }  
});   

document.addEventListener('DOMContentLoaded', function() {  
  // Check if the main element exists  
  const mainElement = document.querySelector('main');  
  if (mainElement) {  
      showPasswordModal()  
          .then(password => {  
              return checkPassword(password);  
          })  
          .then(() => {  
              // The password is correct, display the main element  
              mainElement.style.display = 'block';  
          })  
          .catch(() => {  
              // The password is incorrect or not entered, the user is redirected to the home route  
              window.location.href = '/';  
          });  
  }  
});  

function showWarningModal() {  
  return new Promise((resolve, reject) => {  
      const warningModal = new bootstrap.Modal(document.getElementById("warningModal"));  
      const submitButton = document.querySelector("#warningModal .btn-primary");  

      warningModal.show();  

      function handleModalHidden(event) {  
          submitButton.removeEventListener("click", handleSubmitButtonClick);  
      }  

      function handleSubmitButtonClick() {  
          const passwordInput = document.querySelector("#warningModal #warningPasswordInput");  
          const password = passwordInput.value;  
          checkPassword(password)  
              .then(() => {  
                  passwordInput.value = "";  
                  warningModal.hide();  
                  resolve(password);  
              })  
              .catch(() => {  
                  passwordInput.value = "";  
                  reject();  
              });  
      }  

      document.getElementById("warningModal").addEventListener("hidden.bs.modal", handleModalHidden, { once: true });  
      submitButton.addEventListener("click", handleSubmitButtonClick);  
  });  
}  

function showModal(status) {  
  const modal = document.getElementById("warningModal");  
  const mainElement = document.querySelector('main');  

  document.getElementById("modal-text").innerHTML = `This item has processed the <a href="#" class="status-link">${status}</a> stage. Check with supervisor.`;  

  // Hide main element when showing the warning modal  
  mainElement.style.display = 'none';  

  showWarningModal()  
      .then(() => {  
          // Password was correct, proceed with further actions  
          mainElement.style.display = 'block';  
          modal.style.display = "none";  
      })  
      .catch(() => {  
          // Password was incorrect  
          alert("Incorrect password. Access denied.");  
      });  
}  

document.addEventListener('DOMContentLoaded', function() {  
  const mainElement = document.querySelector('main');  
    
  if (mainElement) {  
      showPasswordModal()  
          .then(password => {  
              return checkPassword(password);  
          })  
          .then(() => {  
              // The password is correct, display the main element  
              mainElement.style.display = 'block';  
          })  
          .catch(() => {  
              // The password is incorrect or not entered, the user is redirected to the home route  
              window.location.href = '/';  
          });  
  }  
});  
