const router = require('express').Router();
const userModel = require('../models/user');

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let user = userModel.create({ username, email, password: hash });
                let token = jwt.sign({ email, username }, process.env.JWT_SECRET);
                return res.status(201).send({ message: "Registration Successful", token });
            })
        })
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
};

const loginUser = async (req, res) => {
     const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.send('User not found');
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email, username: user.username }, process.env.JWT_SECRET);
                return res.send({ message: "Login Successful", token });
            }
            else {
                return res.send("Invalid Credentials");
            }
        })
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.send('Internal Server Error');
    }
};

router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;