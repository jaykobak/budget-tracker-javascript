const allTransactions = JSON.parse(localStorage.getItem("transactions")) || []
let deleteItemId = ''

// Show transaction history
updateTransactionHistory()

// Show balance
updateTotalBalanceCard()

// Function to close any modal
const closeModal = () => {
    const infoModalElement = document.getElementById('infoModal')
    const customModalElement = document.getElementById('customModal')

    if (infoModalElement) (infoModalElement.style.display = 'none')
    if (customModalElement) (customModalElement.style.display = 'none')
}

// Function to show info modal and delete modal
const showModal = (title, message, modalId, transactionId) => {
    deleteItemId = transactionId;
    const modalElement = document.getElementById(modalId)
    
    document.getElementById('infoTitle').innerText = title
    document.getElementById('infoMessage').innerText = message

    modalElement.style.display = 'flex'
}

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
                <button class="delete-btn" type="button" onclick="showModal('', '', 'customModal', ${transaction})">Delete</button>
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

function deleteItem() {
    // Delete transaction from list and add list to local storage
    allTransactions.splice(deleteItemId, 1)
    localStorage.setItem("transactions", JSON.stringify(allTransactions))

    // Update transaction history
    updateTransactionHistory()

    // updateTotalBalanceCard()
    updateTotalBalanceCard()

    // Close all modal
    closeModal()
}

const addTransaction = () => {
    // Collect user's input
    let userInput = collectUserInput(["transactionName", "transactionAmount", "transactionType"])

    // Input validation
    if (userInput.usertransactionName === '' || userInput.usertransactionAmount === '') {
        showModal("Missing Details", "Please fill in all input fields before adding a transaction", 'infoModal', '');
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