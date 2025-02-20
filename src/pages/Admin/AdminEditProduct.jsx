import { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import { ProductContext } from '../../context/products';
import { Link } from 'react-router-dom';
import { HiPlus, HiOutlineXMark } from "react-icons/hi2";
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminEditProduct() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { products, fetchProducts } = useContext(ProductContext);
    const [imageInput, setImageInput] = useState("");
    const [formError, setFormError] = useState(null);
    const [productSuccess, setProductSuccess] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
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

    useEffect(() => {
        if(products.length > 0 && id !== null){

            const currentProduct = products.find(product => Number(product.id)=== Number(id));
            
            const updateForm = {
                id: currentProduct.id,
                title: currentProduct.title,
                price: currentProduct.price,
                description: currentProduct.description,
                category: {
                    id: currentProduct.category.id,
                    name: currentProduct.category.name,
                    image: currentProduct.category.image
                },
                images: currentProduct.images,
                quantity: currentProduct.quantity
            }

            setFormData(updateForm);

        }
    }, [products, id]);

    const updateProduct = async (updatedProduct) => {
        console.log('Updating product...');


        try {
            const response = await fetch(`${import.meta.env.VITE_PRODUCTS_SERVER}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
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

        const updatedProduct = {
            ...formData,
            id: id
        }

        console.log("Form Data Submitted:", formData);
        // Add API call or state update logic here
        await updateProduct(updatedProduct);

        setProductSuccess(true);
        fetchProducts();

        setTimeout(() => {
            navigate('/dashboard/products');
        }, 1000)

    };

    const handleDelete = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_PRODUCTS_SERVER}/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log(`Product ${id} deleted successfully.`);


            setShowDeleteModal(false);
            setTimeout(() => {
                navigate('/dashboard/products');
            }, 1000)

        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }


    return (
        <div className='relative flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] lg:min-h-screen'>
            <Sidebar activePage="products"/>
            <div className='flex-1 lg:ml-72 max-w-2xl sm:max-w-5xl lg:max-w-7xl w-full h-full py-10 px-4'>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-3xl font-semibold text-theme-900">Edit product{id ? ' #'+id : '' }</h1>
                            <p className="mt-2 text-sm text-gray-700">Edit an existing product from the store product catalogue</p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-x-3 items-center">
                            <Link to={`/dashboard/products`} type="button" className="block rounded-md bg-theme-100 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-theme-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Cancel</Link>
                            <button
                                className="px-4 py-2 rounded-lg cursor-pointer bg-red-500 text-white hover:bg-red-500/90"
                                onClick={() => {setShowDeleteModal(true)}}
                            >
                                Delete Product
                            </button>
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
                            value={formData.title}
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
                            value={formData.price}
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
                            value={formData.description}
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
                            value={formData.category.id}
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
                                value={formData.quantity}
                                onChange={handleChange}
                                step="1"
                                required
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className='flex gap-x-3'>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg cursor-pointer bg-green-500 text-white hover:bg-green-500/90"
                            >
                                Update Product
                            </button>
                        </div>

                        {formError && (
                            <div className='mt-3 py-2 text-red-600 font-semibold text-xl border-2 border-red-600 border-solid px-4'>
                                <p>{formError}</p>
                            </div>
                        )}
                        {productSuccess && (
                            <div className='mt-3 py-2 text-green-600 font-semibold text-xl border-2 border-green-600 border-solid px-4'>
                                <p>Product updated successfully!</p>
                            </div>
                        )}
                    </fieldset>
                    </form>
                    </div>
            </div>
            <div className={`relative z-[9999] ${showDeleteModal ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity pointer-events-none" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    
                    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                        <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="sr-only">Close</span>
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                            <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">Delete product</h3>
                            <div className="mt-2">
                            <p className="text-sm text-gray-500">Are you sure you want to delete this product? All of the data will be permanently removed from the products database forever. This action cannot be undone.</p>
                            </div>
                        </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button type="button" onClick={handleDelete} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                            <button type="button" onClick={() => {setShowDeleteModal(false)}} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}
