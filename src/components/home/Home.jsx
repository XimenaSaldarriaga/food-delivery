import React from 'react'
import { useSelector } from 'react-redux'

const home = () => {

   const taskState = useSelector(state => state.tasks)
   console.log(taskState)

  return (
    <div>home</div>
  )
}

export default home
