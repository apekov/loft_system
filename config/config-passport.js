const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('./index');
const sequelize = require('../db').sequelize;

passport.serializeUser(function(user, done) {
    console.log('Serialize: ', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('Deserialize: ', id);
    sequelize.models.users.findOne({
            where: {
                id: id,
            },
        })
        .then(result => {
            if (!result) {
                return done(err);
            } else {
                done(null, result);
            }
        })
        .catch(err => {
            return done(err);
        })
});

passport.use(
    new LocalStrategy(
        function(req, username, password, done) {
            console.log(username);

            sequelize.models.users.findOne({
                    where: {
                        username: username,
                    }
                })
                .then(user => {
                    console.log(user);

                    if (!user) {
                        return done(null, false, req.flash('message', 'User not found'));
                    }
                    if (password !== user.password) {
                        return done(
                            null,
                            false,
                            req.flash('message', 'Incorrect password')
                        );
                    }
                    console.log('user model ' + user);

                    return done(null, user);
                })
                .catch(err => done(err));
        }
    )
);