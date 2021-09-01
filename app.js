const express = require("express")
const app = express()
app.use(express.static(__dirname + '/public'));
let port = process.env.PORT || 80

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + req.url))
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})