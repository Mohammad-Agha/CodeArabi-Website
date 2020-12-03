import React, { useEffect, useState } from 'react'

const TotalBlogs = () => {

  const [count, setCount] = useState(null)

  useEffect(() => {
    let isMounted = true
    const run = async () => {
      const response = await fetch(`http://localhost:5000/api/blog/count/all`)
      const data = await response.json()
      if (isMounted) {
        setCount(data.data.total)
      }
    }
    run()
    return () => { isMounted = false }
  }, [])

  return (
    <div className="card">
      <h1 className="card-heading">Blogs</h1>
      <p className="card-number">{count}</p>
    </div>
  )
}

export default TotalBlogs
