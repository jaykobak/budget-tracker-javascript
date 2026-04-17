const allTransactions = []

// Function to close any modal
const closeModal = () => {
    infoModalElement = document.getElementById('infoModal')
    customModalElement = document.getElementById('customModal')

    if (infoModalElement) (infoModalElement.style.display = 'none')
    if (customModalElement) (customModalElement.style.display = 'none')
}

// Function to show info modal
const showInfoModal = (title, message) => {
    document.getElementById('infoTitle').innerText = title
    document.getElementById('infoMessage').innerText = message

    infoModalElement = document.getElementById('infoModal')
    infoModalElement.style.display = 'flex'
}

const addTransaction = () => {
    // Collect user's input
    userTransactionName = document.getElementById('transactionName').value;
    userTransactionAmount = document.getElementById('transactionAmount').value;
    userTransactionType = document.getElementById('transactionType').value;
}

// showInfoModal("Missing Details", "Please fill in all input fields before adding a transaction")