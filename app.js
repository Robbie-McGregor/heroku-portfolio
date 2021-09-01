const express = require("express")
const app = express()
let port = process.env.PORT || 80

app.get("*", (req, res) => {
    res.sendFile(__dirname + req.url)
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})