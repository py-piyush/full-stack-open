const listHelper = require("../utils/list_heper.js");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns 1", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is 0", () => {
    const blogs = [];
    expect(listHelper.totalLikes(blogs)).toBe(0);
  });
  test("when list has only one blog equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });
  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe("favorite blog", () => {
  test("of empty list is empty object", () => {
    const blogs = [];
    expect(listHelper.favoriteBlog(blogs)).toEqual({});
  });

  test("when list has only one blog equals that blog", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    });
  });
  test("of a bigger list is find correctly", () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("author with most blogs", () => {
  test("of empty blogs should return empty object", () => {
    const blogs = [];
    expect(listHelper.mostBlogs(blogs)).toEqual({});
  });
  test("when list has one blog should return name of author and 1", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });
  test("of a bigger list with same most blogs return correct result", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ];
    const result = listHelper.mostBlogs(blogs);
    expect(result.blogs).toBe(1);
    expect(["Edsger W. Dijkstra", "Michael Chan"]).toContain(result.author);
  });
  test("of a bigger list with many entries return correct results", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("author with most likes", () => {
  test("of empty blogs should return empty object", () => {
    const blogs = [];
    expect(listHelper.mostLikes(blogs)).toEqual({});
  });
  test("when list has one blog should return name of author and likes", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });
  test("of a bigger list with same most likes return correct result", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    expect(result.likes).toBe(5);
    expect(["Edsger W. Dijkstra", "Michael Chan"]).toContain(result.author);
  });
  test("of a bigger list with many entries return correct results", () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
