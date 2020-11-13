import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders blogs correctly, hides info by default', () => {
    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'Url',
      user: '5f7186f8ad378e29b8a324cb',
      likes: 10
    }

    const component = render(
      <Blog blog={blog}  />
    )

    //Visible container with title and author
    const blogHeader = component.container.querySelector('.blogHeader')
    const infoBox = component.container.querySelector('.infoBox')

    //console.log(prettyDOM(infoBox))

    //Title is in the visible blogHeader container
    expect(blogHeader).toHaveTextContent('Title')
    expect(blogHeader).toHaveTextContent('Author')

    //Url and likes should not be in the blogHeader container
    expect(blogHeader).not.toHaveTextContent('Url')
    expect(blogHeader).not.toHaveTextContent('Likes')

    //infoBox contais url and likes, should be 'display:none'
    expect(infoBox).toHaveStyle('display: none')
  })

  test('clicking the "view"-button opens the info of the blog', async () => {
    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'Url',
      user: '5f7186f8ad378e29b8a324cb',
      likes: 10
    }

    const component = render(
      <Blog blog={blog} />
    )

    //Infobox should have display: none at beginning
    const infoBox = component.container.querySelector('.infoBox')
    expect(infoBox).toHaveStyle('display: none')

    //Click the 'view' button
    const button = component.getByText('view')
    fireEvent.click(button)

    //Infobox should be visible now
    expect(infoBox).not.toHaveStyle('display: none')
  })

  test('clicking "like"-button two times calls eventHandler twice', async () => {

    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'Url',
      user: '5f7186f8ad378e29b8a324cb',
      likes: 10
    }

    const mockHandler = jest.fn()

    //Add mock-function to blog for handling likes
    const component = render(
      <Blog blog={blog} handleLike={mockHandler} />
    )

    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    //Expect the eventhandler to have been clicked twice
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})