module.exports = function (app) {
    var user = require('../controllers/user.controller');

    app.post('/login', user.login);
    app.post('/logout', user.logout);
    app.route('/register')
        .get(user.register)
        .post(user.create);

    app.get('/read', user.read);
    app.get('/read/:username', user.readOne);

    app.put('/edit/:username', user.editOne);

    app.delete('/delete/:username', user.deleteOne);

    app.param('username', user.userByUsername);
};