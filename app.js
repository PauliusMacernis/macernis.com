const http = require('http');

const requestHandler = require('./routes')

const port = process.env.PORT || 3000

const server = http.createServer(requestHandler)

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})
