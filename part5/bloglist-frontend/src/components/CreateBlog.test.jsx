import { render, screen } from '@testing-library/react'
import BlogForm from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const handleCreate = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm handleCreate={handleCreate} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const likesInput = container.querySelector('#likes-input')
  const createButton = screen.getByText('Create')

  await user.type(titleInput, 'Test Blog Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://testurl.com')
  await user.type(likesInput, '5')
  await user.click(createButton)
  expect(handleCreate).toHaveBeenCalledTimes(1)
  expect(handleCreate.mock.calls[0][0]).toEqual({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
  })
})
