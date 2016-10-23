var userModel = require('../models/user')

exports.login = function(req, res) {
    res.render('login')
}
exports.doLogin = function(req, res) {
    if(req.session.user){
        res.redirect('/admin/index')
    }
    userModel.findOne({username: req.body.username}, function(err, user) {
        if(err) {
            console.log(err)
            return res.redirect('/admin/login')
        }
        user.compilePassword(req.body.password, function(err, isMatch) {
            if(err){
                return res.redirect('/admin/login')
            }
            if(isMatch) {
                req.session.user = user
                res.redirect('/admin/index')
            }else{
                res.render('login', {
                    error: '密码错误'
                })
            }
        })
    })
}

exports.logout = function(req, res) {
    delete req.session.user
    res.redirect('/admin/login')
}
exports.index = function(req, res) {
    res.app.locals.user = req.session.user
    res.render('index')
}


exports.requireLogin = function(req, res, next){
    if(!req.session.user) {
        res.redirect('/admin/login')
    }

    next();
}