'use client'

import { Dispatch, SetStateAction, createContext } from 'react';
import { Product } from './Products';
import { CustomerStatus } from './customer/[id]/page';

type BakeryContextType = {
    customer: CustomerStatus
    setCustomer: Dispatch<SetStateAction<CustomerStatus>>
    selectedProducts: Product[]
    setSelectedProducts: Dispatch<SetStateAction<Product[]>>
    addProduct: (product: Product) => void
    removeProduct: (productId: string) => void
    getCustomer: (id: number) => Promise<CustomerStatus>
    orderAction: () => void
    resetProducts: () => void
    updateCustomer: (id: number) => Promise<void>   
}

export const BakeryContext = createContext<BakeryContextType>({
    customer: { data: [], metadata: { total: 0 } },
    setCustomer: () => { },
    selectedProducts: [],
    setSelectedProducts: () => { },
    addProduct: () => { },
    removeProduct: () => { },
    getCustomer: async () => { return { data: [], metadata: { total: 0 } } },
    orderAction: () => { },
    resetProducts: () => { },
    updateCustomer: async () => { return; }
});
