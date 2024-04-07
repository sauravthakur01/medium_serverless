
import Appbar from './Appbar'
import { Blog } from '../hooks/index'
import { Avatar } from './BlogCard'

const CompleteBlog = ({ blog }: {blog : Blog }) => {
  return (
    <div>
        <Appbar/>
        <div className='flex justify-center'>
            <div className='grid grid-cols-12 px-10 max-w-screen-2xl pt-12'>
                <div className='col-span-8'>
                    <div className='text-5xl font-extrabold'>
                        {blog.title}
                    </div>
                    <div className='text-slate-500 pt-4'>
                        Posted on 2nd April 2024
                    </div>
                    <div className='pt-4'>
                        {blog.content}
                    </div>
                </div>
                <div className='col-span-4'>
                    <div className='text-slate-500 text-lg'>

                    Author
                    </div>
                    <div className='flex w-full'>
                        <div className='pr-4 felx flex-col justify-center'>
                            <Avatar name= {blog.author.name}/>
                        </div>
                        <div>
                            <div className='text-4xl font-bold'>
                                {blog.author.name} || "anonymous"
                            </div>
                            <div className='pt-2 text-slate-500'>
                                Random phrase about the author
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompleteBlog