
document.addEventListener('keydown', event => {
  event.preventDefault()
  if(event.keycode === '13') {
    let city = document.getElementById('city-search').value
    fetch(`http://api.weatherapi.com/v1/current.json?key=1494b6e914a84eb4aeb215103200502&q=${city}`)
      .then(r => r.json())
      .then(weather => {
        console.log(weather)
      })
      .catch(e => console.error(e))
  }
})
  

