'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { BakeryContext } from './BakeryContext'

const getProducts = async (customerNumber: number, skip: number, limit: number) => {
    const res = await fetch(`https://bakery-aed4b5b3.digi.loikka.dev/v1/bakery/products?customerNumber=${customerNumber}&skip=${skip}&limit=${limit}`, { cache: 'no-store' })
    return res.json()
}


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
    const { selectedProducts, setSelectedProducts } = useContext(BakeryContext);
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

    const handleSelectProduct = (product: Product, isSelected: boolean) => {
        if (isSelected) {
            setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    }

    if (!products) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="flex flex-wrap gap-4">
                {products.data.map((product: Product, index: number) => {
                    const i = parseInt(product.id.replace(/^pr_0*/, ""), 10);
                    const badge = i % 15 === 0 ? "😍" : i % 3 === 0 ? "👍" : i % 5 === 0 ? "💖" : `#${i}`;
                    const isSelected = selectedProducts.filter(p => p.id === product.id).length > 0;
                    return (
                        <ProductCard key={product.id} product={product} badge={badge} isSelected={isSelected} onClick={() => handleSelectProduct(product, isSelected)} />
                    );
                })}
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                    <button className="bg-blue-500 text-white p-2 rounded mt-4 w-28" onClick={prevAction}>{"<< Previous"}</button>
                    <button className="bg-blue-500 text-white p-2 rounded mt-4 w-28" onClick={nextAction}>{"Next >>"}</button>
                </div>
                <div className='font-bold'>page {currentPage} / {maxPages}</div>
                <div className='font-bold'>Total {maxItems} products</div>
            </div>
        </div>
    );
}

export default Products;