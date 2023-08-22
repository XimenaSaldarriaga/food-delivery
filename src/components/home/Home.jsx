import React, {useContext} from 'react'
import { useSelector } from 'react-redux'
import { context } from '../../context/AuthContext'

const Home = () => {

  const authContext = useContext(context);
  console.log(authContext)

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
