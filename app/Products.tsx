const getProducts = async (customerNumber: number, skip: number, limit: number) => {
    const res = await fetch(`https://bakery-aed4b5b3.digi.loikka.dev/v1/bakery/products?customerNumber=${customerNumber}&skip=${skip}&limit=${limit}`, { cache: 'no-store' })
    return res.json()
}
const IMAGE_URL_BASE = "https://bakery-aed4b5b3.digi.loikka.dev"
export type Product = {
    id: string,
    name: string,
    description: string,
    image: string,
    rating: number,
    amount: number,
    currency: string
}

type ProductsResponse = {
    data: Product[],
    metadata: {
        total: number
        skip: number
        limit: number
    }
}

const Products = async () => {
    const products: ProductsResponse = await getProducts(123456, 0, 6);
    console.log(products);
    return (
        <div className="flex flex-wrap gap-4">
            {products.data.map((product: Product, index: number) => {
                const i = index + 1;
                const badge = i % 15 === 0 ? "😍" : i % 3 === 0 ? "👍" : i % 5 === 0 ? "💖" : `#${i}`;
                return (
                <div key={product.id} className="border rounded flex flex-col items-center w-60 justify-between" >
                    <div>
                        <div className="relative">
                            <img src={IMAGE_URL_BASE + product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
                            <span className="absolute top-2 right-2 bg-white/90 text-gray-900 rounded-full px-2 py-0.5 text-xs font-semibold shadow-sm select-none">
                                {badge}
                            </span>
                        </div>
                        <div className="p-2">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < product.rating ? "text-yellow-500" : "text-gray-300"}`}
                                        fill={i < product.rating ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <polygon
                                            points="10,1 12.59,7.36 19.51,7.36 13.97,11.63 16.56,17.99 10,13.72 3.44,17.99 6.03,11.63 0.49,7.36 7.41,7.36"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                    <span className="text-md font-bold flex justify-end w-full pr-2">{product.amount} {product.currency}</span>
                </div>
                );
            })}
        </div>
    );
}

export default Products;