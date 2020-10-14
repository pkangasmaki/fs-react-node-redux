//Dummy test
const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

//Returns total value (number) of all {likes: } in blogs
const totalLikes = (blogs) => {

  const mostLikes = () => {
    if ( blogs.length === 0 ) {
      return 0
    }
    if ( blogs.length === 1 ) {
      return blogs[0].likes
    }

    const reducer = (highest, current, index) =>  {
      //if index equals 1, highest is still an object
      if (index === 1) {
        return current.likes + highest.likes
      }
      //otherwise, highest is a number so you can't use the .likes
      return current.likes + highest
    }

    return blogs.reduce(reducer)
  }

  const total = mostLikes(blogs)
  return total
}

//Returns object with the highest {likes: } value
const favouriteBlog = (blogs) => {

  const mostLikes = () => {
    if (blogs.length === 0 ) {
      return 0
    }

    const reducer = (highest, current) =>  {

      return current.likes > highest.likes
        ? current
        : highest
    }

    return blogs.reduce(reducer)
  }

  const favourite = mostLikes(blogs)
  return favourite
}

//Returns author with the most blogs (and the amount of blogs)
const mostBlogs = (blogs) => {
  let bloggers = []
  let ind = 0
  for ( ind; ind < blogs.length; ind++) {
    bloggers.push(blogs[ind].author)
  }

  let totalBlogs = 1
  let authorsBlogs = 0
  let author
  for (let i=0; i<bloggers.length; i++) {
    for (let j=i; j<bloggers.length; j++) {
      if (bloggers[i] === bloggers[j]) {
        authorsBlogs++
      }
      if (totalBlogs<authorsBlogs) {
        totalBlogs=authorsBlogs
        author = bloggers[i]
      }
    }
    authorsBlogs=0
  }

  console.log(totalBlogs)
  console.log(author)

  const mostBlogger = {
    author: author,
    blogs: totalBlogs
  }

  return mostBlogger
}

const mostLikes = (blogs) => {

  let bloggers = []
  let ind = 0
  for ( ind; ind < blogs.length; ind++) {
    bloggers.push({
      author: blogs[ind].author,
      likes: blogs[ind].likes
    })
  }

  let currentBlogLikes = 0
  let authorsTotalLikes = 0
  let highestLikes = 0
  let mostLikedAutor

  //Käydään bloggers[] kokonaan läpi
  for(let i = 0; i<bloggers.length;i++) {
    //Käydään jokaisen blogaajan kohdalla bloggers[] uudelleen läpi
    for(let j = 0; j<bloggers.length;j++) {
      //Jos blogaaja täsmää
      if (bloggers[j].author === bloggers[i].author) {
        //Otetaan ylös blogaajan liket
        currentBlogLikes = bloggers[j].likes
        authorsTotalLikes = authorsTotalLikes + currentBlogLikes
      }
      //Jos authorilla on enemmän likejä kuin highestLikes
      if (authorsTotalLikes > highestLikes) {
        //Tehdään authorin likeistä highest likes
        highestLikes = authorsTotalLikes
        //Tehdään authorista tykätyin author
        mostLikedAutor = bloggers[i].author
      }
      currentBlogLikes = 0
    }
    authorsTotalLikes = 0
  }

  const authorWithMostLikes = {
    author: mostLikedAutor,
    likes: highestLikes
  }

  return authorWithMostLikes
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}