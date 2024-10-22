import { Router } from "express"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController"

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

export default router;