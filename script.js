const allTransactions = JSON.parse(localStorage.getItem("transactions")) || []

// Show transaction history
updateTransactionHistory()

// Function to close any modal
const closeModal = () => {
    const infoModalElement = document.getElementById('infoModal')
    const customModalElement = document.getElementById('customModal')

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

// Function to show delete modal
const showDeleteModal = () => {
    const customModalElement = document.getElementById('customModal')
    const closeModalButton = document.getElementById('closeModalBtn')
    const cancelButton = document.getElementById('cancelBtn')
    const confirmButton = document.getElementById('confirmBtn')

    customModalElement.style.display = 'flex'
}

showDeleteModal()

function collectUserInput(inputFieldsId) {
    const userInputDictionary = {}

    for (let id = 0; id < inputFieldsId.length; id++) {
        const dictionaryKey = `user${inputFieldsId[id]}`
        userInputDictionary[dictionaryKey] = document.getElementById(`${inputFieldsId[id]}`).value.trim();
    }

    return userInputDictionary;
}

function updateTransactionHistory() {
    const listElement = document.getElementById('transactionList')

    listElement.innerHTML = ''

    if (allTransactions.length === 0) {
        listElement.innerHTML = '<li class="empty-state">No transaction yet. Add one above to get started.</li>'
        return
    }

    for (let transaction = 0; transaction < allTransactions.length; transaction++) {
        const transactionName = allTransactions[transaction].usertransactionName
        const transactionAmount = allTransactions[transaction].usertransactionAmount
        const transactionType = allTransactions[transaction].usertransactionType

        listElement.innerHTML += `<li class="${transactionType}">
            <span class="transaction-name">${transactionName}</span>
            <div class="transaction-actions">
                <span class="transaction-amount">₦${transactionAmount}</span>
                <button class="delete-btn" type="button" onclick="deleteItem(${transaction})">Delete</button>
            </div>
        </li>`
    }
}

function updateTotalBalanceCard() {
    const transactionIncome = []
    const transactionExpense = []
    const balanceElement = document.getElementById('totalBalance')

    for (let transaction = 0; transaction < allTransactions.length; transaction++) {
        const transactionAmount = Number(allTransactions[transaction].usertransactionAmount)
        const transactionType = allTransactions[transaction].usertransactionType

        if (transactionType == 'income') {transactionIncome.push(transactionAmount)}
        if (transactionType == 'expense') {transactionExpense.push(transactionAmount)}

    }

    // Add all income
    const totalTransactionIncome = transactionIncome.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    // Add all expense
    const totalTransactionExpense = transactionExpense.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    const totalBalance = (totalTransactionIncome - totalTransactionExpense).toFixed(2);

    balanceElement.innerText = `₦${totalBalance}`
}

function deleteItem(transactionId) {
    console.log(transactionId)
}

const addTransaction = () => {
    // Collect user's input
    let userInput = collectUserInput(["transactionName", "transactionAmount", "transactionType"])

    // Input validation
    if (userInput.usertransactionName === '' || userInput.usertransactionAmount === '') {
        showInfoModal("Missing Details", "Please fill in all input fields before adding a transaction");
        return;
    }

    // Add user's input to allTransactions array and local storage
    allTransactions.unshift(userInput)
    localStorage.setItem("transactions", JSON.stringify(allTransactions))

    // Clear input fields
    document.getElementById('transactionName').value = ''
    document.getElementById('transactionAmount').value = ''

    // Update transaction history
    updateTransactionHistory()

    // updateTotalBalanceCard()
    updateTotalBalanceCard()
}