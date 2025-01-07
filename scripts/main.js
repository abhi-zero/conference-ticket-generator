//upload image Dom
const uploadFile = document.getElementById('upload-file'); // Input field for upload image
const uploadImage = document.getElementById('upload-image');

// Input elements
const fullName = document.getElementById('full-name'); // Input field for full name
const email = document.getElementById('email'); // Input field for email address
const userName = document.getElementById('github-username'); // Input field for GitHub username

// Error message elements
const nameFeedback = document.querySelector('[data-feedback="full-name"]'); // Feedback element for full name validation
const emailFeedback = document.querySelector('[data-feedback="email"]'); // Feedback element for email validation
const userNameFeedback = document.querySelector('[data-feedback="github"]'); // Feedback element for GitHub username validation

// upload image functionalaty

let seletedImg = null;

// // Handle files selected via file input
uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0];
    if(file){
        handleFile(file);
    }
})

function handleFile(file){
    if(validateFile(file)){
        seletedImg = file;
        const reader = new FileReader();

        reader.onload = function(e){
            uploadImage.src = e.target.result;
            
            let uploadFileLabel = document.getElementById('upload-file-label');
            if(uploadImage.src = e.target.result){
                uploadFileLabel.textContent = 'Click to change image';
            }else{
                uploadFileLabel.textContent = 'Click to upload';
            }
        }
        reader.readAsDataURL(file)
       
    }else{
        alert('Please upload a valid image (JPEG, PNG, or GIF) with a maximum size of 2MB.')
    }
}

function validateFile(file){
    const maxSize = 2 * 1024 * 1024;
    return file.size <= maxSize;
}

// Live validation event listeners
// Trigger name validation on every input in the full-name field
fullName.addEventListener('input', () => {
    validateName(fullName.value);
});

// Trigger email validation on every input in the email field
email.addEventListener('input', () => {
    validateEmail(email.value);
});

// Trigger username validation on every input in the GitHub username field
userName.addEventListener('input', () => {
    validateUserName(userName.value);
});

// Validation function for full name
function validateName(value) {
    const fullNameValue = value.trim(); // Remove leading and trailing spaces
    const regex = /^[a-zA-Z ]{3,40}$/; // Full name must be 3-30 alphabetic characters only

    // Check if the input matches the regex
    if (!regex.test(fullNameValue)) {
        nameFeedback.style.display = "block"; // Show feedback if validation fails
        fullName.style.borderColor = "var(--error-color)"; // Apply error styles
        fullName.style.outlineColor = "var(--error-color)";
    } else {
        // If valid, apply success styles and hide feedback
        fullName.style.borderColor = "green";
        fullName.style.outlineColor = "green";
        nameFeedback.style.display = "none";
    }
}

// Validation function for email
function validateEmail(value) {
    let emailValue = value.trim(); // Remove leading and trailing spaces
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email regex

    if (emailValue === "") {
        // Check for empty input
        emailFeedback.textContent = "Please enter your email address.";
        return false;
    } else if (emailValue.includes(" ")) {
        // Check for spaces in the email
        emailFeedback.textContent = "Email addresses cannot contain spaces.";
        return false;
    } else if (!emailValue.includes('@')) {
        // Ensure the email contains '@'
        emailFeedback.textContent = "Email must contain '@'.";
        return false;
    } else if (!regex.test(emailValue)) {
        // Check against the regex for valid email
        emailFeedback.textContent = "Please enter a valid email address.";
        email.style.borderColor = "var(--error-color)"; // Apply error styles
        email.style.outlineColor = "var(--error-color)";
        emailFeedback.style.display = "block";
        return false;
    } else {
        // If valid, apply success styles and hide feedback
        email.style.borderColor = "green";
        email.style.outlineColor = "green";
        emailFeedback.style.display = "none";
        return true;
    }
}

// Validation function for GitHub username
function validateUserName(value) {
    const userNameValue = value.trim(); // Remove leading and trailing spaces

    // Check if username starts or ends with a hyphen
    if (userNameValue.startsWith('-') || userNameValue.endsWith('-')) {
        userNameFeedback.textContent = "The username must not start or end with a '-'.";
        userName.style.borderColor = "var(--error-color)"; // Apply error styles
        userName.style.outlineColor = "var(--error-color)";
        userNameFeedback.style.display = "block";
    } 
    // Check for spaces or invalid special characters
    else if (userNameValue.includes('!') || userNameValue.includes('@') || userNameValue.includes('$') || userNameValue.includes(' ')) {
        userNameFeedback.textContent = "The username cannot include spaces or special characters (e.g., !, @, $).";
        userName.style.borderColor = "var(--error-color)";
        userName.style.outlineColor = "var(--error-color)";
        userNameFeedback.style.display = "block";
    } else {
        // If valid, apply success styles and hide feedback
        userName.style.borderColor = "green";
        userName.style.outlineColor = "green";
        userNameFeedback.style.display = "none";
    }
}
