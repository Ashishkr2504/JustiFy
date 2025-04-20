import React from 'react';
import { useBlogs } from '../hooks/useBlogs';
import BlogCard from '../components/BlogCard';

const Blog = () => {
  const { blogs, loading } = useBlogs();

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#D6BFAA] via-[#FFFAF0] to-[#A7F3D0] pt-25"> {/* Ivory white */}

<div className="text-center mb-10">
        <h1 className="text-5xl tracking-wide mb-4 font-extrabold text-[#2E2E2E]" style={{ fontFamily: '"Playfair Display", serif' }}>
        Latest Blog Posts
        </h1>
        {/* <h2 className="text-2xl font-semibold text-[#14532D] mt-2">Latest Blog Posts</h2> */}
        <p className="text-xl italic text-[#14532D] mb-6 ">What's New in Law</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-t-4 border-t-[#B1948F] border-[#FFFAF0] rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-[#B1948F]">Fetching the latest blogs...</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {blogs.map((blog: any, index: number) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
