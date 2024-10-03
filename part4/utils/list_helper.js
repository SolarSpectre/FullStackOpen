const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blog) => {
  return blog[0].likes;
};
const favoriteBlog = (blogs) => {
  let maxLikes = {};
  let max = 0;
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    if (blog.likes > max) {
      max = blog.likes;
      maxLikes = blog;
    }
  }
  return {
    title: maxLikes.title,
    author: maxLikes.author,
    likes: maxLikes.likes,
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
