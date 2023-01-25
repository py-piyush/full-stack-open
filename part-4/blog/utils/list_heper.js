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
  let mx = 0;
  const ans = { author: "", blogs: 0 };
  for (let key in obj) {
    if (obj[key] > mx) {
      mx = obj[key];
      ans.author = key;
      ans.blogs = obj[key];
    }
  }
  return ans;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  const authorBlogsMapper = {};
  blogs.forEach((blog) => {
    if (blog.author in authorBlogsMapper) authorBlogsMapper[blog.author] += 1;
    else authorBlogsMapper[blog.author] = 1;
  });
  return maxKeyValue(authorBlogsMapper);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
