import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function HeroBanner({ mobileImage, desktopImage, header }) {
  return (
    <section className='relative'>
        <img className="block md:hidden" src={`${mobileImage}`}/>
        <img className="hidden md:block" src={`${desktopImage}`}/>
        <div className='absolute inset-0 w-full h-full bg-theme-800/25'>
            <div className='transform absolute -translate-y-1/2 top-1/2 h-full w-full flex flex-col items-center justify-center'>
                <h1 className='text-center text-3xl sm:text-4lx lg:text-5xl text-white'>{header}</h1>
                <Link to={`/products`} className='mt-3 md:mt-10 rounded-lg px-4 py-2 bg-theme-300'>
                View our latest products
                </Link>
            </div>
        </div>
    </section>
  )
}

HeroBanner.propTypes = {
    mobileImage: PropTypes.string,
    desktopImage: PropTypes.string,
    header: PropTypes.string
}
