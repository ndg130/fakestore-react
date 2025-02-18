import { useState, useContext, useEffect } from 'react'
import { FaBars, FaShoppingBag, FaSearch } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cart';
import { HiMiniXMark } from "react-icons/hi2";
import { ProductContext } from '../context/products';

export default function NavBar() {

    const withoutSidebarRoutes = ["/dashboard"];
    const { pathname } = useLocation();

    const { products } = useContext(ProductContext);
    const { getCartQuantity, toggleSideCart } = useContext(CartContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleUpdate = (e) => {
        setSearchTerm(e.target.value);
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/categories.json'); // Ensure the correct path
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchCategories();
    }, []);

    useEffect(() => {

        if(searchTerm.trim() === ""){
            console.log('search term blank')
            setSearchResults([]);
            return;
        }
        const filtered = products.filter((product) => {
            return product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(filtered);
        console.log('searchResults:',searchResults)

    }, [searchTerm])

    if (withoutSidebarRoutes.some((item)=> pathname.includes(item))) return null;

    return (
        <>
            <div className='bg-theme-400 font-regular text-gray-800 hidden lg:block relative'>
                <div className='max-w-7xl mx-auto flex justify-between py-3 px-4 items-center z-20'>
                    <div className='w-1/5 h-full'>
                        <Link to={'/'} className='flex items-center gap-2 text-2xl font-bold text-white font-heading'>FakeStore <FaShoppingBag className='text-2xl min-w-5 text-theme-100'/></Link>
                    </div>
                    <nav className="w-3/5 flex justify-center items-center">
                        <ul className="flex gap-4 text-lg">
                        <li><Link to={'/products'}>All</Link></li>
                        {categories.length > 0 && 
                            categories.map(category => (
                                <li key={category.id}>
                                    <Link to={`/category/${category.id}/${category.name.charAt(0).toLowerCase() + category.name.slice(1)}`} className="capitalize hover:underline hover:text-theme-dark">
                                        {category.name}
                                    </Link>
                                </li>
                            ))
                        }
                        </ul>
                    </nav>
                    <div className='w-1/5 flex justify-end gap-x-3 lg:gap-x-5 items-center'>
                        <button 
                            className='cursor-pointer flex items-center justify-center'
                            onClick={() => {setSearchVisible(searchVisible => !searchVisible)}}
                        >
                            <FaSearch className='text-3xl text-theme-500 hover:text-theme-300'/>
                        </button>
                        <button className="bg-theme-green w-12 h-12 cursor-pointer rounded-lg flex items-center relative justify-center" onClick={() => {toggleSideCart()}}>
                            <FaShoppingBag className='text-4xl text-theme-500' />
                            <span className="text-sm text-theme-blue font-medium absolute top-[66%] transform -translate-x-1/2 left-1/2 -translate-y-1/2">{getCartQuantity()}</span>
                        </button>
                    </div>
                </div>
                <div className={`absolute inset-x-0 z-20 top-[72px] bg-white text-theme-dark shadow-lg w-full py-3 px-4 ${searchVisible ? 'block' : 'hidden'}`}>
                    <div className='max-w-7xl mx-auto'>
                        <input 
                            id="searchfield" 
                            type="search" 
                            placeholder="Search..." 
                            autoFocus="autofocus" 
                            className="w-full text-theme-dark transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl" 
                            onChange={handleUpdate}
                        />
                        {searchResults.length > 0 && (
                            <div className={`px-4 py-4 border-t w-full overflow-x-auto flex gap-x-4`}>
                                {searchResults.map((product) => (
                                    <Link 
                                        key={product.id} 
                                        to={`/products/${product.id}`}
                                        className='rounded-lg shadow-sm px-4 py-2 w-[300px] min-w-[200px] border-2 border-theme-100 hover:border-theme-blue cursor-pointer'
                                        onClick={()=>{
                                            setSearchVisible(false)
                                            setSearchTerm("");
                                        }}
                                    >  
                                        <img src={product.images[0]} />
                                        <h3 className='text-base font-semibold mt-2 text-theme-900'>{product.title}</h3>
                                        <p className='text-theme-800'>£{product.price}</p>
                                    </Link>
                                ))}
                            </div>                            
                        )}
                        {searchResults.length === 0 && searchTerm && (
                            <p>No results matched :(</p>
                        )}
                    </div>
                </div>                
            </div>
            <div className='bg-theme-blue font-regular text-white block lg:hidden'>
                <div className='max-w-7xl mx-auto flex justify-between py-3 px-4 items-center'>
                    <div className='w-1/5 h-full'>
                        <button 
                            className='flex items-center gap-2 text-2xl font-bold text-white font-heading'
                            onClick={() => {setMobileMenuOpen(mobileMenuOpen => !mobileMenuOpen)}}
                        >
                            <FaBars className='text-2xl min-w-5 text-white'/>                            
                        </button>
                    </div>
                    <div className='w-3/5 h-full'>
                        <Link to={'/'} className='flex items-center justify-center gap-2 text-2xl font-bold text-white font-heading'>FakeStore <FaShoppingBag className='text-2xl min-w-5 text-theme-100'/></Link>
                    </div>
                    <div className='w-1/5 flex gap-x-2 sm:gap-x-4 justify-end items-center'>
                        <button 
                            className='cursor-pointer flex items-center justify-center'
                            onClick={() => {setSearchVisible(searchVisible => !searchVisible)}}
                        >
                            <FaSearch className='text-xl text-theme-700 hover:text-theme-300'/>
                        </button>
                        <button className="bg-theme-green w-10 h-10 cursor-pointer rounded-lg flex items-center relative justify-center" onClick={() => {toggleSideCart()}}>
                            <FaShoppingBag className='text-3xl text-theme-500' />
                            <span className="text-xs text-theme-dark font-medium absolute top-[70%] transform -translate-x-1/2 left-1/2 -translate-y-1/2">{getCartQuantity()}</span>
                        </button>
                    </div>
                </div>
                <div className={`absolute inset-x-0 z-20 top-[64px] bg-white text-theme-dark shadow-lg w-full ${searchVisible ? 'block' : 'hidden'}`}>
                    <div className='max-w-7xl mx-auto'>
                        <input 
                            id="searchfield" 
                            type="search" 
                            placeholder="Search..." 
                            autoFocus="autofocus" 
                            className="w-full text-theme-900 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl" 
                            onChange={handleUpdate}
                        />
                        {searchResults.length > 0 && (
                            <div className={`px-4 py-4 border-t w-full overflow-x-auto flex gap-x-4`}>
                                {searchResults.map((product) => (
                                    <Link 
                                        key={product.id} 
                                        to={`/products/${product.id}`}
                                        className='rounded-lg shadow-sm px-4 py-2 w-[300px] min-w-[200px] border-2 border-theme-100 hover:border-theme-blue cursor-pointer'
                                        onClick={()=>{
                                            setSearchVisible(false)
                                            setSearchTerm("");
                                        }}
                                    >  
                                        <img src={product.images[0]} />
                                        <h3 className='text-base font-semibold mt-2 text-theme-900'>{product.title}</h3>
                                        <p className='text-theme-800'>£{product.price}</p>
                                    </Link>
                                ))}
                            </div>                            
                        )}
                        {searchResults.length === 0 && searchTerm && (
                            <p className='px-4 py-3'>No results matched :(</p>
                        )}
                    </div>
                </div>  
                <div 
                    className={`fixed right-0 top-0 bottom-0 w-9/10 bg-gray-100 z-100 p-4 pt-20 transform transition-transform duration-300 ease-linear ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <button 
                        className='cursor-pointer flex items-center justify-center rounded-full absolute top-2 right-2'
                        onClick={() => {setMobileMenuOpen(mobileMenuOpen => !mobileMenuOpen)}}
                    >
                        <HiMiniXMark className='text-4xl text-theme-900 hover:text-theme-700'/>
                    </button>
                    <nav className="flex justify-start h-full text-theme-900">
                        <ul className="flex flex-col gap-4 text-lg">
                            <li className='hover:underline'><Link to={'/products'}>Products</Link></li>
                            <li><Link to={'/products'} onClick={() => {setMobileMenuOpen(mobileMenuOpen => !mobileMenuOpen)}}>All</Link></li>
                            {categories.length > 0 && 
                                categories.map(category => (
                                    <li key={category.id}>
                                        <Link to={`/category/${category.id}/${category.name.charAt(0).toLowerCase() + category.name.slice(1)}`} onClick={() => {setMobileMenuOpen(mobileMenuOpen => !mobileMenuOpen)}} className="capitalize hover:underline hover:text-theme-dark">
                                            {category.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

NavBar.propTypes = {

}