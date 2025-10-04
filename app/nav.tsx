'use client'
import { useContext } from "react";
import { BakeryContext } from "./BakeryContext";
import { useRouter } from "next/navigation";

const getStatusText = (status: string) => {
    switch (status) {
        case "not_ordered":
            return "Not ordered";
        case "ordered":
            return "Ordered";
        default:
            return "Not ordered";
    }
};

const getTotalAmountText = (amount: number) => {
    return amount
        .toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        + " €";
};

const Navbar = () => {
    const { customer, selectedProducts, orderAction } = useContext(BakeryContext);
    const router = useRouter();
    const companyName = "Ab Yritys Oy";
    const totalAmount = selectedProducts.reduce((sum, product) => sum + product.amount, 0);
    const orderStatus = customer?.data[0]?.status ? getStatusText(customer.data[0].status) : "Unknown";

    return (
        <nav className='flex w-full h-20 justify-between px-4 pt-4 cursor-pointer'  onClick={() => router.push('/')}  >
            <div className='text-2xl font-bold flex'>
                {companyName}
            </div>
            {customer.data.length > 0 && <div className='flex gap-2'>
                <div>
                    <div className='text-2xl font-bold'>{getTotalAmountText(totalAmount)}</div>
                    <div className='flex w-full justify-end'>{orderStatus}</div>
                </div>
                <div>
                    <button
                        onClick={orderAction}
                        className='h-14 w-20 bg-blue-500 text-white p-2 rounded'>
                        Order
                    </button>
                </div>
            </div>}
        </nav >
    )
}

export default Navbar;