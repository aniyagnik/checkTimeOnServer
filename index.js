const express=require('express')
const path=require('path')
const session=require('express-session')
const app=express()


app.use(session({
    secret: "secret is a secret",
    resave:false,
    saveUninitialized:true
  })
)
app.use('/',express.static(path.join(__dirname,'/public')))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})

app.get('/blog',(req,res)=>{
    res.sendFile(path.join(__dirname,"public/blog.html"))
})

let ids=[]
var rNum=Math.random()/4294967295
app.get('/heartbeat',(req,res)=>{
    console.log('in heart beat server')
    const {name}=req.query
    const sessionId=req.session.id
    const index=ids.findIndex(ele=>ele.id===sessionId)
    if(index>-1)
    {
       ids[index].value=rNum
    }
    else{
        const sessionInfo={
            id:sessionId,
            name:name,
            value:rNum
        }
        ids.push(sessionInfo)
    }
   
    res.sendStatus(202)
})
setInterval(removeOfflined,10000)
    
function removeOfflined () {
    if(typeof ids[0]!=="undefined")
    {
        let oldVal=rNum
        rNum=Math.random()/4294 //967295
        console.log('old and new : ',oldVal,rNum)
        const newAr=ids.map(ele=>{
            if(ele.value===oldVal){
                ele={...ele,name:ele.name}
                return ele
            }
        })
        ids=newAr
    }
    else{
        return
    }
    
}
app.listen(3000,()=>{console.log('listening at 3000')})

