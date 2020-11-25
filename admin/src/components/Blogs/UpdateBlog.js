import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Blog = () => {

  let { id } = useParams()
  return (
    <div>
      Hello {id}
    </div>
  )
}

export default Blog