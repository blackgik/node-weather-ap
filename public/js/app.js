console.log('creating the http for the weather app on the browser end ')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
 
    //changed where the adress link format...
    fetch('/weather?address='+ location).then((response)=>{
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location 
                messageTwo.textContent = data.forecast
                // messageTwo.textContent = data.forecast
            }
        })
    })
})
