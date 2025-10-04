const Navbar = () => {
    //Get values from context or props later
    const companyName = "Ab Yritys Oy";
    const totalAmount = "X XXX,XX€";
    const orderStatus = "status";

    return (
        <nav className='flex w-full h-20 justify-between px-4 pt-4'    >
            <div className='text-2xl font-bold flex '>
                {companyName}
            </div>
            <div className='flex gap-2'>
                <div>
                    <div className='text-2xl font-bold'>{totalAmount}</div>
                    <div className='flex w-full justify-end'>{orderStatus}</div>
                </div>
                <div>
                    <button className='h-14 w-20 bg-blue-500 text-white p-2 rounded'>Order</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;