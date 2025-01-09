// Dom
// all ticket wrapper

const allTicketSection = document.querySelector('#all-tickets');
// Name of user or the ticket purchaser
const displayName = document.querySelector('[data-display="name"]');
const displayEmail = document.querySelector('[data-display="email"]');

const ticketFullName = document.querySelector('[data-display="user-full-name"]');
const ticketUserName = document.querySelector('[data-display="user-name"]');
const ticketId = document.querySelector('[data-display="ticket-id"]');
const ticketUserProfile = document.querySelector('[data-display="user-profile"]')
// Retrive data from the localStorage

const ticketData = JSON.parse(localStorage.getItem('tickets'));

function showTicketLists(){
    ticketData.forEach( item => {
        let liString = `<li class="user-details"><img src='${item.uploadImageIcon}'><p class="user-full-name">${item.fullName}</p><p class="user-name">${item.userName}</p></li>`
        allTicketSection.innerHTML += liString;

    });
}
showTicketLists();
// function for displaying tickets data
function displayTicketData(){

    // let ticketDataLastElem = ticketData[ticketData.length - 1];
    // displayName.textContent = ticketDataLastElem.fullName;
    // displayEmail.textContent = ticketDataLastElem.email;
    // ticketFullName.textContent = ticketDataLastElem.fullName;
    // ticketUserName.textContent = ticketDataLastElem.userName;
    // ticketId.textContent = ticketDataLastElem.id;
    // ticketUserProfile.src = ticketDataLastElem.uploadImageIcon;
    
}


displayTicketData();


