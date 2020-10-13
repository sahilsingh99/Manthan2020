var mongoose = require("mongoose");
var nodemailer = require("nodemailer"),
    {google} = require("googleapis"),
    OAuth2 = google.auth.OAuth2,
    json2html = require('node-json2html');


var URI = process.env.URI;

mongoose.connect(URI,{ useNewUrlParser: true , useUnifiedTopology: true })
.then( res => {
    console.log("Connected to db");
})
.catch(err => console.log(err));


var userSchema = new mongoose.Schema({
    fullname: String,
    rollno: String,
    branch: String,
    year: String,
    email: String,
    phone: String,
    codingprofilelinks: String,
    opensourcelinks: String,
    otherprofiles: String,
    score: Number,
    timestamp: String
});

var User = mongoose.model('User', userSchema);

// add user
exports.addUser = (req, res)=> {
    var fullname = req.body.fullname;
    var rollno = req.body.rollno;
    var branch = req.body.branch;
    var year = req.body.year;
    var email = req.body.email;
    var phone = req.body.phone;
    var codingprofilelinks = req.body.codingprofilelinks;
    var opensourcelinks = req.body.opensourcelinks;
    var otherprofiles = req.body.otherprofiles;
    var timestamp = new Date();

    User.find({email:email},(err,user,next) => {
        //console.log(user);
        if(user.length === 0) {
            var newUser = new User({
                fullname: fullname,
                rollno: rollno,
                branch: branch,
                year: year,
                email: email,
                phone: phone,
                codingprofilelinks: codingprofilelinks,
                opensourcelinks: opensourcelinks,
                otherprofiles: otherprofiles,
                score: 0,
                timestamp: timestamp
            })
            newUser.save(function (err, testEvent) {
                if (err) return console.error(err);
                console.log("New user record saved!");
              });
        
        var strVar="";
        strVar += "<!DOCTYPE html>";
        strVar += "<html>";
        strVar += "<head>";
        strVar += " <title>Manthan<\/title>";
        strVar += "<\/head>";
        strVar += "<body style=\"background-color:#F4F8FF;";
        strVar += "     width: 100%;";
        strVar += "     height: 100%;";
        strVar += "     text-align: center;";
        strVar += "     font-family: \"wf_segoe-ui_normal\", \"Segoe UI\", \"Segoe WP\", Tahoma, Arial, sans-serif;";
        strVar += "     display:-webkit-box;";
        strVar += "     -webkit-box-orient:horizontal;\"><table bgcolor=\"#F4F8FF\"";
        strVar += " <div style=\" margin-left: 15%; margin-right: 15%; \"> ";
        strVar += "";
        strVar += "     <img src=\"cid:image1@logo.com\" width=\"100%\">";
        strVar += "     <h3>Congratulations "+ fullname +" !<\/h3>";
        strVar += "         <hr style=\"color: #141414;\" >";
        strVar += "";
        strVar += "     <p style=\"padding-top:9px;";
        strVar += "     padding-right:18px;";
        strVar += "     padding-bottom:9px; ";
        strVar += "     padding-left:18px; ";
        strVar += "     word-break:break-word; ";
        strVar += "     color:#202020; ";
        strVar += "     font-family:Arial,'Helvetica Neue',Helvetica,sans-serif; ";
        strVar += "     font-size:16px; ";
        strVar += "     line-height:150%; ";
        strVar += "     text-align:left; \">";
        strVar += "     You have been successfully registered! <br\/><br\/>";
        strVar += "     Our schedule is as follows<br\/>";
        strVar += "      <b>- Manthan - ShowCase Round<\/b> <br\/>";
        strVar += "      <b>- Manthan - Personal Interview Round<\/b> <br\/><br\/>";
        strVar += "     Be there on time and show your passion :)<br\/>";
        strVar += "     <\/p>";
        strVar += "";
        strVar += "     <p style=\"padding-top:9px;";
        strVar += "     padding-right:18px;";
        strVar += "     padding-bottom:9px; ";
        strVar += "     padding-left:18px; ";
        strVar += "     word-break:break-word; ";
        strVar += "     color:#202020; ";
        strVar += "     font-family:Arial,'Helvetica Neue',Helvetica,sans-serif; ";
        strVar += "     font-size:16px; ";
        strVar += "     line-height:150%; ";
        strVar += "     text-align:left;";
        strVar += "     align=\"top\";";
        strVar += "     }\">";
        strVar += "";
        strVar += "     ";
        strVar += "     Have questions? Wanna give some feedback? Feel free to contact us anytime<br\/>";
        strVar += "     Phone:- +91 7015266612<br\/>";
        strVar += "     Email:- manantechnosurge@gmail.com<br\/>";
        strVar += "     <br\/><br\/>";
        strVar += "     Cheers!<br>WebTeam <br\/><i>Manan<\/i> <br\/> #manthan2020";
        strVar += "     <\/p>";
        strVar += "     <table align=\"center\">";
        strVar += "     <tr>";
        strVar += "     <td>";
        strVar += "     <a href=\"http:\/\/www.facebook.com\/manan.ymcaust\">";
        strVar += "     <img src=\"http:\/\/mananymca.herokuapp.com\/dark-facebook-96.png\" alt=\"Facebook\" class=\"x_mcnFollowBlockIcon\" style=\"width:48px; max-width:48px; display:block; border:0; height:auto; outline:none; text-decoration:none\" width=\"48\">Fb";
        strVar += "     <\/a>";
        strVar += "     <\/td>";
        strVar += "     <td>";
        strVar += "     <a href=\"http:\/\/www.manan.tech\">";
        strVar += "     <img src=\"http:\/\/mananymca.herokuapp.com\/dark-link-96.png\" alt=\"Website\" class=\"x_mcnFollowBlockIcon\" style=\"width:48px; max-width:48px; display:block; border:0; height:auto; outline:none; text-decoration:none\" width=\"48\"> Website";
        strVar += "     <\/a>";
        strVar += "     <\/td>";
        strVar += "     <\/tr>";
        strVar += "     <\/table>";
        strVar += "";
        strVar += "     ";
        strVar += "";
        strVar += "    <\/div><\/table>";
        strVar += "<\/body>";
        strVar += "<\/html>";
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID, // ClientID
            process.env.CLIENT_SECRET, // Client Secret
            "https://developers.google.com/oauthplayground" // Redirect URL
        );
        
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
        const accessToken = oauth2Client.getAccessToken();
        
        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                 type: "OAuth2",
                 user: "manantechnosurge@gmail.com", 
                 clientId: process.env.CLIENT_ID,
                 clientSecret: process.env.CLIENT_SECRET,
                 refreshToken: process.env.REFRESH_TOKEN,
                 accessToken: accessToken
            },
            // tls:{
            //     rejectUnauthorized: false
            // }
        });
        
        const mailOptions = {
            from: "manantechnosurge@gmail.com",
            to: email,
            subject: "Manthan - Registeration mail",
            generateTextFromHTML: true,
            html: strVar,
            attachments:[{
                filename : 'kat-banner-bg.jpg',
                path: __dirname + '/MANTHAN2020.jpg',
                cid : 'image1@logo.com'
            }]
        };
        
        smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log(response);
            smtpTransport.close();
        });
        req.flash('Success', "Successfully Registered");
        res.render('done.ejs', { message : req.flash("success")});
        }
        else{ 
            req.flash("failure", "This Email is already Registered :(");
            res.redirect('/');}
    });

    

}

exports.admin=  function (req, res) {
    if(req.params.pin==process.env.ADMIN_PASS){
    User.find({},function (err, user) {
        var data = user;
           var transform = {'tag':'tr','html':'<td style=\"border:1px solid black\">${fullname}</td><td style=\"border:1px solid black\">${rollno}</td><td style=\"border:1px solid black\">${branch}</td><td style=\"border:1px solid black\">${year}</td><td style=\"border:1px solid black\">${email}</td><td style=\"border:1px solid black\">${phone}</td><td style=\"border:1px solid black\">${codingprofilelinks}</td><td style=\"border:1px solid black\">${opensourcelinks}</td><td style=\"border:1px solid black\">${otherprofiles}</td><td style=\"border:1px solid black\">${marks}</td><td style=\"border:1px solid black\">${timestamp}</td>'};
           var html = json2html.transform(data,transform);
        res.send("<html><body>Admin Zone<table><tr style=\"background:black;color:white;font-weight:bold;\"><td style=\"border:1px solid black\">fullname</td><td style=\"border:1px solid black\">rollno</td><td style=\"border:1px solid black\">branch</td><td style=\"border:1px solid black\">year</td><td style=\"border:1px solid black\">email</td><td style=\"border:1px solid black\">phone</td><td style=\"border:1px solid black\">codingprofilelinks</td><td style=\"border:1px solid black\">opensourcelinks</td><td style=\"border:1px solid black\">otherprofiles</td><td style=\"border:1px solid black\">score</td><td style=\"border:1px solid black\">timestamp</td><br/><\/tr>"+html+"<\/table><\/body><\/html>");
        if (err) return console.error(err);
        });
    }else{
        res.send('<h1>Illegal Access</\h1>-WebTeam Manan.')
    }
}