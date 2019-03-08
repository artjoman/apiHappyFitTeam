window.onload = function() {
    var loginButton = document.getElementById("login");


    loginButton.onclick = function (req, res) {
        window.location=("/users", function (req, res, next) {
            // res.send('respond with a resource');
            res.render('homepage', {title: 'Thank You'});
        });
    }
}



