/* eslint-disable linebreak-style */
//Linebreak has problems in this file so it had to be disabled
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username: username, password: password
  }).then(response => {
    localStorage.setItem('loggedInUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})
,
Cypress.Commands.add('createBlog', ( { title, author, url, likes }) => {
  const user = window.localStorage.getItem('loggedInUser')
  const userToken = JSON.parse(user).token
  const bearerToken = `bearer ${userToken}`

  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    headers: { Authorization: bearerToken },
    body: { title: title, author: author, url: url, likes: likes }
  })

  cy.visit('http://localhost:3000')
})