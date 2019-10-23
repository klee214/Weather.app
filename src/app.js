const  path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../utils/geoCode.js')
const foreCast = require('../utils/foreCast.js')

const app = express();

//define paths for express config
const viewPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

//setup handlbars path to template
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)  

app.use(express.static(path.join(__dirname,'../public')))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:"Kimin Lee"
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:"about",
        name:"Kimin Lee"
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:"help",
        name:"Kimin Lee"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must enter address"
        })
    }

    geoCode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        foreCast(latitude,longitude,(err, data)=>{
            if(err){
                return res.send({err})
            }
            res.send({
                forecast:data,
                location,
                adress: req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    
    console.log(req.query.games)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render("error",{
        title:404,
        error:"help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render("error",{
        title:404,
        error:"page not found"
    })
})

app.listen(3000,()=>{
    console.log("connected!")
})