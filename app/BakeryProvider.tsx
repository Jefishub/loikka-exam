'use client';

import { BakeryContext } from "./BakeryContext";
import { useMemo, useState } from "react";
import { CustomerStatus } from "./customer/[id]/page";
import { Product } from "./Products";

interface MainProviderProps {
    children: React.ReactNode;
}

export const BakeryContextProvider: React.FC<MainProviderProps> = ({ children }) => {
    // Import CustomerStatus and Product types if not already imported
    // import type { CustomerStatus, Product } from "./BakeryContext";

    const [customer, setCustomer] = useState<CustomerStatus>({
        data: [],
        metadata: { total: 0 }
    });
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const addProduct = (product: Product) => {
        setSelectedProducts((prevProducts) => [...prevProducts, product]);
    };
    const removeProduct = (productId: string) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };
    const contextValue = useMemo(() => ({
        customer,
        setCustomer,
        selectedProducts,
        setSelectedProducts,
        addProduct,
        removeProduct
    }), [customer, selectedProducts]);

    return (
        <BakeryContext.Provider value={contextValue}>
            {children}
        </BakeryContext.Provider>
    );
};