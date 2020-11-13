
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    const user = {
      username: 'test',
      name: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('log in to app')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('incorrect')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created', function() {

      cy.get('#add-note').click()

      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')

      cy.get('#create').click()

      cy.contains('Test title by Test author')
    })

    it('A blog can be liked', function() {
      //Create mock-blog

      cy.createBlog({
        title: 'First blog',
        author: 'First author',
        url: 'First url',
        likes: 10
      })

      cy.createBlog({
        title: 'Second blog',
        author: 'Second author',
        url: 'Second url',
        likes: 10
      })

      cy.contains('Second blog')
        .contains('view')
        .click()

      cy.contains('like')
        .click()

      //Check if the blog with 10 likes has now 11
      cy.contains('likes: 11')
    })

    it('A blog can be removed by creator', function () {
      cy.createBlog({
        title: 'Third blog',
        author: 'Third author',
        url: 'Third url',
        likes: 10
      })

      cy.contains('Third blog')
        .contains('view')
        .click()

      cy.contains('remove')
        .click()

      cy.contains('Blog "Third blog" removed successfully')
    })

    it('Blogs are in order of likes', function () {
      cy.createBlog({
        title: 'First blog',
        author: 'First author',
        url: 'First url',
        likes: 1
      })

      cy.createBlog({
        title: 'Second blog',
        author: 'Second author',
        url: 'Second url',
        likes: 10
      })

      cy.createBlog({
        title: 'Third blog',
        author: 'Third author',
        url: 'Third url',
        likes: 3
      })

      //Check if the blogs are in a correct order (in terms of likes)
      //Should be 10 -> 3 -> 1

      //The top blog in the bloglist should be the one with 10 likes
      //aka: Second blog
      cy.get('ul>li').eq(0).contains('view').click()
      cy.get('ul>li').eq(0).contains('likes: 10')

      //The middle blog in the bloglist should be the one with 3 likes
      //aka: Third blog
      cy.get('ul>li').eq(1).contains('view').click()
      cy.get('ul>li').eq(1).contains('likes: 3')

      //The bottom blog in the bloglist should be the one with 1 likes
      //aka: First blog
      cy.get('ul>li').eq(2).contains('view').click()
      cy.get('ul>li').eq(2).contains('likes: 1')
    })
  })
})