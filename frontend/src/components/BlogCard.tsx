import React from 'react';

type BlogProps = {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  source: { id: string | null; name: string };
  publishedAt: string;
};

const BlogCard: React.FC<BlogProps> = ({
  title,
  description,
  url,
  urlToImage,
  source,
  publishedAt,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 max-w-md w-full relative" style={{ backgroundColor: '#FFFFF0', paddingBottom: '4rem' }}>
      {/* Image */}
      <img
        src={urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      {/* Title */}
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* Description */}
      <p className="text-sm text-gray-700 mt-1 mb-2">{description}</p>

      {/* Source and Date */}
      <p className="text-xs text-gray-500">
        Source: {source.name || 'Unknown'} | {new Date(publishedAt).toLocaleDateString()}
      </p>

      {/* Read More Link */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 left-4 hover:bg-[#b85d04] text-white px-4 py-2 rounded-md mt-3 inline-block text-center  transition bg-[#D97706]"
      >
        Read More
      </a>
    </div>
  );
};

export default BlogCard;
