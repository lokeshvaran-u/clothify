const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  getDashboardStats
} = require("../controllers/ProductController");

const router = express.Router();


/* Get all products */

router.get(
  "/",
  getProducts
);


/* Get low stock products */

router.get(
  "/low-stock",
  authMiddleware,
  getLowStockProducts
);


/* Dashboard statistics */

router.get(
  "/dashboard-stats",
  authMiddleware,
  getDashboardStats
);


/* Get single product */

router.get(
  "/:id",
  authMiddleware,
  getProductById
);


/* Create product - StoreAdmin only */

router.post(
  "/",
  authMiddleware,
  roleMiddleware("StoreAdmin"),
  createProduct
);


/* Update product - StoreAdmin only */

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("StoreAdmin"),
  updateProduct
);


/* Delete product - StoreAdmin only */

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("StoreAdmin"),
  deleteProduct
);


module.exports = router;