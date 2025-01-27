// printStation.js

$(document).ready(function() {  
    function handleScanFormSubmit(event) {  
        event.preventDefault();  
        var scannedNumber = $(event.target).find('input[name="scanned_number"]').val();  
        console.log("Scanned Number:", scannedNumber);  
  
        if (!scannedNumber) {  
            // Clear the display fields if the scanned input is empty  
            clearDisplayFields();  
            return;  
        }  
  
        let dataToSend = {  
            signedInEmployeeName: signedInEmployeeName  
        };  
  
        if (scannedNumber.length === 14) {  
            dataToSend.line_id = scannedNumber;  
        } else {  
            dataToSend.custom_id = scannedNumber;  
        }  
  
        // Determine the station type based on the form ID    
        let station = 'printStation';   
  
        $.ajax({  
            url: `/scan/${station}`,  
            type: 'POST',  
            contentType: 'application/json',  
            data: JSON.stringify(dataToSend),  
            success: function(response) {  
                if (response.sku) {  
                    $('#sku').text(response.sku);  
                    $('#qty').text(response.qty);  
                    $('#details').text(response.description);  
                    $('#item_id').text(response.custom_id);  
                    $('#order_id').text(response.order_id);   
  
                    // Call the function to update the image from the folder
                    updateImageFromFolder(response.sku);  
                } else {  
                    // Clear the display fields if the response does not contain SKU  
                    clearDisplayFields();  
                }   
  
                // Clear the input field and set focus back to it  
                $(event.target).find('input[name="scanned_number"]').val('').focus();  
            },  
            error: function(xhr) {  
                var error = JSON.parse(xhr.responseText);  
                if (error.status) {  
                    document.getElementById("modal-text").innerHTML = `This item was last processed in the <a href="#" class="status-link">${error.status}</a> stage. Check with supervisor.`;  
                    $('#warningModal').modal('show');  
                } else {  
                    console.error('Error:', error);  
                }  
  
                // Clear the input field and set focus back to it  
                $(event.target).find('input[name="scanned_number"]').val('').focus();  
            }  
        });  
    }  
  
    let currentSide = 'front';

    async function updateImageFromFolder() {
        const itemID = document.getElementById('item_id').innerText;
        const itemName = document.getElementById('details').innerText;
        const response = await fetch(`/api/images/${itemID}_${itemName}`);
        const images = await response.json();
        
        currentSide = 'front'; // default to front
        if (images.includes(`${itemID}_${itemName}_back_mockup.png`)) {
            currentSide = 'front';
        }
    
        // Check for LIGHT status  
        if ($('#sku').text().includes('WHITE')) {  
            document.querySelector('.color-only').style.display = 'block';  
        } else {  
            document.querySelector('.color-only').style.display = 'none';  
        }

        updateImage(itemID, itemName, currentSide);
    }
    
    function updateImage(itemID, itemName, side) {
        const imagePath = `/images/${itemID}_${itemName}_${side}_mockup.png`;  
        const imageElement = document.getElementById('item-image');
        if (imageElement) {
            fetch(imagePath)
                .then(response => {
                    if (response.ok) {
                        imageElement.src = imagePath;
                    } else {
                        imageElement.src = NO_IMAGE_URL;
                    }
                    imageElement.style.display = 'block'; // Ensure the image is displayed
                })
                .catch(() => {
                    imageElement.src = NO_IMAGE_URL;
                    imageElement.style.display = 'block';
                });
        } else {
            console.error('Image element not found');
        }
    }
    
    window.switchImage = function(direction) {
        const itemID = document.getElementById('item_id').innerText;
        const itemName = document.getElementById('details').innerText;
        if (direction === 'next') {
            currentSide = currentSide === 'front' ? 'back' : 'front';
        } else {
            currentSide = currentSide === 'back' ? 'front' : 'back';
        }
        updateImage(itemID, itemName, currentSide);
    }
  
    function clearDisplayFields() {  
        $('#sku').text('');  
        $('#qty').text('');  
        $('#details').text('');  
        $('#item_id').text('');  
        $('#order_id').text('');  
        $('#scanImage').hide();  
        $('#placeholder-container').show();
    } 
  
    $('#scanForm1').on('submit', handleScanFormSubmit);  
    $('#scanForm2').on('submit', handleScanFormSubmit);  
  
    $('#warningSubmitButton').on('click', function() {  
        var password = $('#warningPasswordInput').val();  
        var scannedNumber = $('input[name="scanned_number"]').val();  
  
        let dataToSend = {  
            signedInEmployeeName: signedInEmployeeName,  
            password: password  
        };  
  
        if (scannedNumber.length === 14) {  
            dataToSend.line_id = scannedNumber;  
        } else {  
            dataToSend.custom_id = scannedNumber;  
        }  
  
        $.ajax({  
            url: '/override_status',  
            type: 'POST',  
            contentType: 'application/json',  
            data: JSON.stringify(dataToSend),  
            success: function(response) {  
                $('#warningModal').modal('hide');  
                if (response.sku) {  
                    $('#sku').text(response.sku);  
                    $('#qty').text(response.qty);  
                    $('#details').text(response.description);  
                    $('#item_id').text(response.line_id);  
                    $('#order_id').text(response.order_id);  
  
                    // Call the function to update the image if SKU starts with "RNG"  
                    updateImageBasedOnSKU(response.sku);  
                } else {  
                    // Clear the display fields if the response does not contain SKU  
                    clearDisplayFields();  
                }  
            },  
            error: function(xhr) {  
                var error = JSON.parse(xhr.responseText);  
                console.error('Error:', error);  
            }  
        });  
    });  
});  
