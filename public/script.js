var name

$(document).ready(()=>{
    name=prompt('enter name : ')
})
function hearbeat(){
    console.log('in heartbeat function')
    setTimeout(()=>{
        console.log('in timeout')
    $.get('/heartbeat?name='+name,()=>{
            hearbeat()
        })
    },2500)
}
hearbeat()