const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');


app.use( (req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('unable to append file to server.log');
        }
    });
    next();
});

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear() );
hbs.registerHelper('screamIt', (text) => text.toUpperCase() );

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home',
        quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
        
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About us',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        Error: "Something went wrong "
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});
