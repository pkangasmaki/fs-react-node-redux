import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//Painikkeille komponetti
const Button = (props) => {
  return (
    <button onClick={props.handler}>
      {props.text}
    </button>
  )
}

//Ilmoita jos palautetta ei annettu
const NoFeedback = (props) => {
  if(!props.all) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return (
    <div></div>
  )
}

//Renderöi tilastot
const StatisticLine = (props) => {
  //tekstit tilaston taulukoille
  let text = ["good", "neutral", "bad", "all", "average", "positive"]

  let valmis = []
  let i = 0
  //Luodaan taulukko tilastoista
  for (i;i<6;i++) {
    //poikkeustilanne keskiarvon laskemiseen, average/all
    if(i===4) {
      valmis.push(<tr><td> {text[i]} </td><td> {props.taulukko[4]/props.taulukko[3]} </td></tr>)
    }
    //poikkeustilanne postiivisten arvojen laskemiseen, positive/all
    else if(i===5) {
      valmis.push(<tr><td> {text[i]} </td><td> {props.taulukko[5]/props.taulukko[3]*100}% </td></tr>)
    }
    else {
      valmis.push(<tr><td> {text[i]} </td><td> {props.taulukko[i]} </td></tr>)
    }
  }


  //Renderöi tyhjää jos tilastoilla ei arvoja
  if(!props.all) {
    return (
      <div></div>
    )
  }

  //renderöi tilastot
  return (
    <table>
      <thead>
      {valmis[0]}
      {valmis[1]}
      {valmis[2]}
      {valmis[3]}
      {valmis[4]}
      {valmis[5]}
      </thead>
    </table>
  )
}

const Statistics = (props) => {
  let total=props.good+props.neutral+props.bad
  return(
    <div>
        <StatisticLine taulukko={props.taulukko} all={total}/>
     </div>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] =useState(0)
  const [average,setAverage] =useState(0)
  const [positive,setPositive] =useState(0)

  let taulukko = [good, neutral, bad, all, average, positive]

  const handleGood = () => {
    setGood(good+1)
    setAll(all+1)
    setAverage(average+1)
    setPositive(positive+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const handleBad = () => {
    setBad(bad+1)
    setAll(all+1)
    setAverage(average-1)
  }


  return (
    <>
      <h1>give feedback</h1>
      <Button handler={handleGood} text="good"/>
      <Button handler={handleNeutral} text="neutral"/>
      <Button handler={handleBad}text="bad"/>
      <h1>statistics</h1>
      <NoFeedback all={all}/>
      <Statistics taulukko={taulukko} good={good} neutral={neutral} bad={bad} average={average} positive={positive}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)