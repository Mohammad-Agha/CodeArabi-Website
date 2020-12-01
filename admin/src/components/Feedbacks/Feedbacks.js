import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import FeedbackRow from './FeedbackRow'

const Feedbacks = () => {
  const [offset, setOffset] = useState(0)
  const [feedbacks, setFeedbacks] = useState([])
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      const perPage = 12
      const response = await fetch(`http://localhost:5000/api/contact?page=${offset + 1}&limit=${perPage}`, {
        headers: {
          'Authentication': localStorage.getItem('token')
        }
      })
      const data = await response.json()

      if (isMounted) {
        setFeedbacks(data.results)
        setPageCount(Math.ceil(data.total / perPage))
      }
    }
    run()
    return () => { isMounted = false }
  }, [offset])

  const handlePageClick = (e) => setOffset(e.selected)

  return (
    <div className="div-wrapper">
      <div className="component-div">
        <span className="component-name">Feedbacks</span>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Title</th>
            <th>Body</th>
            <th>Email</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((data, index) => (
            <FeedbackRow key={index} data={data} />
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  )
}

export default Feedbacks
