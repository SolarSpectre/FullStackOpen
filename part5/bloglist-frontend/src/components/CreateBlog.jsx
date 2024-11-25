import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const onSubmit = (event) => {
    event.preventDefault()
    handleCreate({ title, author, url, likes })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>
        <div>
          author:
          <input
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </div>
        <div>
          url:
          <input
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </div>
        <div>
          likes:
          <input
            type="number"
            value={likes}
            name="likes"
            onChange={({ target }) => setLikes(Number(target.value))}
            id="likes-input"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default BlogForm
