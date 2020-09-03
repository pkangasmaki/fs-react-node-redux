import React from 'react'

const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h2>
          {props.course}
        </h2>
      </div>
    )
  } 
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part,i) =>
          <Part key={parts[i].id} part={parts[i]}/>
          )}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p> 
          {props.part.name} {props.part.exercises} 
        </p>
      </div>
    )
  }
  
  const Total = ({parts}) => {
  
    let numbersArray = []
    parts.map(part =>
      numbersArray.push(part.exercises)
      )
  
    let initialValue = 0
    const reducer = (accumulator, item) => {
        return accumulator + item;
      };
  
    const total = numbersArray.reduce(reducer, initialValue)
  
    return (
      <div>
        <p>
          <b>
            Number of exercises {total}
          </b>
        </p>
      </div>
    )
  }

  export default Course