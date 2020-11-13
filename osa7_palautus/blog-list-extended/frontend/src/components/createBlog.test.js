import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './createBlog'
//import { prettyDOM } from '@testing-library/dom'

describe('<CreateBlog />', () => {
  test('adding a new blogs calls the callback function with correct params', async () => {

    const addBlog = jest.fn()

    const component = render(
      <CreateBlog handleCreateBlog={addBlog}/>
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    //Change the form values
    fireEvent.change(title, {
      target: { value: 'This is title' }
    })

    fireEvent.change(author, {
      target: { value: 'This is author' }
    })

    fireEvent.change(url, {
      target: { value: 'This is url' }
    })

    //Submit form
    fireEvent.submit(form)

    //Form gets submitted once
    expect(addBlog.mock.calls).toHaveLength(1)

    //Form has correct values
    expect(addBlog.mock.calls[0][0]).toBe('This is title')
    expect(addBlog.mock.calls[0][1]).toBe('This is author')
    expect(addBlog.mock.calls[0][2]).toBe('This is url')
  })
})