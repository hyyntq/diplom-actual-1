import { ProductProps } from "@/lib/interface";
import { generateSlug } from "@/lib/utils";

export async function getProductApi(limit?: number, category?: string) {
  if(!category) {
    category = "smartphones"
  }
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}${
        limit ? `?limit=${limit}` : ""
      }`
    );
    const data = await response.json()
    return  data.products
  } catch (error) {
    console.log(error);
    return
  }
}

export async function getProductById(id: number): Promise<ProductProps | null> {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    if (!data.id) return null;
    return {
      ...data,
      quantity: 1, 
      reviews: [
        {
          user: "John Doe",
          rating: Math.round(data.rating),
          comment: "Great product! Really satisfied with the purchase.",
          date: "2023-10-01",
        },
        {
          user: "Jane Smith",
          rating: Math.round(data.rating) - 1,
          comment: "Good, but could be better for the price.",
          date: "2023-09-15",
        },
        {
          user: "Emily Johnson",
          rating: Math.round(data.rating) - 2,
          comment: "The product is okay, but the packaging was damaged.",
          date: "2025-01-08",
        },
        {
          user: "Michael Davis",
          rating: Math.round(data.rating) - 1,
          comment: "Good, but could be better for the price.",
          date: "2023-09-15",
        },
        {
          user: "Sophia Wilson",
          rating: Math.round(data.rating) - 2,
          comment: "Not as described. Had to return it.",
          date: "2025-03-30",
        },
      ],
    } as ProductProps;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getProductBySlug(
  category: string,
  titleSlug: string
): Promise<ProductProps | null> {
  try {
    const products = await getProductApi(undefined, category);
    const product = products.find((p: ProductProps) => {
      const generatedSlug = generateSlug(p.title);
      return generatedSlug === titleSlug;
    });

    if (!product) {
      console.log("Product not found for slug:", titleSlug);
      return null;
    }

    const fullProduct = await getProductById(product.id);
    console.log("Full product:", fullProduct);
    return fullProduct;
  } catch (error) {
    console.log("Error in getProductBySlug:", error);
    return null;
  }
}