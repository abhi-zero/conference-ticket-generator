// Dom 
// all ticket wrapper

const allTicketSection = document.querySelector("#all-tickets");
const liElem = document.querySelector(".card");
// Name of user or the ticket purchaser
const displayName = document.querySelector('[data-display="name"]');
const displayEmail = document.querySelector('[data-display="email"]');

const ticketFullName = document.querySelector(
  '[data-display="user-full-name"]'
);
const ticketUserName = document.querySelector('[data-display="user-name"]');
const ticketId = document.querySelector('[data-display="ticket-id"]');
const ticketUserProfile = document.querySelector(
  '[data-display="user-profile"]'
);
// Retrive data from the localStorage

const ticketData = JSON.parse(localStorage.getItem("tickets"));
function showTicketLists() {
    ticketData.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("user-details", "card");
        li.setAttribute("data-arr-elem", index);
        li.innerHTML = `
          <img src="${item.uploadImageIcon}" alt="Profile">
          <p class="user-full-name">${item.fullName}</p>
          <p class="user-name">${item.userName}</p>`;
        allTicketSection.appendChild(li);
      });
}
if (window.location.href == "http://127.0.0.1:5500/tickets.html") {
  showTicketLists();
  allTicketSection.addEventListener("click", (e) => {
    const card = e.target.closest(".card")
    if (card) {
      const seletedCard = card.getAttribute("data-arr-elem")
      window.location.href = `/ticket-info.html?ticket=${seletedCard}`;
    }
  });
}

// function for displaying tickets data
 function displayTicketData() {
    const param = new URLSearchParams(window.location.search);
    const selectedIndex = param.get("ticket"); 
  if (selectedIndex !== null || ticketData[selectedIndex]) {
    const selectedTicket = ticketData[selectedIndex];
    displayName.textContent = selectedTicket.fullName;
    displayEmail.textContent = selectedTicket.email;
    ticketFullName.textContent = selectedTicket.fullName;
    ticketUserName.textContent = selectedTicket.userName;
    ticketId.textContent = selectedTicket.id;
    ticketUserProfile.src = selectedTicket.uploadImageIcon;
  } else {
    const ticketDataLastElem = ticketData[ticketData.length - 1];
    displayName.textContent = ticketDataLastElem.fullName;
    displayEmail.textContent = ticketDataLastElem.email;
    ticketFullName.textContent = ticketDataLastElem.fullName;
    ticketUserName.textContent = ticketDataLastElem.userName;
    ticketId.textContent = ticketDataLastElem.id;
    ticketUserProfile.src = ticketDataLastElem.uploadImageIcon;
  }
}

if(window.location.pathname.includes('/ticket-info.html')){
    displayTicketData();
}