import { Product } from "@/models";
import { useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } from "@/state/api";
import { v4 } from "uuid";

export function useProductCRUD() {
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const newProduct: Product = {
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0,
      };
  
    const handleDeleteProduct = async (product: Product) => {
      await deleteProduct(product);
    };
  
    const handleUpdateProduct = async (product: Product) => {
      await updateProduct(product);
    };
  
    const handleCreateProduct = async (
      product: Omit<Product, "productId">
    ) => {
      await createProduct(product);
    };

    return {
        newProduct,
        handleCreateProduct,
        handleDeleteProduct,
        handleUpdateProduct
    }
}