import { client } from "@/sanity/lib/client";
import Link from "next/link";

async function GetData() {
  const fetchData = await client.fetch(`
    *[_type == "product"]{
      _id,
      productName,
      description,
      price,
      "image": image.asset->url,
      category,
      inventory,
      colors,
      status
    }
  `);
  return fetchData;
}

export default async function Home() {
  const data = await GetData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((product: any) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <div className="bg-white shadow-md rounded-lg p-4 transition-shadow">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
              )}
              <h2 className="text-xl font-bold mb-2 text-black">
                {product.productName}
              </h2>
              <p className="text-gray-600 mb-2">{product.description}</p>

              <p className="text-sm text-gray-600">
                <strong className="text-black">Category:</strong>{" "}
                {product.category}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="text-black">Colors:</strong>{" "}
                {product.colors.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="text-black">Status:</strong> {product.status}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="text-black">Inventory:</strong>{" "}
                {product.inventory}
              </p>
              <p className="text-3xl font-bold text-gray-700 mb-2">
                <strong>₹</strong> {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
