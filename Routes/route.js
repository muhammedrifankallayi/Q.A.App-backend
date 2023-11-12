const {Router}  = require("express")
const controller = require("../controllers/UserCtrl")
const refresh = require("../configs/refresh.token")
const qtController = require("../controllers/questions")
const auth = require("../middlewares/Auth")
const multer = require("multer")
const upload = require("../configs/multer")



const router = Router()


router.post("/login",controller.UserLogin)
router.post("/register",controller.userRegister)
router.post("/refresh",refresh)
router.post("/sentotp",controller.sentOtp)
router.patch("/verification",controller.verifyemail)
router.patch("/resetpassword",controller.resetPassword)
router.post("/savequestion",auth.tokenvalidator,qtController.saveQuestion)
router.get("/getuserQusetions",auth.tokenvalidator,qtController.userQas)
router.get("/getusers",controller.getUsers)
router.post("/upload",auth.tokenvalidator,upload.single("image"),controller.uploadImg)
router.get("/getuserdetails",auth.tokenvalidator,controller.getUserDetails)


module.exports = router