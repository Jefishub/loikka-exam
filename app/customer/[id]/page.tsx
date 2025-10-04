import Products, { Product } from "@/app/Products"

const getCustomer = async (id: number) => {
    const res = await fetch(`https://bakery-aed4b5b3.digi.loikka.dev/v1/bakery?customerNumber=${id}`, { cache: 'no-store' })
    return res.json()
}


type CustomerStatus = {
    data: {
        created: number,
        status: string,
        products: Product[]
    }[],
    metadata: {
        total: number
    }
}

export default async function CustomerPage({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params
    const customer: CustomerStatus = await getCustomer(id)
    console.log(customer)

    return customer.data.length === 0
        ? <div>Customer {id} not found</div>
        : (
            <div>
                <h1>{id}</h1>
                <Products />
            </div>
        )
}