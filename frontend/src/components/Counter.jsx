import React,{useState,useEffect} from 'react'

const Counter = () => {
    const [count1,setCount1]  = useState(0);
    const [count2,setCount2] = useState(0);
    useEffect(()=>{
        console.log("EFFECT")
        
    },[count1,count2])
function increment1()
{
    setCount1(count1 +1)
}

function increment2()
{
    setCount2(count2 + 1)
}
console.log("RENDERING.....")
  return (
    <>
    <div>
        <h2>Counter</h2>
        <h3>Count1:{count1}</h3>
        <h3>Count2:{count2}</h3>
        <button onClick={increment1}>Increment 1</button>
        <button onClick={increment2}>Increment 2</button>
    </div>
    </>
)
}

export default Counter