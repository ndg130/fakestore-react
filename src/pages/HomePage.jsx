import React, { useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import ProductCategories from '../components/ProductCategories'

export default function HomePage() {

        return (
            <div>
                <HeroBanner 
                    mobileImage={'https://www.myoddballs.com/cdn/shop/files/Mobile-BG_ffb27b7c-8a29-4549-b417-4e1582b54f6b.webp?v=1738544683'} 
                    desktopImage={'https://www.myoddballs.com/cdn/shop/files/Desktop-BG_0161fa6c-3854-4e05-8a42-0e43f92c8b78.webp?v=1738544664'}
                    header="Welcome to FakeStore"
                />
                <ProductCategories />
            </div>
        )
}
