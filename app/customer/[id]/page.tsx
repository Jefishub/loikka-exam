'use client'
import { BakeryContext } from "@/app/BakeryContext"
import Products, { Product } from "@/app/Products"
import { useParams } from "next/navigation"
import { useContext, useEffect } from "react"

const getCustomer = async (id: number) => {
    const res = await fetch(`https://bakery-aed4b5b3.digi.loikka.dev/v1/bakery?customerNumber=${id}`, { cache: 'no-store' })
    return res.json()
}

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
    const { setCustomer, customer } = useContext(BakeryContext);
    const params = useParams<{ id: string }>();
    const id = parseInt(params.id, 0);
    useEffect(() => {
        const fetchCustomer = async () => {
            if (id) {
                const data = await getCustomer(id);
                setCustomer(data);
            }
        };
        fetchCustomer();
    }, [params]);

    if (customer === null) {
        return <div>Loading...</div>
    }

    return customer.data.length === 0
        ? <div>Customer {id} not found</div>
        : (
            <div>
                <Products customerNumber={id} />
            </div>
        )
}