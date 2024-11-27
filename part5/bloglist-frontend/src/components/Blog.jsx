import Togglable from './Togglable.jsx'

import { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleLike, handleDelete }) => {
  const [editing, setEditing] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(blog.title)
  const [updatedAuthor, setUpdatedAuthor] = useState(blog.author)
  const [updatedUrl, setUpdatedUrl] = useState(blog.url)

  const toggleEditing = () => setEditing(!editing)

  const saveChanges = () => {
    handleUpdate({
      ...blog,
      title: updatedTitle,
      author: updatedAuthor,
      url: updatedUrl,
    })
    toggleEditing()
  }

  return (
    <div className='blog'>
      {editing ? (
        <div>
          <div>
            <label>Title: </label>
            <input
              type='text'
              value={updatedTitle}
              onChange={({ target }) => setUpdatedTitle(target.value)}
            />
          </div>
          <div>
            <label>Author: </label>
            <input
              type='text'
              value={updatedAuthor}
              onChange={({ target }) => setUpdatedAuthor(target.value)}
            />
          </div>
          <div>
            <label>URL: </label>
            <input
              type='text'
              value={updatedUrl}
              onChange={({ target }) => setUpdatedUrl(target.value)}
            />
          </div>
          <button onClick={saveChanges}>Save</button>
          <button onClick={toggleEditing}>Cancel</button>
        </div>
      ) : (
        <div>
          <p className='blog-title'>{blog.title}</p><p> by {blog.author}</p>
          <Togglable buttonLabel='view details'>
            <p>URL: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
            <button onClick={() => handleLike(blog)}>like</button>
            <button onClick={() => handleDelete(blog)}>remove</button>
          </Togglable>
          <button onClick={toggleEditing}>edit</button>
        </div>
      )}
    </div>
  )
}

export default Blog
