import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

   const taskState = useSelector(state => state.tasks)
   console.log(taskState)

  return (
    <div>
          <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </div>
  )
}

export default Home
