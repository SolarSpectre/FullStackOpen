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
const mostBlogs = (blogs) => {
  let authorCounts = [];

  for (let i = 0; i < blogs.length; i++) {
    const authorIndex = authorCounts.findIndex(
      (item) => item.author === blogs[i].author,
    );

    if (authorIndex !== -1) {
      authorCounts[authorIndex].blogs += 1;
    } else {
      authorCounts.push({ author: blogs[i].author, blogs: 1 });
    }
  }

  return authorCounts.reduce(
    (max, current) => {
      return current.blogs > max.blogs ? current : max;
    },
    { author: "", blogs: 0 },
  );
};
const mostLikes = (blogs) => {
  const likesByAuthor = {};

  blogs.forEach((blog) => {
    if (!likesByAuthor[blog.author]) {
      likesByAuthor[blog.author] = blog.likes;
    } else {
      likesByAuthor[blog.author] += blog.likes;
    }
  });

  let mostLikedAuthor = null;
  let maxLikes = 0;

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      maxLikes = likesByAuthor[author];
      mostLikedAuthor = author;
    }
  }

  return {
    author: mostLikedAuthor,
    likes: maxLikes,
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
