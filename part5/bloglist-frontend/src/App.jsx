import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    setBlogs([]);
  };
  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
        likes: likes,
      };
      await blogService.create(newBlog);
      setSuccessMessage(`A new blog: ${title}, by ${author} has been created`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
      setLikes(0);
    } catch (error) {
      setErrorMessage("Error creating new blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      setErrorMessage("Error fetching blogs");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.username} is logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>Create a new blog</h2>
          {successMessage && (
            <div style={{ color: "green" }}>{successMessage}</div>
          )}
          <form onSubmit={handleCreate}>
            <div>
              title:
              <input
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <div>
              likes:
              <input
                value={likes}
                name="likes"
                onChange={({ target }) => setLikes(target.value)}
              />
            </div>

            <button type="submit">Create</button>
          </form>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
