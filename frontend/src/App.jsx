import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import ExpenseContainer from './components/ExpenseContainer'
import Counter from './components/Counter';


const Amount=[{amount:1000},{amount:223}]
function App() {

  return (
    <>
    <div>   
     {/* <Counter/>*/}
       <ExpenseContainer/>
       
    </div>
     
    </>
  )
}

export default App
