const express = require('express')
var bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 5000;

const config = require('./config.json');
const SMTPConnection = require('nodemailer/lib/smtp-connection');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname+'/src'))

app.get('/', (req, res) => res.sendFile(__dirname+'/src/index.html'));

app.post('/api/contact', (req, res) =>{
    var isValid = validateData(req.body);
    if(isValid){
        sendMessage(req.body)
        res.status(200).send();
    } else {
        res.status(400).send();      
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function sendMessage(data){
    console.log(config.senderEmail, config)
    let connection = new SMTPConnection({
        port: 465,
        host: "smtp.gmail.com",
    });
    
        connection.connect(function(){
            connection.login({
                credentials:{
                    user: 'contact.tomnium@gmail.com',
                    pass: "kwasc22MM",
                }
            }, function(err, info){
                if(err){
                    console.log('login error', err)                
                    connection.quit();                
                }
    
                connection.send(
                    {
                        from: 'contact.tomnium@gmail.com',
                        to: 'contact.tomnium@gmail.com',
                    },
                        generateMessage(data),
                      function(err, info){
                        console.log('message sended',err, info)
                        connection.quit();
                })
            })
        })
}

function validateData(data){
    if(data.name && data.subject && data.email && data.message){
        return true;        
    } else {
        return false;
    }
}

function generateMessage(data){
    return `name - ${data.name}, subject - ${data.subject}, email - ${data.email}, message - ${data.message}`;
}