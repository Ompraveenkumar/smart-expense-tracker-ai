const UserSchema = require("../models/UserModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" })
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = UserSchema({
            username,
            email,
            password: hashedPassword,
        })

        await user.save();
        res.status(200).json({ message: "User Registered Successfully!" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found!" })
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" })
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}