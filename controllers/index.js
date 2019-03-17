const sequelize = require('../db').sequelize;
const passport = require('passport');
const uuidv4 = require('uuid/v4');
const Chance = require('chance');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs').promises;
const rename = fs.rename.promises;
var Jimp = require('jimp');

const chance = new Chance();

module.exports = {
    saveNewUser: async(req, res) => {
        let body = JSON.parse(req.body);
        let objSave = {
            username: body.username,
            firstName: body.firstName,
            surName: body.surName,
            middleName: body.middleName,
            password: body.password,
            permission: body.permission,
            image: '',
            access_token: chance.string({ length: 20 }),
            permissionId: 2
        };
        let obj = await sequelize.models.users.create(objSave);
        await res.json(obj);
    },
    login: async(req, res, next) => {
        // console.log(req);
        // passport.authenticate('local', (err, user, info) => {
        //     console.log(user);

        //     if (err) {
        //         return next(err);
        //     }
        //     if (!user) {
        //         return next(err);
        //     }
        //     req.logIn(user, err => {
        //         if (err) next(err);
        //         if (req.body.remember) {
        //             const token = uuidv4();
        //             sequelize.models.users.update({
        //                     access_token: token,
        //                 }, {
        //                     where: {
        //                         username: user.username
        //                     }
        //                 })
        //                 .then(user => {
        //                     res.cookie('token', token, {
        //                         maxAge: 7 * 60 * 60 * 1000,
        //                         path: '/',
        //                         httpOnly: true,
        //                     });
        //                     console.log('user login model ' + user);
        //                     res.json(user);
        //                 });
        //         } else {
        //             res.json(user);
        //         }
        //     });
        // })(req, res, next);
        let body = JSON.parse(req.body);
        let user = await sequelize.models.users.find({
            where: {
                username: body.username
            }
        });
        await res.json(user.dataValues);
    },
    updateUser: async(req, res) => {
        let body = JSON.parse(req.body);
        let updateUser = await sequelize.models.users.update(body, {
            where: {
                id: req.params.id
            }
        });
        let user = await sequelize.models.users.find({
            where: {
                id: req.params.id
            }
        });
        await res.json(user);
    },
    deleteUser: async(req, res) => {
        let deleteUser = await sequelize.models.users.destroy({
            where: {
                id: req.params.id
            }
        });
        if (deleteUser) {
            await res.json({ success: true });
        }
    },
    saveUserImage: async(req, res) => {
        let form = new formidable.IncomingForm();
        let upload = path.join('./dist', 'upload');
        form.uploadDir = path.join(process.cwd(), upload);
        form.parse(req, (err, fields, files) => {
            let fileName = path.join(upload, files['20'].name);
            let imgSmallName = path.join(upload, `small-${files['20'].name}`);
            let bigImgSave = `/upload/${files['20'].name}`;
            fs.rename(files['20'].path, fileName)
                .then(result => {
                    Jimp.read(fileName)
                        .then(img => {
                            return img
                                .resize(256, 256) // resize
                                .quality(60) // set JPEG quality
                                .greyscale() // set greyscale
                                .write(imgSmallName); // save
                        })
                        .catch(err => {
                            console.error(err);
                        });
                });
            sequelize.models.users.update({ image: bigImgSave }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(result => {
                    res.json({ path: bigImgSave })
                })
        })
    },
    getNews: async(req, res) => {
        let boofArray = [];
        let news = await sequelize.models.news.findAll();
        let users = await sequelize.models.users.findAll();
        news.forEach((item) => {
            let saveObj = item.dataValues;
            users.forEach((user) => {
                saveObj.user = (user.dataValues.id === item.dataValues.userId) ? user.dataValues : null;
            })
            boofArray.push(saveObj);
        })
        res.json(boofArray);
    },
    getUsers: async(req, res) => {
        let users = await sequelize.models.users.findAll();
        res.json(users);
    },
    newNews: async(req, res) => {
        let body = JSON.parse(req.body);
        let obj = await sequelize.models.news.create(body);
        let news = await sequelize.models.news.findAll();
        await res.json(news);
    },
    updateNews: async(req, res) => {
        let body = JSON.parse(req.body);
        let updateUser = await sequelize.models.news.update(body, {
            where: {
                id: req.params.id
            }
        });
        let news = await sequelize.models.news.findAll();
        await res.json(news);
    },
    deleteNews: async(req, res) => {
        let deleteNew = await sequelize.models.news.destroy({
            where: {
                id: req.params.id
            }
        });
        let news = await sequelize.models.news.findAll();

        if (deleteNew) {
            await res.json(news);
        }
    },
    updateUserPermission: async(req, res) => {
        let body = JSON.parse(req.body);
        let objPermission = { permission: body };
        let updateUser = await sequelize.models.users.update(objPermission, {
            where: {
                id: req.params.id
            }
        });
        res.json({ success: true });
    }
}