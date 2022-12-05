import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import Typewriter from 'typewriter-effect';
import Spinner from "../components/spinner/Spinner"
const GenerateSchedule = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getScheduleData = async () => {
      try {
        const schedule = await axios.get("inventory/schedule", {
          signal: controller.signal
        })
        setData(schedule.data)
        setLoading(true)
        console.log(schedule.data)
      } catch (err) {
        console.log(err)
      }
    }
    getScheduleData();
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])


  let text = data.result === 0 || 'undefined' ? "you have failed martian martian can no longer survive" : data.result >1?  `Martian can survive maximum ${data.result} days`:`Martian can survive maximum ${data.result} day`
  console.log(data.result)
  return (
    <div>
      {
        loading ? <div className='home-txt'>
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString(`${text}`)
                .pauseFor(4500)
                .start();
            }}
          />
        </div> : <Spinner />
      }
    </div>
  )
}

export default GenerateSchedule