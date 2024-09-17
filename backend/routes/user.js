const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db")
const { JWT_SECRET } = require("../config")
const { authMiddleware } = require("../middleware")
const router = express.Router()

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string().min(1).max(30),
    lastName: zod.string().min(1).max(30)
})
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
})
const updateBody = zod.object({
    username: zod.string().optional(),
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if(!success) {
        return res.status(400).json({
            msg: "Email already taken / incorrect inputs!"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser) {
        return res.status(409).json({
            msg: "User already exists / incorrect inputs!"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        msg: "User created successfully!",
        token: token
    })
})

router.post("/signin", async(req,res) => {
    const { success } = signinBody.safeParse(req.body)
    if(!success) {
        return res.status(400).json({
            msg: 'Incorrect Inputs!'
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if(user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.json({
            token: token
        })
        return
    }

    res.status(411).json({
        msg: "Error while logging in!"
    })
})

router.put("/", authMiddleware, async() => {
    const { success } = updateBody.safeParse(req.body)
    if(!success) {
        return res.status(409).json({
            msg: "Error while updating information!"
        })
    }

    await User.updateOne({
        _id: req.userId
    }, req.body)

    res.json({
        msg: "User updated successfully!"
    })
})

router.get("/bulk", async(req, res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        }))
    })
})

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (err) {
        console.error('Error fetching profile:', err); 
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;

module.exports = router