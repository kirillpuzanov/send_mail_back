const express = require('express')
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3008;
dotenv.config()
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.GMAIL_USER || '',
      pass: process.env.GMAIL_PASS || '',
   },
});

app.get('/', (req, res) => {
   res.send('Hello World!!!!')
})

// "https://safe-fjord-00802.herokuapp.com/" base url heroku
app.post('/sendMessage', async (req, res) => {
   const {email, userName, message} = req.body;

   await transporter.sendMail({
      from: userName, email,
      to: 'kirillpuzanov@mail.ru',
      subject: 'Сообщение от просмотревшего CV',
      html: `<b>${message}</b>`
   });
   res.status(200).json( "sent success");
})

app.listen(port, () => {
   console.log(`app listening at: ${port}`)
})


