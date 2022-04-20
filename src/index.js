
const path = require('path')
const express = require('express') 
const morgan = require('morgan') // log info
const { engine } = require('express-handlebars') // template
const app = express()
const port = 8080
app.use(morgan('combined'))

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resrc/views'))

app.get('/', (req, res) => {
  res.render('newhome')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})