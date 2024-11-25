import Togglable from './Togglable.jsx'
const Blog = ({ blog , handleUpdate, handleDelete }) => {
  return (
    <div className='blog'>
      <p id='blog-title'>
        {blog.title} by {blog.author}
      </p>
      <Togglable buttonLabel="view details">
        <div className="blog-details">
          <p className="blog-url">URL: {blog.url}</p>
          <p className="blog-likes">Likes: {blog.likes}</p>
          <button onClick={() => handleUpdate(blog)}>like</button>
          <button onClick={() => handleDelete(blog)}>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
