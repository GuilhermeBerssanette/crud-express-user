const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

function signToken(user) {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "2h"}
    )
}

async function register(req, res) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "name, email e password são obrigatorios"});
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() })

    if(exists) {
        return res.status(409).json({ message: "Email já cadastrado" })
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashed,
        role: role === "admin" ? "admin" : "user"
    });

    const token = signToken(user);

    return res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
}


async function login(req, res) {
     const { email, password } = req.body;

     if (!email || !password) {
        return res.status(400).json({ message: "email e password são obrigatorios"});
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })

    if(!user) {
        return res.status(409).json({ message: "Credenciais inválidas" })
    }

    const ok = await bcrypt.compare(password, user.password);

    if(!ok) {
        return res.status(401).json({ message: "Credenciais inválidas" })
    }

    const token = signToken(user);

    return res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
}

module.exports = { register, login };