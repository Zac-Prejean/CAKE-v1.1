// penguin.js

function reloadPage() { 
  setTimeout(() => {  
    location.reload();  
  }, 1000); // Wait for 1 second before reloading 
}  
  
setTimeout(reloadPage, 7200000); // Reload every 2 hours

let signedInEmployeeName = "";  
  
document.addEventListener('DOMContentLoaded', function() {  
    const mainElement = document.querySelector('main');  
    if (mainElement) {  
        showSigninModal()  
            .then(employeeName => {  
                console.log("Displaying main content");  
                mainElement.style.display = 'block';  
                signedInEmployeeName = employeeName; // Store the signed-in employee name  
                // Optionally, you can display the signed-in user's name  
                const signedInUserElement = document.getElementById('signedInUser');  
                if (signedInUserElement) {  
                    signedInUserElement.innerText = `SIGNED IN AS: ${employeeName}`;  
                }  
            })  
            .catch(() => {  
                console.log("Redirecting to home page");
                window.location.href = '/';  
            });  
    }  
});   
  
function showSigninModal() {  
    return new Promise((resolve, reject) => {  
        const signinModalElement = document.getElementById("signinModal");  
        const signinModal = new bootstrap.Modal(signinModalElement, {});  
        const submitButton = document.querySelector("#signinModal .btn-primary");  
  
        signinModal.show();  
  
        function handleModalHidden(event) {  
            submitButton.removeEventListener("click", handleSubmitButtonClick);  
            signinPasswordInput.removeEventListener("keypress", handleKeyPress);  
        }   
  
        function handleSubmitButtonClick() {  
            const signinPasswordInput = document.querySelector("#signinModal #signinPasswordInput");  
            const employeeID = signinPasswordInput.value;  
  
            checkSignin(employeeID)  
                .then(employeeName => {  
                    signinPasswordInput.value = "";  
                    signinModal.hide();  
                    resolve(employeeName);  
                })  
                .catch(() => {  
                    console.log("Sign-in failed");
                    signinPasswordInput.value = "";  
                    reject();  
                });  
        }  
  
        function handleKeyPress(event) {  
            if (event.keyCode === 13) { // Enter key  
                handleSubmitButtonClick();  
            }  
        }  
  
        signinModalElement.addEventListener("hidden.bs.modal", handleModalHidden, { once: true });  
        submitButton.addEventListener("click", handleSubmitButtonClick);  
        signinPasswordInput.addEventListener("keypress", handleKeyPress);  
    });  
}    

function checkSignin(employeeID) {  
    return new Promise((resolve, reject) => {  
        fetch('/signin', {  
            method: 'POST',  
            body: JSON.stringify({ employeeID: employeeID }),  
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
            if (data.result === 'success') {  
                console.log("Sign-in successful");  
                resolve(data.employeeName);  
            } else {  
                console.log("Invalid Employee ID");  
                alert('Invalid Employee ID');  
                reject();  
            }  
        })  
        .catch(error => {  
            console.error('There was a problem with the fetch operation:', error);  
            reject();  
        });  
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
          if (data.result === 'success') {  
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
