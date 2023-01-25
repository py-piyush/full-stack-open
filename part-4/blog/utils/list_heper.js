const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((total, item) => total + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  return blogs.reduce(
    (max, item) => (max.likes >= item.likes ? max : item),
    blogs[0]
  );
};

const maxKeyValue = (obj) => {
  let mx_val = 0;
  let mx_key = "";
  for (let key in obj) {
    if (obj[key] > mx_val) {
      mx_val = obj[key];
      mx_key = key;
    }
  }
  return { mx_key, mx_val };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  const authorBlogsMapper = {};
  blogs.forEach((blog) => {
    if (blog.author in authorBlogsMapper) authorBlogsMapper[blog.author] += 1;
    else authorBlogsMapper[blog.author] = 1;
  });
  const { mx_key, mx_val } = maxKeyValue(authorBlogsMapper);
  return { author: mx_key, blogs: mx_val };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  const authorLikesMapper = {};
  blogs.forEach((blog) => {
    if (blog.author in authorLikesMapper)
      authorLikesMapper[blog.author] += blog.likes;
    else authorLikesMapper[blog.author] = blog.likes;
  });
  const { mx_key, mx_val } = maxKeyValue(authorLikesMapper);
  return { author: mx_key, likes: mx_val };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
