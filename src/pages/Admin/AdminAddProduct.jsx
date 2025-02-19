import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import { ProductContext } from '../../context/products';
import { Link } from 'react-router-dom';
import { HiPlus, HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

export default function AdminAddProduct() {

    const navigate = useNavigate();
    const { products, fetchProducts } = useContext(ProductContext);
    const [imageInput, setImageInput] = useState("");
    const [formError, setFormError] = useState(null);
    const [productSuccess, setProductSuccess] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        price: "",
        description: "",
        category: {
            id: "",
            name: "",
            image: ""
        },
        images: [],
        quantity: ""
    });

    useEffect(() => {
        if(products.length === 0){
            console.log('fetching products for loading');
            fetchProducts();
        }
    }, []);

    const addProduct = async (newProduct) => {
        console.log('Adding product...');


        try {
            const response = await fetch(import.meta.env.VITE_PRODUCTS_SERVER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Success:', data);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" | name === 'quantity' ? Number(value) : value,
        }));
    };

    const handleCategoryChange = async (e) => {
        const selectedValue = e.target.value;


        try {
            const response = await fetch(import.meta.env.VITE_CATEGORIES_SERVER);
            if (!response.ok){
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            
            const productCategory = data.find(category => category.id == selectedValue);
            
            if(!productCategory){
                console.error('Category not found');
                return;
            }

            setFormData((prev) => ({
                ...prev,
                category: {
                    id: Number(e.target.value),
                    name: productCategory.name,
                    image: productCategory.image,
                },
            }));

        } catch (error) {
            console.error('Error fetching categories:', error);
        } 


    };

    const handleImage = (e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, imageInput]
        }));

        setImageInput("");
    };

    const removeImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        // Check for empty fields
        if (!formData.title.trim() || !formData.price || !formData.description.trim() || !formData.category.id || !formData.quantity) {
            console.error("Please fill in all required fields.");
            setFormError("Please fill in all required fields.");
            return;
        }

        // Ensure there is at least one image
        if (formData.images.length === 0) {
            console.error("Please add at least one image.");
            setFormError("Please add at least one image.");
            return;
        }

        const newProduct = {
            ...formData,
            id: products.length + 1
        }

        console.log("Form Data Submitted:", formData);
        // Add API call or state update logic here
        await addProduct(newProduct);

        setProductSuccess(true);
        fetchProducts();

        setTimeout(() => {
            navigate('/dashboard/products');
        }, 1000)

    };    

    return (
        <div className='relative flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] lg:min-h-screen'>
            <Sidebar activePage="products"/>
            <div className='flex-1 lg:ml-72 max-w-2xl sm:max-w-5xl lg:max-w-7xl w-full h-full py-10 px-4'>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-3xl font-semibold text-theme-900">Add product</h1>
                            <p className="mt-2 text-sm text-gray-700">Add a new product to the store product catalogue</p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <Link to={`/dashboard/products`} type="button" className="block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-theme-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Cancel</Link>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
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
                            Category
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            onChange={handleCategoryChange}
                            className="w-full p-2 border rounded bg-white"
                        >
                            <option value="" disabled selected>Select a category</option>
                            <option value="1" data-name="Clothes" data-image="clothes.jpg">Clothes</option>
                            <option value="2" data-name="Electronics" data-image="electronics.jpg">Electronics</option>
                            <option value="3" data-name="Furniture" data-image="furniture.jpg">Furniture</option>
                            <option value="4" data-name="Shoes" data-image="shoes.jpg">Shoes</option>
                            <option value="5" data-name="Miscellaneous" data-image="miscellaneous.jpg">Miscellaneous</option>
                        </select>
                        </div>

                        {/* Image Upload */}
                        <div className="mb-4">
                        <label htmlFor="images" className="block font-medium mb-1">
                            Images
                        </label>
                        <p id="images-description" className="text-sm text-gray-500 mb-1">
                            Enter your image link and click the add button. Verify your link is valid by checking the thumbnail preview after clicking add.
                        </p>
                        <div className='flex gap-x-2'>
                            <input
                                type="text"
                                id="images"
                                name="images"
                                value={imageInput}
                                onChange={(e)=>setImageInput(e.target.value)}
                                className="w-full p-2 border rounded bg-white"
                            />
                            <button 
                            onClick={handleImage} 
                            className='border-2 px-2 rounded-lg border-theme-500 bg-theme-50 hover:bg-theme-100 hover:text-theme-50 transform duration-300 transition-all'
                            >
                                <HiPlus className='text-2xl text-theme-900'/>
                            </button>                      
                        </div>

                        {formData.images.length > 0 && (
                            <ul className='flex flex-col gap-y-2 mt-3'>
                                {formData.images.map((image, index) => (
                                    <li key={index} className='flex gap-2 justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <img src={image} className='w-10 h-10'/>
                                            <span className='text-xs'>{image}</span>                                            
                                        </div>
                                        <button onClick={() => removeImage(index)}><HiOutlineXMark className='text-2xl'/></button>
                                    </li>
                                ))}
                            </ul>                            
                        )}

                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block font-medium mb-1">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                onChange={handleChange}
                                step="1"
                                required
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg cursor-pointer bg-green-500 text-white hover:bg-green-500/90"
                            >
                                Add Product
                            </button>
                        </div>

                        {formError && (
                            <div className='mt-3 py-2 text-red-600 font-semibold text-xl border-2 border-red-600 border-solid px-4'>
                                <p>{formError}</p>
                            </div>
                        )}
                        {productSuccess && (
                            <div className='mt-3 py-2 text-green-600 font-semibold text-xl border-2 border-green-600 border-solid px-4'>
                                <p>Product added successfully!</p>
                            </div>
                        )}
                    </fieldset>
                    </form>
                    </div>
            </div>        
        </div>
    )
}
