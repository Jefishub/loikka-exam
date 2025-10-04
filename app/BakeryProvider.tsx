'use client';

import { BakeryContext } from "./BakeryContext";
import { useMemo, useState } from "react";
import { CustomerStatus } from "./customer/[id]/page";
import { Product } from "./Products";
import { redirect, useParams } from "next/navigation";

interface MainProviderProps {
    children: React.ReactNode;
}

const API_URL_BASE = "https://bakery-aed4b5b3.digi.loikka.dev";

export const BakeryContextProvider: React.FC<MainProviderProps> = ({ children }) => {
    // Import CustomerStatus and Product types if not already imported
    // import type { CustomerStatus, Product } from "./BakeryContext";

    const [customer, setCustomer] = useState<CustomerStatus>({
        data: [],
        metadata: { total: 0 }
    });
    const params = useParams<{ id: string }>();
    const customerNumber = parseInt(params.id, 0);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const isOrdered = customer.data.length > 0 && customer.data[0].status === "ordered";

    const addProduct = (product: Product) => {
        if (!isOrdered) {
            setSelectedProducts((prevProducts) => [...prevProducts, product]);
        }
    };
    const removeProduct = (productId: string) => {
        if (!isOrdered) {
            setSelectedProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
        }
    };

    const resetProducts = () => {
        setSelectedProducts([]);
    }

    const getCustomer = async (id: number) => {
        const res = await fetch(`${API_URL_BASE}/v1/bakery?customerNumber=${id}`, { cache: 'no-store' })
        return res.json()
    }

    const updateCustomer = async (id: number) => {
        const data = await getCustomer(id);
        setCustomer(data);
        if (data.data.length === 0) {
            alert(`Customer ${id} not found`);
            redirect('/');
        }
    }

    const orderAction = () => {
        fetch(`${API_URL_BASE}/v1/bakery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerNumber: customerNumber,
                products: selectedProducts.map(product => product.id),
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    // handle success, e.g., show a message or update state
                    console.log("Order successful:", data);
                    alert("Order placed successfully!");
                } else {
                    // handle error, e.g., show an error message
                    console.error("Order failed:", data);
                    alert("Failed to place order. Please try again.");
                }
            })
            .catch(error => {
                // handle error, e.g., show an error message
                console.error("Order failed:", error);
                alert("Failed to place order. Please try again.");
            });
    }

    const contextValue = useMemo(() => ({
        customer,
        setCustomer,
        selectedProducts,
        setSelectedProducts,
        addProduct,
        removeProduct,
        getCustomer,
        orderAction,
        resetProducts,
        updateCustomer
    }), [customer, selectedProducts]);

    return (
        <BakeryContext.Provider value={contextValue}>
            {children}
        </BakeryContext.Provider>
    );
};