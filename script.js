document.getElementById("registerMessage").style.display = 'none';

function onChange() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=confirmPassword]');
    if (confirm.value === password.value) {
      confirm.setCustomValidity('');
    } else {
      confirm.setCustomValidity('Passwords do not match');
    }
  }


document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Collect form data
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    const registerButton = document.getElementById("registerButton");
    
    const registerMessage = document.getElementById("registerMessage");
    registerButton.style.display = 'none';
    registerMessage.style.display = 'block';
    // Prepare JSON object
    var data = {
        "username": username,
        "password": password,
        "email": email,
        "firstName": firstName,
        "lastName" : lastName
    };
    const  url = localStorage.getItem("baseurl")
    // Perform AJAX request using Fetch API
    fetch(url+"/reg" , {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed.');
        }
        
        return response.json();
    })
    .then(data => {
        
        let sessionId = data.session_id;
        let atk = data.atk;
        // Store session ID and ATK in local storage
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('atk', atk);
        console.log("Session ID and ATK stored in local storage:", sessionId, atk);
            console.log("Registration successful:", data);
        // window.location.href = 'otp.html';
        if(data.status == 0) {
            alert(data.msg);
        } 

    })
    .catch(error => {
        
        alert("Registration failed. Please try again later.");
        console.error('Error:', error);
    });
});






      const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });




    
