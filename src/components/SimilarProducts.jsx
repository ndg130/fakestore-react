import { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules';
import { Link, useParams } from 'react-router-dom';
import { ProductContext } from '../context/products';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SimilarProducts() {

    const { id } = useParams();
    const { products } = useContext(ProductContext);
    
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategoryId] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    

    useEffect(() => {

        const product = products.filter((item) => item.id === Number(id));
        if(product){
            setCategoryId(product[0].category.id);
        }
    
    }, [id, products]);

    useEffect(() => {
        if(category){
            const filtered = products.filter(product => product.category.id === category);
            setSimilarProducts(filtered);
            setIsLoading(false);
        }
    }, [category, products]);


    return (
        <section className='col-span-2 mt-20 bg-none'>
            <div className='max-w-7xl mx-auto py-5'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-theme-dark mb-10'>Similar products you may be interested in</h2>
                {isLoading && (
                    <p>Loading similar products...</p>
                )}
                {!isLoading && (
                    <Swiper 
                        modules={[Pagination]}
                        slidesPerView={2}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            // when window width is <= 320px
                            640: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            // when window width is <= 480px
                            768: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            // when window width is <= 640px
                            1024: {
                              slidesPerView: 5,
                              spaceBetween: 20,
                            },
                        }}
                        className='similarProductsSlider aspect-square w-full object-cover group-hover:opacity-75'
                    >
                    {similarProducts.map((product, index) => (
                        <SwiperSlide key={index} className='bg-gray-100 rounded-lg border-2 border-solid border-theme-blue overflow-hidden h-[400px] md:h-[300px]'>
                            <Link to={`/products/${product.id}`} className=''>
                                <img className="bg-gray-100" src={product.images[0]} alt={product.title} />
                                <div className='px-2 pt-2 min-h-[100px]'>
                                    <h3 className='text-sm font-semibold text-theme-900'>{product.title}</h3>
                                    <p className='text-base font-semibold text-theme-800 pt-1'>£{product.price}</p>
                                </div>
                            </Link>
                        </SwiperSlide>  
                    ))}
                </Swiper>                     
                )}

            </div>
        </section>
    )
}
