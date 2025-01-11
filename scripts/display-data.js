// DOM Elements
// All ticket wrapper
const allTicketSection = document.querySelector("#all-tickets");

// Display elements for ticket purchaser details
const displayName = document.querySelector('[data-display="name"]');
const displayEmail = document.querySelector('[data-display="email"]');

// Display elements for ticket-specific details
const ticketFullName = document.querySelector('[data-display="user-full-name"]');
const ticketUserName = document.querySelector('[data-display="user-name"]');
const ticketId = document.querySelector('[data-display="ticket-id"]');
const ticketUserProfile = document.querySelector('[data-display="user-profile"]');

// Retrieve data from localStorage
const ticketData = JSON.parse(localStorage.getItem("tickets"));

// Function to display the list of tickets
function showTicketLists() {
  ticketData.forEach((item, index) => {
    // Create a new list item for each ticket
    const li = document.createElement("li");
    li.classList.add("user-details", "card");
    li.setAttribute("data-arr-elem", index);

    // Populate the list item with ticket details
    li.innerHTML = `
      <img src="${item.uploadImageIcon}" alt="Profile">
      <p class="user-full-name">${item.fullName}</p>
      <p class="user-name">${item.userName}</p>`;
    
    // Append the list item to the ticket section
    allTicketSection.appendChild(li);
  });
}

// Check if on the tickets.html page and display the ticket list
if (window.location.pathname.includes("/tickets.html")) {
  showTicketLists();

  // Add event listener to the ticket list for navigation
  allTicketSection.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
      const seletedCard = card.getAttribute("data-arr-elem");
      // Redirect to the ticket-info page with the selected ticket index
      window.location.href = `https://abhi-zero.github.io/conference-ticket-generator/ticket-info.html?ticket=${seletedCard}`;
    }
  });
}

// Function to display detailed ticket information
function displayTicketData() {
  // Retrieve the query parameters from the URL
  const param = new URLSearchParams(window.location.search);
  const selectedIndex = param.get("ticket");

  if (selectedIndex !== null || ticketData[selectedIndex]) {
    // Display the selected ticket's data
    const selectedTicket = ticketData[selectedIndex];
    displayName.textContent = selectedTicket.fullName;
    displayEmail.textContent = selectedTicket.email;
    ticketFullName.textContent = selectedTicket.fullName;
    ticketUserName.textContent = selectedTicket.userName;
    ticketId.textContent = selectedTicket.id;
    ticketUserProfile.src = selectedTicket.uploadImageIcon;
  } else {
    // Fallback to display the last ticket's data if no ticket is selected
    const ticketDataLastElem = ticketData[ticketData.length - 1];
    displayName.textContent = ticketDataLastElem.fullName;
    displayEmail.textContent = ticketDataLastElem.email;
    ticketFullName.textContent = ticketDataLastElem.fullName;
    ticketUserName.textContent = ticketDataLastElem.userName;
    ticketId.textContent = ticketDataLastElem.id;
    ticketUserProfile.src = ticketDataLastElem.uploadImageIcon;
  }
}

// Check if on the ticket-info.html page and display ticket details
if (window.location.pathname.includes('/ticket-info.html')) {
  displayTicketData();
}
