import React, { useEffect, useState} from 'react'
import axios from '../api/axios'
import {FcDeleteRow} from "react-icons/fc"
import Spinner from "../components/spinner/Spinner"
const Inventory = () => {
  const [inventory, setInventory] = useState([])
  const [isDeleted,setIsdeleted] = useState(false)
  const [loading,setLoading] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getInventoryData = async () => {
          try {
            const inventory = await axios.get("/inventory", {
              signal: controller.signal
            })
            setLoading(true)
            isMounted && setInventory(inventory.data)
          } catch (err) {
            console.log(err)
          }
        }
        getInventoryData();
      return () => {
        controller.abort()
        isMounted = false
        
      }
  }, [isDeleted]);
  const onDeleteHandler = async(event) => {
    console.log(event.currentTarget.id)
    try{
      const result=await axios.delete("/inventory/" + event.currentTarget.id)
      if(result.status===200){
        setMessage("Deleted successfully")
        setIsdeleted(!isDeleted)
      }
    }catch(err){
      if (err.response.status === 204)
      {
        setMessage("Invalid PacketID")
      }
      console.log(err)
    }
    
  } 
  return (
    <>
      {
        loading?<section className='inventory'>
    <p style={{fontSize:"23px",color:"red"}}>{message}</p>
    {inventory?.length>0 ?
    <table className="">
      <thead>
        <tr>
          <th scope="col">PacketID</th>
          <th scope="col">PacketType</th>
          <th scope="col">PacketContent</th>
          <th scope="col">Quantity</th>
          <th scope="col">calories</th>
          <th scope="col">ExpiryDate</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          inventory ? inventory.map((row) => {
            return (
                      <tr key={row.PacketID} id={row.PacketID} >
                        <td>
                          {row.PacketID ? row.PacketID : ''}
                        </td>
                        <td>
                          {row.PacketType ? row.PacketType : "-"}
                        </td>
                        <td>
                          {row.PacketContent ? row.PacketContent : "-"}
                        </td>
                        <td>
                          {row.Quantity ? row.Quantity : "-"}
                        </td>
                        <td>
                          {row.calories ? row.calories : "-"}
                        </td>
                        <td>
                          {row.ExpiryDate ? row.ExpiryDate : "-"}
                        </td>
                        <td>
                        <FcDeleteRow color={'white'} size={23} id={row.PacketID} onClick={onDeleteHandler}/>
                        </td>
                      </tr>
            )
          }):<h1>No data found</h1>
      }
      </tbody>
    </table>:<h2>Inventory is empty you have failed </h2>
    }
    </section>:<Spinner />
      }

    </>
  
    
  )
}

export default Inventory