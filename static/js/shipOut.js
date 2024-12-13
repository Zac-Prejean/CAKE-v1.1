// shipOut.js
let matchedImages = [];
let currentIndex = 0;
let order = [];

window.onload = function() {
    document.getElementById("shipButton").style.display = "none";
  };
function handleScannerInput(event) {
    if (event.key === "Enter") {
        checkInputValue();
    }
}

function checkInputValue() {
    const barcode = document.getElementById('barcode').value;
    document.getElementById('message').textContent = 'barcode ' + barcode;
    displayJson(barcode);
}

async function displayJson(barcode) {
    const response = await fetch('/order_details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barcode: barcode })
    });

    const result = await response.json();
    if (result.status === 'success') {
        document.getElementById('packageqty').textContent = JSON.stringify(result.order_quantity, null, 4);
        order = result.order || [];
        matchedImages = result.image_url || [];
        showshipbutton()
        const imageListContainer = document.getElementById('imageList');
        imageListContainer.innerHTML = ''; // Clear existing images

        matchedImages.forEach((imagePath, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = imagePath;
            imgElement.dataset.index = index;
            imgElement.classList.add('format_img');
            imageListContainer.appendChild(imgElement);
        });

        updateOrderDetails(0); // Initial load for the first image
    } else {
        document.getElementById('jsonDisplay').textContent = 'No order Number Exists';
    }
}

// Function to update order details based on image index
function updateOrderDetails(index) {
    const [item_id, sku, qty] = order[index];
    document.getElementById('item_id').textContent = JSON.stringify(item_id, null, 4);
    document.getElementById('sku').textContent = JSON.stringify(sku, null, 4);
    document.getElementById('qty').textContent = JSON.stringify(qty, null, 4);
}

// Add scroll event listener to update details dynamically
document.querySelector('.image-list-container').addEventListener('scroll', () => {
    const images = Array.from(document.querySelectorAll('#imageList img'));
    let currentImageIndex = 0;
    
    images.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            currentImageIndex = index;
        }
    });

    updateOrderDetails(currentImageIndex);
});

function shipbutton() {
    const barcode = document.getElementById('barcode').value;
    printPDF(barcode);
}

async function printPDF(barcode) {
    try {
        const response = await fetch('/print-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ barcode: barcode })
        });
        const result = await response.json();
        if (result.status === 'success') {
            showMessage('Printing Label Please Wait', 'green');
            hideshipbutton()
        } else {
            showMessage(result.message, 'red');
            hideshipbutton()
        }
    } catch (error) {
        showMessage('An error occurred: ' + error, 'red');
    }
}

function printFile(pdfFilename) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdfFilename;
    document.body.appendChild(iframe);

    iframe.onload = () => iframe.contentWindow.print();
    hideshipbutton()
    document.getElementById('barcode').value = '';
    document.getElementById('barcode').focus();
}

function showMessage(message, color) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = color;
}

function hideshipbutton() {
    document.getElementById("shipButton").style.display = "none";
}
function showshipbutton() {
    document.getElementById("shipButton").style.display = "block";
}