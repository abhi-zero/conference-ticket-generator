// Input 
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const userName = document.getElementById('github-username');

// error msg 
const nameFeedback = document.querySelector('[data-feedback="full-name"]');
const emailFeedback = document.querySelector('[data-feedback="email"]');
const userNameFeedback = document.querySelector('[data-feedback="github"]');

// live validation

fullName.addEventListener('input', () => {
    validateName(fullName.value);
})
email.addEventListener('input', () => {
    validateEmail(email.value);
})

userName.addEventListener('input', () => {
    validateUserName(userName.value);
})



// validation function

function validateName(value) {
    fullNameValue = value.trim();
    const regex = /^[a-zA-Z]{3,30}$/;
    if (!fullNameValue.test(regex)) {
        nameFeedback.style.display = "block"

    }else {
    nameFeedback.style.display = "none"
    }
}

function validateEmail(value) {
    let emailValue = value.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailValue === ""){
        emailFeedback.textContent = "Please enter your email address."
        return false;

    }
    else if(emailValue.includes(" ")){
        emailFeedback.textContent = 'Email addresses cannot contain spaces.'
        return false;
    }
    else if(!emailValue.includes('@')){
        emailFeedback.textContent = "Email must contain '@'."
        return false
    }
    else if(!regex.test(emailValue)){
        emailFeedback.textContent = 'Please enter a valid email address.'
        email.style.borderColor = "var(--error-color)";
        email.style.outlineColor = "var(--error-color)"
        emailFeedback.style.display = "block";
        return false;
    }else{
        email.style.borderColor = "green";
        email.style.outlineColor = "green"
        emailFeedback.style.display = "none";
        return true;
    }
}

function validateUserName(value){
    userNameValue = value.trim();
    if(userNameValue.startsWith('-') || userNameValue.endsWith('-')){
        userNameFeedback.textContent =`The user-name does not start and end with '-'.`
        userName.style.borderColor = "var(--error-color)";
        userName.style.outlineColor = "var(--error-color)"
        userNameFeedback.style.display = "block";
    }else if(userNameValue.includes('!') || userNameValue.includes('@') || userNameValue.includes('$') || userNameValue.includes(' ')){
          userNameFeedback.textContent =`The user-name can't include spaces or special characters (e.g., !, @, $).`
          userName.style.borderColor = "var(--error-color)";
        userName.style.outlineColor = "var(--error-color)"
        userNameFeedback.style.display = "block";
    }
    else {
        userName.style.borderColor = "green";
        userName.style.outlineColor = "green"
        userNameFeedback.style.display = "none";
    }
}

