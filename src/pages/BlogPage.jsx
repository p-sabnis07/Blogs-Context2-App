import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
// import { baseUrl } from './../baseUrl';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {
  const newBaseUrl = 'https://codehelp-apis.vercel.app/api/';
  const [blog, setBLog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const loaction = useLocation();
  const navigation = useNavigate();
  const {loading, setLoading} = useContext(AppContext);

  const blogId = loaction.pathname.split('/').at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    console.log("Url is:");
    console.log(url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setBLog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    } catch(error) {
      console.log("An Error Occured");
      setBLog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(blogId) {
      fetchRelatedBlogs();
    }
  }, [loaction.pathname])

  return (
    <div>
      <Header />
      <div className='mt-[80px] flex flex-col items-center justify-center mb-2'>
        <button className='border rounded-md px-4 py-1 bg-slate-300 font-bold hover:border-red-400 hover:bg-transparent' onClick={() => navigation(-1)}>Back</button>
      </div>
      {
        loading ? (
          <div className='flex flex-col items-center justify-center mt-[200px]'>
            <p className='font-bold text-2xl'>Loading</p>
          </div>
        ) :
        blog ? (
          <div className='flex flex-col justify-center items-center mb-[10px] gap-y-7'>
            <BlogDetails post={blog} />
            <h2 className='font-bold text-4xl mt-4 mb-8 mx-auto flex flex-col items-center justify-center underline'>Related Blogs</h2>
            {
              relatedBlogs.map((post) => (
                <div key={post.id}>
                  <BlogDetails post={post} />
                </div>
              ))
            }
          </div>
        ) :
        (
          <div>
            <p>No Blogs Found</p>
          </div>
        )
      }
    </div>
  )
}

export default BlogPage;