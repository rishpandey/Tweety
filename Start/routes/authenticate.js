var express = require('express');
var router = express.Router();


module.exports = function (passport) {
    // send login success to angular
    router.get('/success', function (req, res) {
        res.send({ state: 'success', user: req.user ? req.user : null });
    });

    // send fail state to angular
    router.get('/failure', function (req, res) {
        res.send({ state: 'failure', user: null, message: "Invalid username password" });
    });

    // login
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    // signup
    router.post('/signup', passport.authenticate('singup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    // logout --> req.logout is a middleware added by passport
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}