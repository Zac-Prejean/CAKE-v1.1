// cubbysystem.js


function reloadPage() { 
  setTimeout(() => {  
    location.reload();  
  }, 1000); // Wait for 1 second before reloading 
}  
  
setTimeout(reloadPage, 90000); // Reload every 90 seconds

function startBackupScheduler() {  
  if (window.location.pathname === '/cubbysystem') {
    $.get('/cubbysystem', { start_backup: 'true' });  
  }  
}  

function stopBackupScheduler() {  
  if (window.location.pathname === '/cubbysystem' && document.hidden) {  
    $.get('/stop_backup');  
  }  
} 

window.addEventListener('load', startBackupScheduler);  

// SORT SCANNED NUMBERS
function organizeNumbers(scannedNumbers) {  
  const boxes = {};  
  scannedNumbers.forEach(numberWithDate => {  
      const { ItemID, OrderID, Qty, SKU, ScannedBy, CubbyID, Batch, DateTime } = numberWithDate;  
      const orderNumber = OrderID;  

      if (!boxes[orderNumber]) {  
          boxes[orderNumber] = [];  
      }  
      boxes[orderNumber].push({ ItemID, OrderID, Qty, SKU, ScannedBy, CubbyID, Batch, DateTime });  
  });  
  return boxes;  
}

// BOX MODAL
async function getImagePath(itemNumber, side) {  
  const selectedFilename = document.getElementById("txt-files-dropdown").value;  
  const response = await fetch(`/get_image_data/${itemNumber}/${selectedFilename}`);  
  if (response.ok) {  
    const data = await response.json();  
    const imageFilename = data.filename; // Replace 'filename' with the correct property name returned from the server  
    const imagePath = `/images/${imageFilename}_${side}.png`;  
    return imagePath;  
  } else {  
    return null;  
  }  
} 

function showBoxInfo(boxNumber, orderNumber, totalQuantity, firstScannedTime) {  
  document.getElementById('boxInfoNumber').innerText = boxNumber;  
  const boxInfoOrderNumber = document.getElementById('boxInfoOrderNumber');  
  boxInfoOrderNumber.innerHTML = `<a href="https://zstat.zazzle.com/order/${orderNumber}" target="_blank" class="red-text" text-decoration: none;">${orderNumber}</a>`;  
  $('#boxInfoModal').modal('show');  

  if (scannedOrders[orderNumber] === parseInt(totalQuantity, 10)) {  
      document.getElementById('completeBoxBtn').style.display = 'inline-block';  
      document.getElementById('deleteBoxBtn').style.display = 'none';  
  } else {  
      document.getElementById('completeBoxBtn').style.display = 'none';  
      document.getElementById('deleteBoxBtn').style.display = 'inline-block';  
  }  

  document.getElementById('boxInfoFirstScannedTime').innerText = firstScannedTime;  

  const scannedItemsContainer = document.getElementById('scannedItems');  
  scannedItemsContainer.innerHTML = ''; // Clear previous items  

  // Filter and display items that match the box number  
  const boxItems = scannedNumbers.filter(item => item.CubbyID == boxNumber);  

  boxItems.forEach(item => {  
      const { ItemID, SKU } = item;  

      const itemElement = document.createElement('div');  

      const itemIDElement = document.createElement('span');  
      itemIDElement.textContent = ItemID;  
      itemElement.appendChild(itemIDElement);  

      const skuElement = document.createElement('span');  
      skuElement.textContent = SKU;  
      itemElement.appendChild(skuElement);  

      scannedItemsContainer.appendChild(itemElement);  
  });  
} 

// CLOSE BUTTON
document.querySelectorAll('.closeModalBtn').forEach(function (closeBtn) {  
  closeBtn.addEventListener('click', function () {  
      if ($('#boxNumberModal').hasClass('show')) {  
          $('#boxNumberModal').modal('hide');  
      } else if ($('#boxInfoModal').hasClass('show')) {  
          $('#boxInfoModal').modal('hide');  
          $('input[type="search"]').focus();  
      } else if ($('#boxNumberModal').hasClass('show')) {  
          $('#boxNumberModal').modal('hide');  
          $('input[type="search"]').focus();  
      } else if ($('#alreadyScannedModal').hasClass('show')) {  
      $('#alreadyScannedModal').modal('hide');  
      } else if ($('#notScannedModal').hasClass('show')) {    
        $('#notScannedModal').modal('hide');  
      } else if ($('#invalidNumberModal').hasClass('show')) {    
        $('#invalidNumberModal').modal('hide');   
      }   
  });  
});  
document.addEventListener('keydown', function (event) {  
  if (event.key === 'Enter' || event.key === 'Escape') {  
      if ($('#boxNumberModal').hasClass('show')) {  
          $('#boxNumberModal').modal('hide');  
      } else if ($('#boxInfoModal').hasClass('show')) {  
          $('#boxInfoModal').modal('hide');  
          $('input[type="search"]').focus();   
      }  else if ($('#deleteWarningModal').hasClass('show')) {  
        $('#deleteWarningModal').modal('hide');  
        $('input[type="search"]').focus();  
    }  
  }  
}); 
document.getElementById('cancelDeleteBtn').addEventListener('click', function () {  
  $('#deleteWarningModal').modal('hide');  
  $('#boxInfoModal').modal('hide');  
  $('input[type="search"]').focus();  
}); 
document.getElementById('confirmCompleteBtn').addEventListener('click', async function () {  
  const boxNumber = parseInt(document.getElementById('completeBoxNumber').innerText, 10);  
  completeBox(boxNumber);  
  $('#completeWarningModal').modal('hide');  
  $('#boxInfoModal').modal('hide');  

  // Get the box items from the scanned items container  
  const scannedItemsContainer = document.getElementById('scannedItems');  
  const scannedItems = Array.from(scannedItemsContainer.children);  

  for (const itemElement of scannedItems) {  
    console.log("Scanned item textContent:", itemElement.textContent);  
} 

  // Get unique order numbers in the box  
  const orderNumbers = new Set(scannedItems.map(itemElement => itemElement.textContent));  

  console.log("Order numbers:", Array.from(orderNumbers));

  // Update the status for each unique order number in the box  
  for (const orderNumber of orderNumbers) {  
      // Call the updateStatus function for all items in the order  
      const selectedFilename = document.getElementById("txt-files-dropdown").value;  
      const updated = await updateStatus(orderNumber, "", "", "Shipped", selectedFilename);  
      if (!updated) {  
          console.error(`Failed to update status for order: ${orderNumber}`);  
      }  
  }  
});

$('#boxNumberModal, #boxInfoModal').on('hidden.bs.modal', function () {  
  $('input[type="search"]').focus();  
}); 

function removeBox(boxNumber) {  
  // Remove the box from the scannedNumbers array  
  scannedNumbers = scannedNumbers.filter(item => {  
      return item.CubbyID !== boxNumber;  
  });  

  // Update the scanned numbers on the server  
  $.post('/delete_box', { box_number: boxNumber }, function (data) {  
      if (data.result === 'success') {  
          console.log('Box deleted successfully');  
          // Reload the page after the box is deleted  
          location.reload();  
      } else {  
          console.error('Failed to delete the box');  
      }  
  });  
}  
 
// DELETE BUTTON  
function deleteBox(boxNumber) {  
  // Show the delete warning modal and set the box number  
  document.getElementById('deleteBoxNumber').innerText = boxNumber;  
  $('#deleteWarningModal').modal('show');  
}  

// Complete button event listener  
document.getElementById('confirmCompleteBtn').addEventListener('click', function () {  
  const boxNumber = parseInt(document.getElementById('completeBoxNumber').innerText, 10);  
  completeBox(boxNumber);  
  $('#completeWarningModal').modal('hide');  
});  

// Cancel complete button event listener  
document.getElementById('cancelCompleteBtn').addEventListener('click', function () {  
  $('#completeWarningModal').modal('hide');  
});  

// Complete button event listener  
document.getElementById('completeBoxBtn').addEventListener('click', function () {  
  const boxNumber = parseInt(document.getElementById('boxInfoNumber').innerText, 10);  
  showCompleteWarning(boxNumber);  
});  

// Function to show complete warning modal  
function showCompleteWarning(boxNumber) {  
  document.getElementById('completeBoxNumber').innerText = boxNumber;  
  $('#completeWarningModal').modal('show');  
}  

// Function to complete the box  
function completeBox(boxNumber) {  
  // Remove the box  
  removeBox(boxNumber);  
  // Close the modal  
  $('#boxInfoModal').modal('hide');  
}  
  
function removeBox(boxNumber) {  
  // Remove the box from the scannedNumbers array  
  scannedNumbers = scannedNumbers.filter(item => item.CubbyID !== boxNumber);  

  // Update the scanned numbers on the server  
  $.post('/delete_box', { box_number: boxNumber }, function (data) {  
      if (data.result === 'success') {  
          console.log('Box deleted successfully');  
          // Reload the page after the box is deleted  
          location.reload();  
      } else {  
          console.error('Failed to delete the box');  
      }  
  });  
}  

// Function to confirm delete box  
function confirmDeleteBox() {  
  const password = document.getElementById('deletePasswordInput').value;  

  // Send a request to the Flask endpoint to check the password  
  fetch('/check_password', {  
      method: 'POST',  
      headers: {  
          'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({ password: password }),  
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
}); 

// BOX DISPLAYS  
const numberOfBoxes = 264;  

function daysDifference(firstScannedTime) {  
  const currentTime = new Date();  
  const scannedDate = new Date(firstScannedTime);  
  const timeDifference = Math.abs(currentTime - scannedDate);  
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));  
  return daysDifference;  
} 

function createBoxes() {  
    const boxContainer = document.getElementById('boxContainer');  
  
    for (let i = 1; i <= numberOfBoxes; i++) {  
        const box = document.createElement('div');  
        box.id = `box${i}`;  
        box.classList.add('emptybox');  
        boxContainer.appendChild(box);  
    }  
}  
  
// Call the createBoxes function when the page loads  
window.addEventListener('DOMContentLoaded', createBoxes); 
function displayBoxes(boxes) {  
  let boxesInUse = 0;  

  // Clear all boxes  
  for (let i = 1; i <= numberOfBoxes; i++) {  
      const boxContainer = document.getElementById(`box${i}`);  
      if (boxContainer) {  
          boxContainer.className = 'emptybox';  
          boxContainer.innerHTML = '';  
      }  
  }  

  document.getElementById('boxesInUse').textContent = `${boxesInUse} BOXES`;  

  scannedOrders = {};  
  for (const orderNumber in boxes) {  
      let totalQuantity;  
      let boxIndex;  
      let firstScannedTime = null;  

      for (const orderDetail of boxes[orderNumber]) {  
          const { ItemID, OrderID, Qty, SKU, ScannedBy, CubbyID, Batch, DateTime } = orderDetail;  
          totalQuantity = Qty;  
          boxIndex = parseInt(CubbyID, 10);  

          if (firstScannedTime === null || new Date(DateTime) < new Date(firstScannedTime)) {  
              firstScannedTime = DateTime;  
          }  
          if (!scannedOrders[OrderID]) {  
              scannedOrders[OrderID] = 0;  
          }  
          scannedOrders[OrderID]++;  

          const boxContainer = document.getElementById(`box${boxIndex}`);  
          boxContainer.className = 'box';  

          // Clear the existing content of the box container  
          boxContainer.innerHTML = '';  

          const colorBar = document.createElement('div');  
          colorBar.className = 'color-bar';  
          boxContainer.appendChild(colorBar);  

          const boxLabel = document.createElement('h4');  
          boxLabel.className = 'box-number box-number-overlay';  
          boxLabel.textContent = `${boxIndex}`;  
          boxContainer.appendChild(boxLabel);  

          // Add order number display to each box  
          const orderNumberLabel = document.createElement('p');  
          orderNumberLabel.textContent = OrderID.slice(-7); //show last 7 digits of order  
          boxContainer.appendChild(orderNumberLabel);  

          const quantityLabel = document.createElement('p');  
          quantityLabel.textContent = `${scannedOrders[OrderID]}/${totalQuantity}`;  
          boxContainer.appendChild(quantityLabel);  

          if (scannedOrders[OrderID] === parseInt(totalQuantity, 10)) {  
              colorBar.style.backgroundColor = '#44AF51';  
          } else if (daysDifference(firstScannedTime) > 1 && daysDifference(firstScannedTime) <= 2) {  
              colorBar.style.backgroundColor = '#F3A116';  
          } else if (daysDifference(firstScannedTime) > 2) {  
              colorBar.style.backgroundColor = '#D6324D';  
          }  

          // Update the onclick attribute to show the scanned order number and date  
          boxContainer.setAttribute('onclick', `showBoxInfo(${boxIndex}, '${OrderID}', '${totalQuantity}', '${firstScannedTime}')`);  
      }  
  }  

  // Update the boxesInUse variable after the loop  
  boxesInUse = Object.keys(boxes).length;  
  document.getElementById('boxesInUse').textContent = `${boxesInUse} BOXES USED`;  
}  

const addBoxUrl = "/add_box";  
let scannedNumbers = [];  
let nextAvailableBox = 1;  
let scannedOrders = {};  
  
// Fetch the scanned numbers from the server  
$.get('/get_scanned_numbers', function(data) {  
    scannedNumbers = data;  
    const boxes = organizeNumbers(scannedNumbers);  
    displayBoxes(boxes);  
}); 

$('form.search-bar').on('submit', function(event) {  
  event.preventDefault();  

  const searchPattern = /^[a-zA-Z0-9]{8,20}$/;  
  const searchTerm = $('input[type="search"]').val().trim();  

  if (!searchPattern.test(searchTerm)) {  
      $('#invalidNumberModal').modal('show');  
      $('input[type="search"]').val('');  
      return;  
  }  

  // Fetch the item details by itemID or orderID  
  $.get(`/search_item?search_term=${searchTerm}`, function(data) {  
      if (data.error) {  
          $('#notScannedModal').modal('show');  
          $('input[type="search"]').val('');  
      } else {  
          const [item] = data;  
          const boxNumber = item.cubbyID;  
          showBoxInfo(boxNumber, item.orderID, item.qty, item.dateTime);  
          $('input[type="search"]').val('');  
      }  
  }).fail(function() {  
      $('#notScannedModal').modal('show');  
      $('input[type="search"]').val('');  
  });  
});  

async function confirmDeleteBox() {  
  const password = document.getElementById('deletePasswordInput').value;  

  try {  
      const response = await fetch('/check_password', {  
          method: 'POST',  
          headers: {  
              'Content-Type': 'application/json',  
          },  
          body: JSON.stringify({ password: password }),  
      });  
        
      const data = await response.json();  

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
  } catch (error) {  
      console.error('Error during password check:', error);  
  }  
}  

document.addEventListener('DOMContentLoaded', function() {  
  var deleteBoxBtn = document.getElementById('deleteBoxBtn');  
  if (deleteBoxBtn) {  
      deleteBoxBtn.addEventListener('click', function() {  
          const boxNumber = parseInt(document.getElementById('boxInfoNumber').innerText, 10);  
          deleteBox(boxNumber);  
      });  
  }  

  var confirmDeleteBtn = document.getElementById('confirmDeleteBtn');  
  if (confirmDeleteBtn) {  
      confirmDeleteBtn.addEventListener('click', confirmDeleteBox);  
  }  
});

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