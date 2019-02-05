const express = require('express')
const path = require('path')

const app = express()
const port = 3000
const rootDir = path.dirname(process.mainModule.filename)

app.use(express.static('.'))

app.get('/mind-blown', (req, res) => res.sendFile(path.join(rootDir, 'mind-blown.html')))
app.get('/frustrated', (req, res) => res.sendFile(path.join(rootDir, 'frustrated.html')))
app.get('/huge-love', (req, res) => res.sendFile(path.join(rootDir, 'huge-love.html')))

app.listen(port, () => console.log(`app listening on port ${port}`))

