import React, { useState, useEffect } from 'react'
import { HiMiniXMark } from "react-icons/hi2";

export default function ProductAdmin() {

    const [products, setProducts] = useState([])
    const [productsToDelete, setProductsToDelete] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: [],
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "categoryId" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Add API call or state update logic here
        addProduct();
    };


    const fetchProducts = () => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data); // Update the product list
            });
    };

    const deleteProducts = (productArray) => {

        if (!Array.isArray(productArray) || productArray.length === 0) {
            console.log("No products selected for deletion.");
            return;
        }

        const deletePromises = productArray.map(itemId => {

            return fetch(`https://api.escuelajs.co/api/v1/products/${itemId}`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.log('Error:', error);
            })

        });

        Promise.all(deletePromises)
            .then(() => {
                fetchProducts();  
            })
            .catch((error) => {
                console.log('Error during deletion:', error)
            });

        setProductsToDelete([]);
    };

    const addProduct = async () => {
        console.log('Adding product...');

        // Ensure images are stored as an array
        const formattedData = {
            ...formData,
            images: formData.images.split(",").map(img => img.trim()),  // Convert comma-separated string to array
        };

        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Success:', data);

            fetchProducts();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleDeleteItem = (id) => {
        console.log('products to delete was:', productsToDelete);

        // Toggle the product's id in the delete list
        setProductsToDelete(prevState => {
            const updatedState = prevState.includes(id)
            ? prevState.filter(item => item !== id) // Remove if already in list
            : [...prevState, id]; // Add if not in list
            // Return the updated state
            return updatedState;
        });
    };

    const resetCatalogue = async () => {
        console.log('Resetting catalogue...');
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();
            let productIdArr = data.map(product => product.id);

            //console.log(productIdArr);
            await deleteProducts(productIdArr);

            const response2 = await fetch('/products.json');
            const data2 = await response2.json();
            console.log(data2);

            const addPromises = data2.map(product => {
                return fetch(`https://api.escuelajs.co/api/v1/products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        categoryId: Number(product.category.id), 
                        images: Array.isArray(product.images) && product.images.length > 0 
                            ? product.images 
                            : product.images.split(',').map(url => url.trim())
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.log('Error:', error);
                })
    
            });

            await Promise.all(addPromises);
            console.log('Catalogue reset successfully!');

        } catch (error){
            console.error('Error: ', error);
        }
    }

    return (
        <div className='max-w-2xl sm:max-w-5xl lg:max-w-7xl mx-auto py-10 px-4'>
            <h1 className='text-3xl font-semibold'>Product Admin</h1>
            <p></p>
            <div className='mt-5'>
                <h2>All products</h2>
                <ul className='grid grid-cols-4 gap-3 mt-3'>
                    {products.map((item, index) => {

                        // Determine if the item is marked as deleted
                        const isDeleted = productsToDelete.includes(item.id);
                        // console.log(item.id + isDeleted);
                        return (
                            <li 
                                key={index}
                                className={`text-xs flex justify-between shadow-md ${isDeleted ? 'border-solid border-red-500 border-2' : ''}`}
                            >
                                <div className='w-full flex p-2 items-center border-r border-solid border-gray-300'>
                                    <h3 className='inline'>Title: {item.title.substring(0, 40)} | id: {item.id}</h3>                                
                                </div>
                                <button 
                                    onClick={() => {toggleDeleteItem(item.id)}}
                                    className='px-2'
                                >
                                    <HiMiniXMark className="text-2xl text-theme-pink hover:text-theme-450 cursor-pointer"/>
                                </button>

                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='mt-10'>
                <h2 className='text-2xl font-semibold mb-3'>Delete unwanted products</h2>
                <p className='mb-5'>Select the items you want to delete by clicking the item&apos;s cross in the list above. All selected items will show a red border. Click the button below once you are ready to go.</p>
                <button 
                    onClick={() => {deleteProducts(productsToDelete)}}
                    className='px-4 py-2 rounded-lg cursor-pointer bg-red-500 text-white hover:bg-red-700'
                >
                    Delete
                </button>
            </div>
            <div className='mt-10'>
                <h2 className='text-2xl font-semibold mb-3'>Reset product catalogue</h2>
                <p className='mb-5'>Reset the product catalogue to it&apos;s original state.</p>
                <button 
                    onClick={() => {resetCatalogue()}}
                    className='px-4 py-2 rounded-lg cursor-pointer bg-theme-green text-theme-dark hover:bg-theme-500'
                >
                    Reset
                </button>
            </div>
            <div className='mt-10'>
                <h2 className='text-2xl font-semibold mb-3'>Add a new product</h2>
                <p className='mb-5'>Select the items you want to delete by clicking the item&apos;s cross in the list above. All selected items will show a red border. Click the button below once you are ready to go.</p>
                <form
                id="productForm"
                className="max-w-lg"
                onSubmit={handleSubmit}
                >
                <fieldset>
                    <legend className="text-lg font-semibold mb-4">Product Details</legend>

                    {/* Title */}
                    <div className="mb-4">
                    <label htmlFor="title" className="block font-medium mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded bg-white"
                    />
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                    <label htmlFor="price" className="block font-medium mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        onChange={handleChange}
                        step="0.01"
                        required
                        className="w-full p-2 border rounded bg-white"
                    />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                    <label htmlFor="description" className="block font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded bg-white "
                    />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                    <label htmlFor="categoryId" className="block font-medium mb-1">
                        Category ID
                    </label>
                    <input
                        type="number"
                        id="categoryId"
                        name="categoryId"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded bg-white"
                    />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                    <label htmlFor="images" className="block font-medium mb-1">
                        Images
                    </label>
                    <p id="images-description" className="text-sm text-gray-500 mb-1">
                        Enter a list of image links, comma separated.
                    </p>
                    <textarea
                        type="textarea"
                        id="images"
                        name="images"
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-2 border rounded bg-white"
                    />
                    </div>

                    {/* Submit Button */}
                    <div>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg cursor-pointer bg-theme-green text-dark hover:bg-theme-green/90"
                    >
                        Add Product
                    </button>
                    </div>
                </fieldset>
                </form>
                
            </div>
        </div>
    )
}
