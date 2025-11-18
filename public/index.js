const eventSource = new EventSource('/api/live-price')

const priceEl  =  document.getElementById('price-display')
const form = document.getElementById('form')
const amountHolder = document.getElementById('investment-amount')
const investmentSummary = document.getElementById('investment-summary')
const connectionStatusEl = document.getElementById('connection-status');
const summaryDialog = document.querySelector('dialog.outputs')
const closeDialogButton = summaryDialog.querySelector('button')


eventSource.onmessage = (event) =>  {
     try {
        const data = JSON.parse(event.data)
        if (data.price) {
            priceEl.textContent = data.price
            connectionStatusEl.innerHTML = 'Live Price 🟢'
        }
    } catch (error) {
        console.error('Failed to parse price data:', error)
    }
}

eventSource.onerror = () => {
    connectionStatusEl.innerHTML = 'Connection Lost 🔴'
    console.log('SSE connection failed...')
}

form.addEventListener('submit',async(e) =>{
  e.preventDefault()
  try {
        const data = {
        amount: amountHolder.value
      }
        console.log('Sending this data to the server:', data);
        const response = await fetch('/api/invest', {
        method:  'POST',
        headers: {
        'Content-Type': 'application/json'
  },
        body: JSON.stringify(data)
})
        if (!response.ok) {
            throw new Error(`Server responded with an error: ${response.status}`);
        }
        const summary = await response.json()
        investmentSummary.textContent = `Buyers ID: ${summary.buyerId} just bought ${summary.ounces} ounces (ozt) of gold at $${summary.currentGoldPrice} per oz, with a total investment of $${parseFloat(amountHolder.value)}. You will receive documentation shortly`
        summaryDialog.showModal()
  } catch(err) {

  }
closeDialogButton.addEventListener('click' ,()=> {
})
})
summaryDialog.close()