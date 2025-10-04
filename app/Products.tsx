'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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

const Products = ({ customerNumber }: { customerNumber: number }) => {
    const [products, setProducts] = useState<ProductsResponse | null>(null)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const limitStr = searchParams.get("limit");
    const skipStr = searchParams.get("skip");
    const limit = limitStr ? parseInt(limitStr, 10) : 6;
    const skip = skipStr ? parseInt(skipStr, 10) : 0;
    const maxItems = products?.metadata.total
    const maxPages = Math.ceil((maxItems || 0) / limit);
    const currentPage = Math.floor((skip || 0) / limit) + 1;

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts(customerNumber, skip, limit);
            setProducts(data);
        }
        fetchProducts();
    }, [customerNumber, searchParams]);

    const setSkip = (skip: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("skip", skip.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }

    const prevAction = () => {
        if (skip <= 0) return;
        const newSkip = Math.max(0, skip - limit);
        setSkip(newSkip);
    }

    const nextAction = () => {
        setSkip(skip + limit);
    }

    if (!products) {
        return <div>Loading...</div>;
    }
    return (
        <div>

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
            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                    <button className="bg-blue-500 text-white p-2 rounded mt-4 w-20" onClick={prevAction}>Previous</button>
                    <button className="bg-blue-500 text-white p-2 rounded mt-4 w-20" onClick={nextAction}>Next</button>
                </div>
                <div>page {currentPage} / {maxPages}</div>
                <div>Total {maxItems} products</div>
            </div>
        </div>
    );
}

export default Products;