const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'root',
        username: 'root',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('textbox').first().fill('root')
    await page.getByRole('textbox').last().fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('root is logged in')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('root is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('root')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })
  describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await page.getByRole('textbox').first().fill('root')
    await page.getByRole('textbox').last().fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('root is logged in')).toBeVisible()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'New Blog' }).click()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('test title')
    await textboxes[1].fill('myself')
    await textboxes[2].fill('test.com')
    await page.getByRole('button', { name: 'Create' }).click()
    await expect(page.getByText('test title')).toBeVisible()
  })
    test('a blog can be edited', async ({ page }) => {
  await page.getByRole('button', { name: 'New Blog' }).click();
  const textboxes = await page.getByRole('textbox').all();
  await textboxes[0].fill('initial title');
  await textboxes[1].fill('initial author');
  await textboxes[2].fill('initial-url.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByText('initial title')).toBeVisible();

  await page.getByRole('button', { name: 'view details' }).click();

  await expect(page.getByText('URL: initial-url.com')).toBeVisible();
  await expect(page.getByText('Likes: 0')).toBeVisible();

  await page.getByRole('button', { name: 'edit' }).click();

  const editTextboxes = await page.getByRole('textbox').all();
  await editTextboxes[0].fill('updated title');
  await editTextboxes[1].fill('updated author');
  await editTextboxes[2].fill('updated-url.com');

  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByRole('button', { name: 'view details' }).click();
  await expect(page.getByText('updated title')).toBeVisible();
  await expect(page.getByText('URL: updated-url.com')).toBeVisible();
});
test('the user who created a blog can delete it', async ({ page }) => {
    await page.getByRole('button', { name: 'New Blog' }).click();
    const textboxes = await page.getByRole('textbox').all();
    await textboxes[0].fill('Test Blog Title');
    await textboxes[1].fill('Test Author');
    await textboxes[2].fill('http://testblog.com');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByText('Test Blog Title')).toBeVisible();

    await page.getByRole('button', { name: 'view details' }).click();
    await page.getByRole('button', { name: 'remove' }).click();
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Remote blog Test Blog Title by Test Author');
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'remove' }).click();
    await expect(page.getByText('Test Blog Title')).not.toBeVisible();
  });
    test('blogs are ordered by likes', async ({ page }) => {
    const blogs = [
      { title: 'Blog A', author: 'Author A', url: 'http://blogA.com', likes: 5 },
      { title: 'Blog B', author: 'Author B', url: 'http://blogB.com', likes: 10 },
      { title: 'Blog C', author: 'Author C', url: 'http://blogC.com', likes: 3 },
    ];

    for (const blog of blogs) {
      await page.getByRole('button', { name: 'New Blog' }).click();
      const textboxes = await page.getByRole('textbox').all();
      await textboxes[0].fill(blog.title);
      await textboxes[1].fill(blog.author);
      await textboxes[2].fill(blog.url);
      const likesInput = await page.locator('#likes-input');
      await likesInput.fill(blog.likes.toString());
      await page.getByRole('button', { name: 'Create' }).click();
      await expect(page.getByText(blog.title)).toBeVisible();
    }

    const blogElements = await page.locator('.blog .blog-title').allInnerTexts();

    const expectedOrder = blogs.sort((a, b) => b.likes - a.likes).map((b) => b.title);
    expect(blogElements).toEqual(expectedOrder);
  });
  })
})
