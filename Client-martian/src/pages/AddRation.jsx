import React, { useRef, useState } from 'react'
import { Row, Col } from "react-bootstrap"
import axios from "../api/axios"
import Spinner from "../components/spinner/Spinner"
const AddRation = () => {
  const [message, setMessage] = useState("")
  const packageIdRef = useRef()
  const packageTypeRef = useRef()
  const packageContentRef = useRef()
  const caloriesRef = useRef()
  const expiryDateRef = useRef()
  const quantityRef = useRef()
  const [loading, setLoading] = useState(false)
  const SubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("")
    console.log(quantityRef.current.value);
    try {
      const response = await axios.post('/inventory',
        JSON.stringify({
          PacketID: packageIdRef.current.value,
          PacketType: packageTypeRef.current.value,
          PacketContent: packageContentRef.current.value,
          calories: caloriesRef.current.value,
          ExpiryDate: expiryDateRef.current.value,
          Quantity: quantityRef.current.value
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setLoading(true)
      if (response.status === 201) {
        setMessage("Added successfully")
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 409) {
        setMessage("PacketID must be unique")
      }
      else if (err.response.status === 400) {
        setMessage("PacketID and packet type are required ")
      }
      else {
        setMessage("server  error occurred: ");
      }
    }

  }
  setTimeout(() => {
    setMessage("")
  }, 3000)
  return (
    <section className='add-ration'>
      <Row>
        <Col sm={12} className="px-1">
          <h1> Add ration</h1>
          {<p style={{ fontSize: '25px', color: "red" }}>{message}</p>}
        </Col>
      </Row>
      {
        loading ? <form className='--flex' >
          <Row>
            <Col sm={6} className="px-1">
              <label htmlFor=''>Packet Type</label>
              <input type="text" required={true} ref={packageIdRef} placeholder='enter packet id' />
            </Col>
            <Col sm={6} className="px-1">
              <label htmlFor=''>Packet Type</label>
              <input type="text" required={true} ref={packageTypeRef} placeholder='enter packet type' />
            </Col>
            <Col sm={6} className="px-1">
              <label htmlFor=''>Packet contents </label>
              <input type="text" ref={packageContentRef} placeholder='packet contents ' />
            </Col>
            <Col sm={6} className="px-1">
              <label htmlFor=''>Calories</label>
              <input type="number" ref={caloriesRef} placeholder='enter calories' />
            </Col>
            <Col sm={6} className="px-1">
              <label htmlFor=''>Expiry Date</label>
              <input type="date" ref={expiryDateRef} placeholder='enter expiry date' />
            </Col>
            <Col sm={6} className="px-1">
              <label htmlFor=''>Quantity</label>
              <input type="number" ref={quantityRef} placeholder='enter quantity' />
            </Col>
            <Col sm={12} className="px-1">
              <button type="submit" onClick={SubmitHandler}>Add</button>
            </Col>

          </Row>
        </form> : <Spinner />
      }

    </section>
  )
}

export default AddRation
