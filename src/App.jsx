import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password ,setPassword] = useState()

  ////////// UseCall Back Hooks /////////////


const passwordGenerator = useCallback( () =>{
      let pass = ""
      let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
      if(number){
          str +=  "123456789"
      }
      if(character)  {
        str +=  "!@#$%^&*()=-+[]{}~.,"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
setPassword(pass)

  }, [length,number,character])
  ////////// UseCall Back Hooks End///////////////

  ////////////// useRef Hooks ///////////////

  const passwordRef= useRef(null)

  const copyPasswordtoClipboard = useCallback(() =>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,51)
    window.navigator.clipboard.writeText(password)
  }, [password])
  ////////////// useRef Hooks End ///////////////
 

  ////////// UseEffect Hooks /////////////
useEffect(()=>{
  passwordGenerator()
}, [length,number,character, passwordGenerator])

  ////////// UseEffect Hooks End /////////////
  return (
    <>
    <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-8 text-orange-500 bg-gray-800 '>  <h1 className=' text-white text-center text-4xl my-3 mb-12'> Password Generator </h1>
    <div className=' flex shadow rounded-lg overflow-hidden mb-4'>

      <input type="text" value={password}  className=' outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef}/>
      <button onClick={copyPasswordtoClipboard} className=' outline-none  bg-blue-700 text-white py-1 px-3 shrink-0' > Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-cente gap-x-1'>
        <input type="range"  min={6} max={50} value={length} className=' cursor-pointer' onChange={(e) =>{
          setLength(e.target.value)
        }}/>
        <label > Length : {length}</label>
      </div>
      <div className=' flex items-center gap-x-1 '>
        <input type="checkbox" defaultChecked= {number} id='numberInput' onChange={()=>{
          setNumber((prev) => !prev )
        }}/>
       <label htmlFor="numberInput"> Numbers</label>
      </div>
      <div className=' flex items-center gap-x-1 '>
        <input type="checkbox" defaultChecked={character} id='characterInput' onChange={()=>{
          setCharacter((prev) => !prev )
        }}/>
       <label htmlFor="characterInput"> Characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App