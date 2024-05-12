const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { createProduct, getLiveProducts, getSimilarProducts, getProductById, getJewelerProducts, deleteProduct, editProduct, downloadImageFromURL, getJewelerProductsInformation, getProducts } = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");


const router = express.Router();

router.post('/createproduct',protect,upload.array('images', 8), createProduct)
router.get('/getliveproducts', getLiveProducts)
router.get('/getsimilarProducts', getSimilarProducts)
router.get('/getproductbyid/:id', getProductById)
router.delete('/deleteproduct/:id', protect, deleteProduct)
router.patch('/editproduct',protect,upload.array('images', 8), editProduct)
router.get('/getjewelerproducts',protect, getJewelerProducts)
router.get('/getimagebyurl', downloadImageFromURL)
router.get('/getjewelerproducts/:id', getJewelerProductsInformation)
router.get('/getproducts', getProducts)

module.exports = router;