import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function ProductCategories() {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCategories = async () => {
        try {
            const response = await fetch('./categories.json');
            if (!response.ok){
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <section className='px-4 py-10'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-theme-900 mb-5'>Product categories</h2>
                {categories.length > 0 ? (
                    <div className='overflow-x-auto flex gap-x-5'>
                        {categories.map((item, index) => (
                            <Link key={index} to={`/category/${item.id}/${item.name.toLowerCase()}`} className="overflow-hidden relative min-w-[200px] group">
                                <img src={`${item.image}`} alt="" className='group-hover:scale-110 transform transition-transform duration-500 ease-linear'/>
                                <div className='absolute bottom-0 left-0 px-2 py-2 bg-theme-900/50 w-full text-white font-semibold'>
                                  <h3 className='text-lg'>{item.name}</h3>  
                                </div>
                            </Link>
                            
                            
                        ))}
                    </div>
                ) : (
                    <p>No categories available</p> // Show a message when there are no categories
                )}
            </div>
        </section>
    )
}
