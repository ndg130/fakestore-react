import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



export default function ProductCard({product}) {
  return (
    <Link className='text-sm relative group' to={`/products/${product.id}`}>
        <div className='relative overflow-hidden bg-gray-100 rounded-lg'>
            {product.images.length > 0 && (

                        <img src={product.images[0]} alt="" className='group-hover:scale-105 transform ease-linear duration-200' />

            )}            
        </div>
      
        <div className='text-left'>
            <h2 className='mt-4 font-medium text-theme-900 text-lg group-hover:underline'>{product.title}</h2>
            <p className="italic text-gray-500">{product.description.slice(0, 50)}...</p>
            <p className="mt-2 font-medium text-theme-800 text-lg">£{product.price}</p>
        </div>

    </Link>
  )
}

ProductCard.propTypes = {
    product: PropTypes.object
}