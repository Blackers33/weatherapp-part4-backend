var express = require('express');
var router = express.Router();

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

//create user
router.post('/signup', (req, res) => {
    // Check if fields are not empty
    if (checkBody(req.body, ['name', 'email', 'password'])) {

        // Check if the user already exists
        User.findOne({ email: req.body.email }).then(dbData => {
            if (dbData === null) {
                //create user
                newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                newUser.save()
                res.json({ result: true })

            } else {

                // user already exists in database
                res.json({ result: false, error: 'User already exists' });
            }
        });
    } else {
        res.json({ result: false, error: 'Missing or empty fields' })
        console.log('Missing or empty fields')
    }
});

//sign in user
router.post('/signin', (req, res) => {
    console.log(checkBody(req.body, ['email', 'password']))
    // Check if fields are not empty
    if (checkBody(req.body, ['email', 'password'])) {

        User.findOne({ email: req.body.email }).then(dbData => {
            if (dbData?.email == req.body.email && dbData?.password == req.body.password) {
                res.json({ result: true })
            } else {
                res.json({ result: false, error: 'User not found' })
            }
        })

    } else {
        res.json({ result: false, error: 'Missing or empty fields' })
        console.log('Missing or empty fields')
        return
    }

})

module.exports = router;