var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer')
const googleApis = require("googleapis");



const REDIRECT_URI = `https://developers.google.com/oauthplayground`;
const CLIENT_ID = `1028152602976-cq0jfv4ln0lqstnba03gu0j27dirq511.apps.googleusercontent.com`;
const CLIENT_SECRET = `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`;
const REFRESH_TOKEN = `1//04ox2ZAknkYYpCgYIARAAGAQSNwF-L9IrnW4U2TgMMIVr-Nf8oohjsH_jL3bLcBUAR9Reyr1sH1Ryg8_32_qLL0TEugXNLuSIg6A`;

const authClient = new googleApis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 
  REDIRECT_URI);
  authClient.setCredentials({refresh_token: REFRESH_TOKEN});
  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/send-mail',function(req,res){
  async function mailer(){
    try{
    const ACCESS_TOKEN = await authClient.getAccessToken();
    const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
    type: "OAuth2",
    user: "sanaali0526@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: ACCESS_TOKEN
    }
    })
    const details = {
    from: "sanaali0526@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    html:`<h2 style="colour:red;">${req.body.text}</h2>`
    }
    const result = await transport.sendMail(details);
    return result;
    }
    catch(err){
    return err;
    }
   }
   mailer().then(res => {
    console.log("sent mail !", res);
   })
   res.send("sent mail")
})


module.exports = router;
