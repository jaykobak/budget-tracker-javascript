const allTransactions = JSON.parse(localStorage.getItem("transactions")) || []

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

function collectUserInput(inputFieldsId) {
    const userInputDictionary = {}
    
    for (let id = 0; id < inputFieldsId.length; id++) {
        const dictionaryKey = `user${inputFieldsId[id]}`
        userInputDictionary[dictionaryKey] = document.getElementById(`${inputFieldsId[id]}`).value.trim();
    }

    return userInputDictionary;
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
    allTransactions.push(userInput)
    localStorage.setItem("transactions", JSON.stringify(allTransactions))
}