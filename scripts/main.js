// Grouped DOM element queries
// Upload image DOM
const uploadFile = document.getElementById("upload-file"); // Input field for upload image
const uploadImage = document.getElementById("upload-image");

// Button DOM
const submitBtn = document.querySelector(".cta-submit");
const displayAllTicketBtn = document.querySelector(".cta-get-tickets");

// Input elements
const fullName = document.getElementById("full-name"); // Input field for full name
const email = document.getElementById("email"); // Input field for email address
const userName = document.getElementById("github-username"); // Input field for GitHub username

// Error message elements
const nameFeedback = document.querySelector('[data-feedback="full-name"]'); // Feedback element for full name validation
const emailFeedback = document.querySelector('[data-feedback="email"]'); // Feedback element for email validation
const userNameFeedback = document.querySelector('[data-feedback="github"]'); // Feedback element for GitHub username validation

const savedData = localStorage.getItem("tickets");
// Storing data
// Array
let tickets = [];
if (savedData) {
  tickets = JSON.parse(savedData);
}
console.log(tickets);

// Upload image variables
let seletedImg = null;
let profileImage = null;

// Class and constructor
class User {
  constructor(fullName, email, userName, uploadImageIcon, id) {
    this.fullName = fullName;
    this.email = email;
    this.userName = userName;
    this.uploadImageIcon = uploadImageIcon || "./assets/images/icon-upload.svg";
    this.id = id;
  }
}

// Functions
function generateId() {
  const id = Math.floor(Math.random() * 1000000);
  return id;
}

function handleFile(file) {
  if (validateFile(file)) {
    seletedImg = file;
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64string = e.target.result;
      uploadImage.src = base64string;
      let uploadFileLabel = document.getElementById("upload-file-label");
      if (uploadImage.src !== e.target.result) {
        uploadFileLabel.textContent = "Click to upload";
      }
      profileImage = base64string;
    };
    reader.readAsDataURL(file);
  } else {
    alert(
      "Please upload a valid image (JPEG, PNG, or GIF) with a maximum size of 2MB."
    );
  }
}

function validateFile(file) {
  const maxSize = 2 * 1024 * 1024;
  return file.size < maxSize;
}

function validateName(value) {
  const fullNameValue = value.trim();
  const regex = /^[a-zA-Z ]{3,40}$/;

  if (!regex.test(fullNameValue)) {
    nameFeedback.style.display = "block";
    fullName.style.borderColor = "var(--error-color)";
    fullName.style.outlineColor = "var(--error-color)";
    return false;
  } else {
    fullName.style.borderColor = "green";
    fullName.style.outlineColor = "green";
    nameFeedback.style.display = "none";
    return true;
  }
}

function validateEmail(value) {
  let emailValue = value.trim();
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailValue == "") {
    emailFeedback.textContent = "Please enter your email address.";
    email.style.borderColor = "var(--error-color)";
    email.style.outlineColor = "var(--error-color)";
    emailFeedback.style.display = "block";
    return false;
  } else if (emailValue.includes(" ")) {
    emailFeedback.textContent = "Email addresses cannot contain spaces.";
    return false;
  } else if (!emailValue.includes("@")) {
    emailFeedback.textContent = "Email must contain '@'.";
    return false;
  } else if (!regex.test(emailValue)) {
    emailFeedback.textContent = "Please enter a valid email address.";
    email.style.borderColor = "var(--error-color)";
    email.style.outlineColor = "var(--error-color)";
    emailFeedback.style.display = "block";
    return false;
  } else {
    email.style.borderColor = "green";
    email.style.outlineColor = "green";
    emailFeedback.style.display = "none";
    return true;
  }
}

function validateUserName(value) {
  const userNameValue = value.trim();
  const regExp = /^[a-zA-Z0-9-]+$/;

  if (userNameValue == "") {
    userNameFeedback.textContent = "Please enter a valid username.";
    userName.style.borderColor = "var(--error-color)";
    userName.style.outlineColor = "var(--error-color)";
    userNameFeedback.style.display = "block";
    return false;
  }
  if (userNameValue.startsWith("-") || userNameValue.endsWith("-")) {
    userNameFeedback.textContent =
      "The username must not start or end with a '-'.";
    userName.style.borderColor = "var(--error-color)";
    userName.style.outlineColor = "var(--error-color)";
    userNameFeedback.style.display = "block";
    return false;
  } else if (!regExp.test(userNameValue)) {
    userNameFeedback.textContent =
      "The username cannot include spaces or special characters (e.g., !, @, $).";
    userName.style.borderColor = "var(--error-color)";
    userName.style.outlineColor = "var(--error-color)";
    userNameFeedback.style.display = "block";
    return false;
  } else {
    userName.style.borderColor = "green";
    userName.style.outlineColor = "green";
    userNameFeedback.style.display = "none";
    return true;
  }
}

// Event listeners || cta actions
submitBtn.addEventListener("click", (e) => {
  let isValid = true;
  e.preventDefault();

  if (!validateName(fullName.value)) {
    isValid = false;
  }
  if (!validateEmail(email.value)) {
    isValid = false;
  }
  if (!validateUserName(userName.value)) {
    isValid = false;
  }
  console.log(isValid);
  if (isValid) {
    const user = new User(
      fullName.value,
      email.value,
      userName.value,
      profileImage,
      generateId()
    );
    tickets.push(user);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    fullName.value = "";
    email.value = "";
    userName.value = "";
    seletedImg = null;
    window.location.href = "ticket-info.html";
  }
});

displayAllTicketBtn.addEventListener("click", () => {
  window.location.href = "tickets.html";
});

uploadFile.addEventListener("change", () => {
  const file = uploadFile.files[0];
  if (file) {
    handleFile(file);
  }
});

fullName.addEventListener("input", () => {
  validateName(fullName.value);
});

email.addEventListener("input", () => {
  validateEmail(email.value);
});

userName.addEventListener("input", () => {
  validateUserName(userName.value);
});
