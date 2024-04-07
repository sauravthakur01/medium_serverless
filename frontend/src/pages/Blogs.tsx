import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import BlogsSkeleton from "../components/BlogsSkeleton"
import { useBlogs } from "../hooks"

const Blogs = () => {

  const {loading, blogs} = useBlogs()

  if(loading){
    return <div>
      <Appbar/>
      <div> 
        <BlogsSkeleton/>
        <BlogsSkeleton/>
        <BlogsSkeleton/>
      </div>

    </div>
  }

  return (<div>
    <Appbar />
    <div className="flex justify-center">
        <div className=''>
          {blogs.map((b) => (
            <BlogCard 
            id={b.id}
            key={b.id}
            authorName={b.author.name || "Anonymous"}
            title={b.title}
            content={b.content}
            publishedDate="2nd May 2024"
        />
          ))}
            

        </div>
    </div>
  </div>
  )
}

export default Blogs