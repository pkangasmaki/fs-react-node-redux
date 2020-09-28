const listHelper = require('../utils/list_helper')

const mockBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Kasinon salat',
    author: 'Ismo Laitela',
    url: 'toimimaton-linkki-ei-se-zelda',
    likes: 3,
    __v: 0
  },
  {
    _id: '2aashfuas83835yhrshfshfu8',
    title: 'Bulkkauksen taide',
    author: 'Matti-juhani',
    url: 'linkki-joka-voisi-viedä',
    likes: 10,
    __v: 0
  },
  {
    _id: 'safdsdfi3483udfjsdf8385853',
    title: 'Talonmiehen opas',
    author: 'Seppo Taalasmaa',
    url: 'linkki-joka-ei-vie',
    likes: 11,
    __v: 0
  },
  {
    _id: '3wersdfsdfdsfdsfsfeefwfsef',
    title: 'Muista penkkipunnertaa',
    author: 'Matti-juhani',
    url: 'linkki-joka-voisi-viedä',
    likes: 2,
    __v: 0
  },
  {
    _id: 'setsetsdfsdfsfsfesefsefssef',
    title: 'Taitoluistelu',
    author: 'Matti-juhani',
    url: 'linkki-joka-voisi-viedä',
    likes: 1,
    __v: 0
  },
  {
    _id: 'safdsdfi3483udfjsdf8385853',
    title: 'Kuntosalin kanta-asiakkuus',
    author: 'Ossi Puolakka',
    url: 'jaahas',
    likes: 4,
    __v: 0
  },
  {
    _id: '435eertfdgdgdgdgffdgdrdgdrg',
    title: 'Harjankäsittely',
    author: 'Seppo Taalasmaa',
    url: 'linkki-joka-ei-vie',
    likes: 9,
    __v: 0
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(mockBlogs)
    expect(result).toBe(40)
  })
})

describe('favourite blog', () => {

  test('favourite blog', () => {
    const result = listHelper.favouriteBlog(mockBlogs)
    const favourite = {
      _id: 'safdsdfi3483udfjsdf8385853',
      title: 'Talonmiehen opas',
      author: 'Seppo Taalasmaa',
      url: 'linkki-joka-ei-vie',
      likes: 11,
      __v: 0
    }
    expect(result).toEqual(favourite)
  })
})

describe('author with most blogs', () => {

  test('which author has most blogs', () => {
    const result = listHelper.mostBlogs(mockBlogs)
    const expectedBlogger = {
      author: 'Matti-juhani',
      blogs: 3
    }
    expect(result).toEqual(expectedBlogger)
  })
})

describe('author with most likes on blogs', () => {

  test('which author has most likes', () => {
    const result = listHelper.mostLikes(mockBlogs)
    const expectedBlogger = {
      author: 'Seppo Taalasmaa',
      likes: 20
    }
    expect(result).toEqual(expectedBlogger)
  })
})