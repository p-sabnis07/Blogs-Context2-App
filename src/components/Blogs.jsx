import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import BlogDetails from './BlogDetails';

const Blogs = () => {
    // step 3 --> Consume
    // consume karnyasathi aplyakade useContext() navacha hook ahe te use kartat.
    const { loading, posts } = useContext(AppContext);
  return (
    <div className='py-8 flex flex-col gap-y-7 mt-[66px] mb-[70px] justify-center items-center'>
        {
            loading ? (
                <div className='min-h-[80vh] w-full flex justify-center items-center'>
                    <p className='text-center flex flex-col ml-[75px] font-bold text-2xl'>Loading</p>
                </div>
            ) : posts.length === 0 ? (
                <div className='min-h-[80vh] w-full flex justify-center items-center flex-col mt-[200px]'>
                    <p className='text-center flex flex-col ml-[750px] font-bold text-2xl'>No Blogs Found</p>
                </div>
            ) : posts.map((post) => (
                    <BlogDetails key={post.id} post={post} />
                ) )
        }
    </div>
  )
}

export default Blogs;