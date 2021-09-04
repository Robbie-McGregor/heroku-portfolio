
const express = require("express")
const app = express()
const path = require('path');
process.env.PWD = process.cwd()
app.use(express.static(process.env.PWD + '/public'));
// app.use(express.static(__dirname + '/public'));
let port = process.env.PORT || 80

app.enable('trust proxy')


app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        // perform host checking prior to https checking, by the way
        if (req.headers.host === 'robbie-mcgregor.herokuapp.com')
            // make express use your custom domain name instead of heroku's default
            return res.redirect(301, 'https://www.robbie-mcgregor.com');
        if (req.headers['x-forwarded-proto'] !== 'https')
            return res.redirect('https://' + req.headers.host + req.url);
        else
            return next();
    } else
        return next();
});



app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + `/${req.url}`))
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})