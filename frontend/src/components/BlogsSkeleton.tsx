import React from 'react'

const BlogsSkeleton = () => {
  return (
    
<div role="status" className="animate-pulse">
    
<div className='p-4 border-b border-slate-400 pb-4 max-w-screen-lg cursor-pointer'>
        <div className='flex'>
            <div className="h-4 w-4 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
           
            <div className='flex justify-center flex-col pl-2'>
                <circle/>
            </div>
            <div className='pl-2 font-thin text-slate-500 flex justify-center flex-col'>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>
        </div>
        <div className='text-xl font-semibold pt-2'>
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className='text-md font-thin'>
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className='text-slate-500 text-sm font-thin pt-4'> 
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
    </div>
    
  
    <span className="sr-only">Loading...</span>
</div>


  )
}

export default BlogsSkeleton