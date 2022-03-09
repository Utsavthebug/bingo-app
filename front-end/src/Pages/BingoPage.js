import React, { useEffect, useState,useCallback } from 'react'
import './bingopage.css'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'

const socket = io("/");

const BingoPage = () => {
  const [boxes,setBoxes] = useState([])
  const {name,room} = useParams()
  const alert = useAlert()

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  const handleClick =(e)=>{
     const target = e.target.innerHTML*1;
    // console.log(target)
    // console.log(boxes)
   socket.emit("clicked",{target})

  }
  //game logic building 
  //check row and columns 

const checkRow = useCallback(()=>{
  if((boxes[0]?.clicked&&boxes[1]?.clicked&&boxes[2]?.clicked)||(boxes[3]?.clicked&&boxes[4]?.clicked&&boxes[5]?.clicked)||(boxes[6]?.clicked&&boxes[7]?.clicked&&boxes[8]?.clicked)){
    alert.info(`${name} won `)
  }
},[boxes,name,alert])

// const checkRow = useCallback(()=>{
//   console.log(`${name}`)
// },[name])

  useEffect(()=>{
    socket.on("clicked",({target})=>{
      //console.log(target)
    checkRow()
    let  boxArray = boxes.map(i=> i.num===Number(target)?{...i,clicked:true}:i)

    setBoxes(boxArray)
    
    console.log(boxes)
  //console.log("hi")
    })
 
  },[boxes,checkRow])

  useEffect(()=>{
    socket.emit("joinRoom",{room,name})
  },[room,name])


  useEffect(()=>{
   // let array = [1,2,3,4,5,6,7,8,9]
    let array = [{num:1,clicked:false},{num:2,clicked:false},{num:3,clicked:false},{num:4,clicked:false},{num:5,clicked:false},
      {num:6,clicked:false},{num:7,clicked:false},{num:8,clicked:false},{num:9,clicked:false}]
    shuffle(array)
    //console.log('i run')
    setBoxes(array)
  },[])

  return (
    <div className='bingo-container'>
        <div className='bingo-box'>
            {
                boxes.map((element,i)=>(
                    <button disabled={element.clicked} onClick={handleClick} className={!element.clicked?"boxes enabled":"boxes disabled"} key={i}>
                        {element.num}
                        </button>
                ))
            }
        </div>
    </div>
  )
}

export default BingoPage