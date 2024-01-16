import React from 'react'
import { NavLink } from 'react-router-dom';

const BlogDetails = ({post}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <NavLink to={`/blog/${post.id}`}>
            <span className='font-bold text-lg flex-wrap flex-col justify-center items-center'>{post.title}</span>
        </NavLink>
        <p className='text-[18px] mt-[4px]'>
            By <span className='italic'>{post.author}</span> on {" "}
            <NavLink to={`/categories/${post.category.replaceAll(" ", "-")}`}>
                <span className='underline font-bold'>{post.category}</span>
            </NavLink>
        </p>
        <p className='text-[15px] mt-[4px]'>Posted on {post.date}</p>
        <p className='text-[17px] mt-[14px] text-center mx-auto w-11/12 max-w-[670px] mb-[20px]'>{post.content}</p>
        <div className='flex gap-x-3 flex-wrap flex-col'>
            {
                post.tags.map((tag, index) => (
                    <NavLink key={index} to={`/tags/${tag.replaceAll(" ", "-")}`}>
                        <span className='text-blue-600 font-bold underline text-[13px] mt-[5px] cursor-pointer'>{`#${tag}`}</span>
                    </NavLink>
                ))
            }
        </div>
    </div>
  )
}

export default BlogDetails;

