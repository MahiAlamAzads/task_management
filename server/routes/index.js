const express = require('express');
const router = express.Router();

const authRouter = require("./auth/index")

router.use("/auth", authRouter)
router.get("/", async function (req, res) {
    res.status(200).json({
        working: "working fine"
    })
})
/* GET indez page. */
// main route

router.use("/project", require("./project/project"))
router.use("/task", require("./task/task"))



module.exports = router;
