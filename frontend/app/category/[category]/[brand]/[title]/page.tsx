import { notFound } from "next/navigation";
import { getProductBySlug, getProductApi } from "@/services/product";
import ProductPageClient from "@/components/product/product-page";
import { ProductProps } from "@/lib/interface";

// Интерфейс для параметров маршрута
interface ProductPageProps {
  params: Promise<{ category: string; brand: string; title: string }>;
}

// Серверный компонент
export default async function Page({ params }: ProductPageProps) {
  // Распаковываем params
  const { category, brand, title } = await params;
  // Проверяем, существуют ли category, brand и title
  if (!category || !brand || !title) {
    console.log("Missing parameters:", { category, brand, title });
    notFound();
  }

  // Загружаем данные продукта
  const product = await getProductBySlug(category, title);
  
  if (!product || product.brand.toLowerCase() !== brand.toLowerCase()) {
    console.log("Product not found or brand mismatch:", { product, brand });
    notFound();
  }

  // Загружаем рекомендованные продукты
  const recommendedProducts = await getProductApi(5, product.category);
  const filteredRecommended = recommendedProducts.filter(
    (p: ProductProps) => p.id !== product.id
  );

  // Логируем данные перед передачей в клиентский компонент
  console.log("Product loaded:", product);
  console.log("Recommended products:", filteredRecommended);

  // Передаём данные в клиентский компонент
  return (
    <ProductPageClient
      product={product}
      recommendedProducts={filteredRecommended}
    />
  );
}
