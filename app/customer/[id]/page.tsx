'use client'
import { BakeryContext } from "@/app/BakeryContext"
import Products, { Product } from "@/app/Products"
import { redirect, useParams } from "next/navigation"
import { useContext, useEffect } from "react"

export type CustomerStatus = {
    data: {
        created: number,
        status: string,
        products: Product[]
    }[],
    metadata: {
        total: number
    }
}

export default function CustomerPage() {
    const { customer, updateCustomer } = useContext(BakeryContext);
    const params = useParams<{ id: string }>();
    const id = parseInt(params.id, 0);

    useEffect(() => {
        updateCustomer(id);
    }, [params]);

    return customer.data.length === 0
        ? <div>Customer {id} not found</div>
        : (
            <div>
                <Products customerNumber={id} />
            </div>
        )
}