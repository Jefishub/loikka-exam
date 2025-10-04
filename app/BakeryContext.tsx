'use client'

import { Dispatch, SetStateAction, createContext } from 'react';
import { Product } from './Products';
import { CustomerStatus } from './customer/[id]/page';

type BakeryContextType = {
    customer: CustomerStatus
    setCustomer: Dispatch<SetStateAction<CustomerStatus>>
    selectedProducts: Product[]
    setSelectedProducts: Dispatch<SetStateAction<Product[]>>
}

export const BakeryContext = createContext<BakeryContextType>({
    customer: { data: [], metadata: { total: 0 } },
    setCustomer: () => { },
    selectedProducts: [],
    setSelectedProducts: () => { }
});
