
module.exports = (app) => {

    app.get('/', (req, res) => {
    
        res.status(200).setHeader('Content-Type', 'text/html')
        res.end('<h1>Olá, seres</h1>')
    
    })
    
}