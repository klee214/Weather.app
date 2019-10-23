console.log("Client side java script is loaded")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const messageone = document.querySelector('#message-1')
    const messagetwo = document.querySelector('#message-2')

    const location = search.value.trim()

    messageone.innerHTML = "Loading..."
    fetch("http://localhost:3000/weather/?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageone.innerHTML = data.error
            }else{
                messageone.innerHTML = data.location
                messagetwo.innerHTML = data.forecast
            }
        })
    })
})