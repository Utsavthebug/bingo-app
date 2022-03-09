import React,{useState} from 'react'
import './Homepage.css'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'

const Homepage = () => {

    // const [isdisable,setDisabled] = useState(true)
    const [name,setName] = useState("")
    const [room,setRoom] = useState("")
    let navigate = useNavigate()
    const alert = useAlert()

    const handleClick = ()=>{
        if(name!=="" && room!==""){
        navigate(`/game/${name}/${room}`)
        }
        else{
        alert.error("Please Enter name and room")
        }
    }
  return (
      <div className='home-container'> 
    <h1>Select Room</h1>

    <div className='room-container'>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Input name'/>

        <input value={room} onChange={(e)=>setRoom(e.target.value)} type="text" placeholder='Input room'/>

      <button onClick={handleClick} className='submit-btn' type='submit' name='Enter a game'>Enter the game</button>
    </div>

      </div>
     )
}

export default Homepage