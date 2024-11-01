const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");
let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
  const response = await api
    .post("/api/login")
    .send({ username: "root", password: "salainen" });
  token = `Bearer ${response.body.token}`;
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", token)
    .expect(200)
    .expect("content-type", /application\/json/);
});
test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs").set("Authorization", token);
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});
test("id property exists", async () => {
  const response = await api.get("/api/blogs").set("Authorization", token);
  response.body.forEach((blog) => {
    assert.strictEqual(typeof blog.id, "string");
  });
});
test("delete a blog correctly", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", token)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  const ids = blogsAtEnd.map((r) => r.id);
  assert(!ids.includes(blogToDelete.id));
});
test("update a blog correctly", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[1];

  const updatedBlogData = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: 200,
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set("Authorization", token)
    .send(updatedBlogData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, updatedBlogData.likes);

  const blogsAtEnd = await helper.blogsInDb();
  const blogAfterUpdate = blogsAtEnd.find((b) => b.id === blogToUpdate.id);
  assert.strictEqual(blogAfterUpdate.likes, updatedBlogData.likes);
});
test("Doesn't create invalid users", async () => {
  const body = {
    username: "joseph",
    name: "qwerty",
    password: "12",
  };
  const response = await api
    .post(`/api/users/`)
    .set("Authorization", token)
    .send(body)
    .expect(400)
    .expect("Content-Type", /application\/json/);
  assert(response.body.error);
});
after(async () => {
  await mongoose.connection.close();
});
