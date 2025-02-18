import { useState, useContext } from "react";
import BreadCrumbs from "../components/BreadCrumbs"
import { CartContext } from "../context/cart";
import { ProductContext } from "../context/products";
import { HiMiniXMark, HiPencil } from "react-icons/hi2";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

export default function Checkout() {

    const { products } = useContext(ProductContext)
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        town: "",
        county: "",
        postCode: ""
    });
    const [formError, setFormError] = useState(false);

    // Step One state
    const [showStepOne, setShowStepOne] = useState(true);
    const [stepOneComplete, setStepOneComplete] = useState(false);

    // Step Two state
    const [showStepTwo, setShowStepTwo] = useState(false);
    const [stepTwoComplete, setStepTwoComplete] = useState(false);

    // Step Three state
    const [showStepThree, setShowStepThree] = useState(false);
    const [stepThreeComplete, setStepThreeComplete] = useState(false);

    const [orderLoading, setOrderLoading] = useState(false);
    const [outOfStockItems, setOutOfStockItems] = useState([]);
    const [orderSuccessful, setOrderSuccessful] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(false);
        console.log("Form Data Submitted:", formData);
        // Add API call or state update logic here
        console.log(formData);

        const isAnyFieldEmpty = Object.values(formData).some(value => value === "");

        if (isAnyFieldEmpty) {
            setFormError(true);
            return;
        }
        setShowStepOne(false);
        setStepOneComplete(true);
        setShowStepTwo(true);

    };

    const handlePlaceOrder = async () => {
        setOrderLoading(true);

        const orderData = {
            customer: formData.firstName + ' ' + formData.lastName,
            address: formData.address,
            products: cartItems.map(item => ({
                id: item.id,
                quantity: item.quantity
            })),
            total: cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
        };


        setOutOfStockItems([]);

        const newOutOfStockItems = [];

        cartItems.forEach((item) => {
            const product = products.find((productItem) => item.id === productItem.id);
            
            if(!product){
                console.log('Cant find product:', item.id);
                return;
            }
            if(product.quantity < item.quantity){
                console.log(`Not enough stock for ${product.title}`);
                newOutOfStockItems.push(product);
            } else {
                console.log(`Enough stock for ${product.title}`);
            }
        });

        setOutOfStockItems(newOutOfStockItems);

        console.log("Final out of stock items:", newOutOfStockItems);

        if (newOutOfStockItems.length === 0) {

            try {
                const response = await fetch('http://localhost:4001/orders', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(orderData)
                });
                if(!response.ok){
                    throw new Error('Failed to place order.')
                }
                const newOrder = await response.json();
                console.log('Order placed', newOrder);

                await updateStock();

                clearCart();
                setOrderSuccessful(true);                

            } catch (error) {
                console.error("Error placing order:", error);
            } finally {
                setOrderLoading(false);
                setStepOneComplete(false);
                setStepTwoComplete(false);
                setShowStepOne(true);
                setShowStepTwo(false);
                setShowStepThree(false);
            }
        }
    }

    const updateStock = async () => {
        try {
            for (const item of cartItems) {
                // Fetch current product stock
                const productResponse = await fetch(`http://localhost:4001/products/${item.id}`);
                const product = await productResponse.json();
    
                if (product) {
                    const updatedStock = product.quantity - item.quantity;
    
                    await fetch(`http://localhost:4001/products/${item.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ quantity: updatedStock })
                    });
                }
            }
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };



    return (
        <>
            <BreadCrumbs items={[{label: 'Home', href: '/'}, {label: 'Checkout'}]} />
            <div className='px-4 py-10 max-w-2xl lg:max-w-6xl mx-auto'>
                <h1 className='text-2xl font-semibold mb-5 text-theme-900'>Checkout</h1>
                <div className='grid lg:grid-cols-2 gap-5'>
                    <div className="col-span-2 lg:col-span-1 flex flex-col gap-y-5">
                        <div className="bg-white shadow-sm p-4 rounded-lg">
                            <div className="flex justify-between">
                            <h2 className="text-theme-900 text-xl font-semibold"><span className="rounded-full inline-flex items-center text-center justify-center w-[30px] h-[30px] text-lg mr-1 text-theme-900 border border-solid border-theme-900">1</span> Delivery</h2>
                            {stepOneComplete && (
                                <button 
                                className="flex items-center text-base px-3"
                                onClick={() => {setShowStepOne(true); setStepOneComplete(false)}}>
                                    <HiPencil className="text-lg"/>
                                    <span>Edit</span>
                                </button>
                            )}
                            </div>
                            {showStepOne && (
                                <form id="addressForm" onSubmit={handleSubmit} className="pt-3 mt-3 border-t border-solid border-theme-100">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="col-span-2 lg:col-span-1">
                                            <label className="block text-base font-medium text-theme-900">First Name *</label>
                                            <input type="text" name="firstName" onChange={handleChange} className="mt-2 p-2 focus-visible:ring-theme-500 focus:ring-theme-500 focus:border-theme-500 block w-full shadow-sm sm:text-sm border-theme-100 border rounded-md" />
                                        </div>
                                        <div className="col-span-2 lg:col-span-1">
                                            <label className="block text-base font-medium text-theme-900">Last Name</label>
                                            <input type="text" name="lastName" onChange={handleChange} className="mt-2 p-2 focus:ring-theme-500 focus:border-theme-500 block w-full shadow-sm sm:text-sm border-theme-100 border rounded-md" />
                                        </div>
                                        <div className="col-span-2 lg:col-span-2">
                                            <label className="block text-base font-medium text-theme-900">Phone</label>
                                            <input type="text" name="phone" onChange={handleChange} className="mt-2 p-2 focus:ring-theme-500 focus:border-theme-500 block w-full shadow-sm sm:text-sm border-theme-100 border rounded-md" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-base font-medium text-theme-900">Address</label>
                                            <input type="text" name="address" onChange={handleChange} className="mt-2 p-2 focus:ring-theme-500 focus:border-theme-500 block w-full shadow-sm sm:text-sm border-theme-100 border rounded-md" />
                                        </div>
                                        <div className="col-span-2 lg:col-span-1">
                                            <label className="block text-base font-medium text-theme-900">Town</label>
                                            <input type="text" name="town" onChange={handleChange} className="mt-2 p-2 focus:ring-theme-500 focus:border-theme-500 block w-full shadow-sm sm:text-sm border-theme-100 border rounded-md" />
                                        </div>
                                        <div className="col-span-2 lg:col-span-1">
                                            <label className="block text-base font-medium text-theme-900">County</label>
                                            <input type="text" name="county" onChange={handleChange} className="mt-2 p-2 focus:ring-theme-500 focus:border-theme-500 block w-full shadow-sm sm:text-sm border-theme-100 border rounded-md" />
                                        </div>
                                        <div className="col-span-2 lg:col-span-1">
                                            <label className="block text-base font-medium text-theme-900">Postcode</label>
                                            <input type="text" name="postCode" onChange={handleChange} className="mt-2 p-2 focus:ring-theme-500 focus:border-theme-500 block w-full shadow-sm sm:text-sm border-theme-100 border rounded-md" />
                                        </div>
                                        <div className="col-span-2 lg:col-span-2">
                                            <button
                                                type="submit"
                                                className="px-6 py-3 rounded-lg cursor-pointer bg-theme-300 text-theme-900 text-lg font-semibold hover:bg-theme-green/90"
                                            >
                                                Next
                                            </button>
                                        </div>
                                        {formError && (                                       
                                            <div className="col-span-2 lg:col-span-2">
                                                <p className="font-bold text-lg text-red-500">Please fill in all fields</p>
                                            </div>                                    
                                        )}
                                    </div>
                                </form>                                
                            )}

                        </div>
                        <div className="bg-white shadow-sm p-4 rounded-lg">
                            <div className="flex justify-between">
                                <h2 className="text-theme-900 text-xl font-semibold"><span className="rounded-full inline-flex items-center text-center justify-center w-[30px] h-[30px] text-lg mr-1 text-theme-900 border border-solid border-theme-900">2</span> Review Order</h2>
                                {stepTwoComplete && (
                                    <button 
                                    className="flex items-center text-base px-3"
                                    onClick={() => {setShowStepTwo(true); setStepTwoComplete(false)}}>
                                        <HiPencil className="text-lg"/>
                                        <span>Edit</span>
                                    </button>
                                )}
                            </div>
                            {showStepTwo && cartItems.length > 0 && (
                                <>
                                <ul className="pt-3 mt-3 border-t border-solid border-theme-100 space-y-4">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="grid grid-cols-4 relative">
                                            <div className="col-span-1 hidden sm:block">
                                                <img src={item.images[0]} alt={item.title} />
                                            </div>
                                            <div className='col-span-4 sm:col-span-3 pl-4 py-3'>
                                                <h2 className='text-lg font-bold text-theme-900'>{item.title}</h2>
                                                <div className='flex items-end justify-between mt-1'>
                                                    <div className='flex flex-col'>
                                                        <span className='text-sm text-theme-900'>Item price: £{item.price}</span>
                                                        <span className='text-theme-900 text-lg'>Qty: {item.quantity}</span>
                                                    </div>
                                                    <span className='text-xl text-theme-800 font-semibold'>£{item.quantity * item.price}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-5">
                                    <button
                                        className="px-6 py-3 rounded-lg cursor-pointer bg-theme-300 text-theme-900 text-lg font-semibold hover:bg-theme-green/90"
                                        onClick={() => {setShowStepThree(true); setShowStepTwo(false); setStepTwoComplete(true)}}
                                    >
                                        Next
                                    </button>
                                </div>
                                </>
                            )}
                            {showStepTwo && cartItems.length === 0 && (
                                <p className="mt-5 text-lg">Your basket is empty.</p>
                            )}
                        </div>
                        <div className="bg-white shadow-sm p-4 rounded-lg">
                            <h2 className="text-theme-900 text-xl font-semibold"><span className="rounded-full inline-flex items-center text-center justify-center w-[30px] h-[30px] text-lg mr-1 text-theme-900 border border-solid border-theme-900">3</span> Payment and Billing Address</h2>
                            {showStepThree && cartItems.length > 0 && (
                                <>
                                
                                <div className="pt-3 mt-3 border-t border-solid border-theme-100 space-y-4">
                                    <h3 className="text-lg font-medium">Payment Options</h3>
                                    <p>This is free...as it isn&apos;t a real order!!</p>
                                    <h3 className="text-lg font-medium pt-3 mt-3 border-t border-solid border-theme-100">Billing Address</h3>
                                    <p>
                                        {formData.firstName} {formData.lastName}<br/>
                                        {formData.address}<br/>
                                        {formData.town}<br/>
                                        {formData.county}<br/>
                                        {formData.postCode}<br/>
                                    </p>
                                    <h3 className="text-lg font-medium pt-3 mt-3 border-t border-solid border-theme-100">Delivery Address</h3>
                                    <p>
                                        {formData.firstName} {formData.lastName}<br/>
                                        {formData.address}<br/>
                                        {formData.town}<br/>
                                        {formData.county}<br/>
                                        {formData.postCode}<br/>
                                    </p>
                                </div>
                                <div className="mt-5">
                                    <button
                                        className="flex items-center justify-center min-h-[52px] min-w-[85px] px-6 py-3 rounded-lg cursor-pointer bg-theme-300 text-theme-900 text-lg font-semibold hover:bg-theme-green/90"
                                        onClick={handlePlaceOrder}
                                    >
                                        {orderLoading ? <ClipLoader size={20}/> : 'Place Order'}
                                    </button>
                                    {outOfStockItems.length > 0 && (
                                        <>
                                            <h3 className="text-red-500 font-semibold mt-5">Sorry, we do not have enough stock of the following items:</h3>
                                            <ol className="list-decimal list-inside">
                                                {outOfStockItems.map((item) => (
                                                    <li key={item.id}>
                                                        {item.title} - Qty: {cartItems.find(cartItem => cartItem.id === item.id).quantity} | Stock available: {products.find(product => item.id === product.id)?.quantity ?? 0}
                                                    </li>
                                                ))}
                                            </ol>
                                            <p className="mt-5">Return to <Link to={`/basket`} className="underline font-semibold">basket</Link> and amend your items</p>
                                        </>
                                    )}
                                    {orderSuccessful && (
                                        <div className="pt-3 mt-5 border-t border-solid border-theme-100">
                                            <h3 className="text-2xl font-semibold text-green-600">Order successful</h3>                                            
                                        </div>

                                    )}
                                </div>
                                </>
                            )}
                        </div>                        
                    </div>
                    <ul className='col-span-2 lg:col-span-1 flex flex-col gap-y-5'>
                        {cartItems.length > 0 && (
                            cartItems.map((item, index) => (
                                <li key={index} className='grid grid-cols-4 relative rounded-xl shadow-sm p-4 bg-white'>
                                    <button 
                                        className='cursor-pointer h-[20px] w-[20px] flex items-center justify-center rounded-full absolute top-2 right-2'
                                        onClick={() => removeFromCart(item)}
                                    >
                                        <HiMiniXMark className='text-2xl text-theme-800'/>
                                    </button>
                                    <div className='col-span-1 hidden sm:block'>
                                        <img src={item.images[0]} alt={item.title} />
                                    </div>
                                    <div className='col-span-4 sm:col-span-3 pl-4 py-3'>
                                        <h2 className='text-lg font-bold text-theme-900'>{item.title}</h2>
                                        <div className='flex items-end justify-between mt-1'>
                                            <div className='flex flex-col'>
                                                <span className='text-sm text-theme-900'>Item price: £{item.price}</span>
                                                <span className='text-theme-900 text-lg'>Qty: {item.quantity}</span>
                                            </div>
                                            <span className='text-xl text-theme-800 font-semibold'>£{item.quantity * item.price}</span>
                                        </div>
                                    </div>
                                </li>
                            ))                              
                        )}
                        {cartItems.length === 0 && (
                            <div className="p-4 rounded-lg shadow-sm bg-white flex flex-col">
                                <p className="text-2xl text-theme-900">Your cart is empty</p>
                                <Link to={`/products`} className="bg-theme-300 hover:bg-theme-300/80 px-5 py-3 mt-5 w-fit rounded-lg text-theme-900 font-semibold">Continue shopping</Link>                                
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}
