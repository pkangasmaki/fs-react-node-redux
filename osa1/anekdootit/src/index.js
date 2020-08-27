import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayTop = (props) => {

  //Find the highest voted index
  let copy = [...props.points]
  let highCopy = Math.max(...copy)

  const isLargeNumber = (element) => element === highCopy;
  const highestVoted = copy.findIndex(isLargeNumber);
  return (
  <p>{props.anecdotes[highestVoted]}</p>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([...points])

  if (selected > anecdotes.length-1) {
    setSelected(0)
  }

  const voting = () => {

    points[selected] += 1 
    let copy = [...points] 
    setVotes([...copy])
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes </p>
      <button onClick={() => voting()}>Vote</button>
      <button onClick={()=>setSelected(selected+1)}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <DisplayTop anecdotes={anecdotes} points={points}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
