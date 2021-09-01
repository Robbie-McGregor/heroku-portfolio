const express = require("express")
const app = express()
const port = 80

app.get("*", (req, res) => {
    res.sendFile(__dirname + req.url)
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})