const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { createProduct, getLiveProducts, getSimilarProducts, getProductById, getJewelerProducts, deleteProduct, editProduct } = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");


const router = express.Router();

router.post('/createproduct',protect,upload.array('images', 8), createProduct)
router.get('/getliveproducts', getLiveProducts)
router.get('/getsimilarProductss', getSimilarProducts)
router.get('/getproductbyid/:id', getProductById)
router.delete('/deleteproductbyid/:id', protect, deleteProduct)
router.patch('/editproduct',protect,upload.array('images', 8), editProduct)
router.get('/getjewelerproducts',protect, getJewelerProducts)

module.exports = router;