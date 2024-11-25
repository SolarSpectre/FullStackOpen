import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing Blog Component',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 42,
  }

  const handleUpdate = vi.fn()
  const handleDelete = vi.fn()
  test('renders title and author by default, but not URL or likes', () => {
    render(<Blog blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} />)

    const titleElement = screen.getByText('Testing Blog Component by Test Author',{ exact:false })
    expect(titleElement).toBeInTheDocument()

    const urlElement = screen.queryByText('URL:')
    const likesElement = screen.queryByText('Likes:')
    expect(urlElement).not.toBeInTheDocument()
    expect(likesElement).not.toBeInTheDocument()
  })

  test('shows URL and likes when the view details button is clicked', async () => {
    const user = userEvent.setup()
    render(<Blog blog={blog} />)

    const button = screen.getByText('view details')
    await user.click(button)

    const urlElement = screen.getByText(/URL: http:\/\/testblog.com/)
    const likesElement = screen.getByText(/Likes: 42/)
    expect(urlElement).toBeInTheDocument()
    expect(likesElement).toBeInTheDocument()
  })
  test('calls twice the handler when clicking 2 times', async () => {
    render(<Blog blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} />)
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)
    expect(handleUpdate).toHaveBeenCalledTimes(2)
  })
})
