
const express = require("express")
const app = express()
const path = require('path');
process.env.PWD = process.cwd()
app.use(express.static(process.env.PWD + '/public'));
// app.use(express.static(__dirname + '/public'));
let port = process.env.PORT || 80

app.enable('trust proxy')
app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})



app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + `/${req.url}`))
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})