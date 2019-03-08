console.log('Server-side code running');

const express = require('express');
const request = require('request');
const app = express();

// start the express web server listening on 8080
app.listen(8080, () => {
    console.log('listening on 8080');
});

// ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/Token', function (req, res) {
    res.sendFile(__dirname + '/Token.html');

    // Get Steps after accessing /Token.html
    request('https://api.fitbit.com/1/user/-/activities/steps/date/2018-01-01/1d/1min.json', { json: true, headers: {'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRLMlQiLCJzdWIiOiI3Q05MUUYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNTUyMDY2NDQ3LCJpYXQiOjE1NTIwMzc2NDd9.wbNh0v3yUeGPmorunslgX7CzGQAjhavgVoR1iTnuvqA'}}, (err, res, body) => {
     if (err) { return console.log(err); }
     console.log(res.headers['content-type']);
     console.log(res.body);

        // var parsed_response_steps = JSON.parse(res.body);
        // console.log(JSON.parse(parsed_response_steps));

        // Access_Token
        // var access_token = parsedresponse.access_token;
        // console.log('PARSED TOKEN -- > ' + access_token);



});});



// Acquire code
app.get('/token/:code', function (req, res) {
    var query = require('url').parse(req.url, true).query;
    var code = query.code;
    console.log('Code - ' + code);

    // After receiveing code display :
    //  res.sendFile(__dirname + '/Token.html');
    //res.redirect('http://localhost:8080/Token');

   // Exchange the Code for Token
    var request = require('request');
    var headers = {
        'Authorization': 'Basic MjJESzJUOmMyMzcxY2Q5NTU0ZTU5ZjE4OTA4NWFlZmI1OTM4Mjlm',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    var dataString = 'client_id=22DK2T&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Ftoken%2Fcode&code=' +code;

    var options = {
        url: 'https://api.fitbit.com/oauth2/token',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            //   console.log(body);
            var parsedresponse = JSON.parse(body);
            console.log(JSON.parse(body));

            // Access_Token
            var access_token = parsedresponse.access_token;
            console.log('PARSED TOKEN -- > ' + access_token);

            // Refresh_Token
            var refresh_token = parsedresponse.refresh_token;
            console.log('PARSED REFRESH TOKEN -- > ' + refresh_token);
        }
    }

    request(options, callback);
     res.redirect('http://localhost:8080/Token');
});





// request('https://api.fitbit.com/1/user/-/activities/steps/date/2018-01-01/1d/1min.json', { json: true, headers: {'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRLMlQiLCJzdWIiOiI3Q05MUUYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNTUyMDY2NDQ3LCJpYXQiOjE1NTIwMzc2NDd9.wbNh0v3yUeGPmorunslgX7CzGQAjhavgVoR1iTnuvqA'}}, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(res.headers['content-type']);
//     console.log(res.body);
// });



