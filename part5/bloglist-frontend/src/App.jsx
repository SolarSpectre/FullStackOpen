import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setBlogs([])
  }
  const handleCreate = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(newBlog)
      setSuccessMessage(`A new blog: ${newBlog.title}, by ${newBlog.author} has been created`)
      setTimeout(() => setSuccessMessage(null), 5000)
      fetchBlogs()
    } catch (error) {
      setErrorMessage('Error creating new blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
    } catch (error) {
      setErrorMessage('Error updating blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  const handleUpdate = async (updatedBlog) => {
    try {
      const updatedBlogFromServer = await blogService.update(updatedBlog.id, updatedBlog)
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlogFromServer : b)))
      setSuccessMessage(`Blog "${updatedBlog.title}" updated successfully`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error) {
      setErrorMessage('Error updating blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remote blog ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(blog.id)
        fetchBlogs()
      }
    } catch (error) {
      setErrorMessage(`Error deleting blog: ${error}`)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      setErrorMessage('Error fetching blogs')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    if (user) {
      fetchBlogs()
    }
  }, [user])
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          errorMessage={errorMessage}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.username} is logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm handleCreate={handleCreate} />
          </Togglable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <div style={blogStyle} key={blog.id}>
                <Blog blog={blog} handleLike={handleLike} handleUpdate={handleUpdate} handleDelete={handleDelete} />
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default App
