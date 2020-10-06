const path = require('path')
const express = require('express');
const hbs = require('hbs');
const { ppid } = require('process');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geoCode');


const app = express();

// creating port for the heroku app to listen to
const port = process.env.PORT || 3000

// define paths for config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and vies location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);


// setup static directory t server.
app.use(express.static(publicDirectoryPath));

// set up my get requests to respond
app.get('', (req, res)=>{
    res.render('index', {
        title1: 'Home',
        title: 'weather App',
        name: 'echendu chinedum'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title1:'About',
        title: 'founder Bennewton',
        name: 'blackgik',
        age: 26
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title1: 'help',
        title: 'Help page',
        message: 'the beginnng always start with regrets. start now to move.'
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404', {
        title: '404 page',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send({
            error:'please provide a valid address'
        })
    }

    geocode(req.query.address, (error, {location, latitude, longitude}={}) =>{
        if (error){
            return res.send(error);
        }

        forecast(longitude, latitude, (error, {description})=>{
            if(error){
                return res.send(error)
            }
            const dataforcast = `it is ${description}`
            res.send({
                forecast: dataforcast,
                location: location,
                address: req.query.address,
            })
        })
    })
})

app.get('/product', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'please provide a search term'
        })
    }
    
    console.log(req.query.search);
    res.send({
        product: [],
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 page',
        errorMessage:'Page not found'

    })
})

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})