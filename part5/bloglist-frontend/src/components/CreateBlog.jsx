const BlogForm = ({
  successMessage,
  handleCreate,
  title,
  author,
  url,
  likes,
  setTitle,
  setAuthor,
  setUrl,
  setLikes,
}) => {
  return (
    <>
      <h2>Create a new blog</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes:
          <input
            value={likes}
            name='likes'
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>

        <button type='submit'>Create</button>
      </form>
    </>
  )
}
export default BlogForm
