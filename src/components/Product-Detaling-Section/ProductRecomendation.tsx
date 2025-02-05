import Image from "next/image";
import { Star } from "lucide-react";
import { client } from "@/sanity/lib/client";
import React, { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  image: string;
  rating: number;
  ratingCount?: number;
  price: number;
  originalPrice?: number;
  discount?: number;
}
export default function ProductRecommendations() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const fetchedData: Product[] = await client.fetch(
          `*[_type == "product"]{
            _id,
            name,
            price,
            "originalPrice": discountPercentage > 0 ? price / (1 - (discountPercentage / 100)) : price,
            "rating": coalesce(rating, 4),
            "ratingCount": coalesce(ratingCount, 0),
            "image": image.asset->url,
            "discount": discountPercentage
          }`
        );

        setNewArrivals(fetchedData.slice(0, 8));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-8">
        YOU MIGHT ALSO LIKE
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {newArrivals.map((product) => (
          <div key={product._id} className="rounded-lg p-4">
            <div className="aspect-square relative mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 fill-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating}/5
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">${product.price}</span>
              {product.originalPrice && product.discount && (
                <>
                  <span className="text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-red-500 text-sm">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
