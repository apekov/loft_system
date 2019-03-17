const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('../../controllers/index');

// const isAuthenticated = function(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     req.flash('message', 'Зарегистрируйтесь или войдите в профиль');
//     res.redirect('/');
// };
router.get('/api/getUsers', controllers.getUsers);
router.get('/api/getNews', controllers.getNews);
router.get('*', (req, res) => {
    res.send('index.html')
});


router.post('/api/saveNewUser', controllers.saveNewUser);
router.post('/api/saveUserImage/:id', controllers.saveUserImage);
router.post('/api/login', controllers.login);
router.put('/api/updateUser/:id', controllers.updateUser);
router.put('/api/updateUserPermission/:id', controllers.updateUserPermission);
router.delete('/api/deleteUser/:id', controllers.deleteUser);

router.post('/api/newNews', controllers.newNews);
router.put('/api/updateNews/:id', controllers.updateNews);
router.delete('/api/deleteNews/:id', controllers.deleteNews);

module.exports = router;