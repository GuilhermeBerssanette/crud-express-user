const express = require("express");
const router = express.Router();
const {
    getUsers,
    createUser,
    deleteUser,
    updateUser
} = require("../controllers/userController");

const auth = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminMiddleware");

router.get("/", auth, isAdmin, getUsers);
router.post("/", isAdmin, createUser);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

module.exports = router;