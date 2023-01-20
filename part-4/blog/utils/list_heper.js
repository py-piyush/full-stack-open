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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
