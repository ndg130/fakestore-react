import React from 'react'
import Sidebar from '../components/Admin/Sidebar'

export default function Dashboard() {
    return (
        <div className='relative flex h-full min-h-screen'>
            <Sidebar />
            <div className='flex-1 max-w-2xl sm:max-w-5xl lg:max-w-7xl mx-auto py-10 px-4'>
                <h1 className='text-3xl font-semibold text-theme-900'>Dashboard</h1>
            </div>        
        
        </div>

    )
}
