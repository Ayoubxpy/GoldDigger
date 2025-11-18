const eventSource = new EventSource('/api/live-price')
const priceEl  =  document.getElementById('price-display')
eventSource.onmessage = (event) =>  {
    const data = JSON.parse(event.data)
    const  price = data.price
    priceEl.textContent = price
}
eventSource.onerror = () => {
  console.log('Connection failed...')
}