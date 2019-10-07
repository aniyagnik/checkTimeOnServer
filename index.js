const express=require('require')
const path=require('path')

const app=express()

app.use('/',express.static(path.join(__dirname,'/public')))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})

app.get('/blog',(req,res)=>{
    res.sendFile(path.join(__dirname,"public/blog.html"))
})

app.listen(3000,()=>{console.log('listening at 3000')})

