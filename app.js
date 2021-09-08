
const express = require("express")
const app = express()
const path = require('path');
process.env.PWD = process.cwd()
app.use(express.static(process.env.PWD + '/public'));
// app.use(express.static(__dirname + '/public'));
let port = process.env.PORT || 80



app.get('*', (req, res) => {
    console.log("hi")
    const host = req.header("host")
    console.log(req.header)
    console.log(host)
    if(host.match(/\brobbie-mcgregor.herokuapp.com\b/i)){
        res.redirect(301, "https://www.robbie-mcgregor.com"  + req.url);
    }

    res.sendFile(path.resolve(__dirname + `/${req.url}`))
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})