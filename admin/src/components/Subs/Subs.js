import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import SubRow from './SubRow'

const Subs = () => {
  const [offset, setOffset] = useState(0)
  const [subs, setSubs] = useState([])
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      const perPage = 12
      const response = await fetch(`http://localhost:5000/api/subs?page=${offset + 1}&limit=${perPage}`, {
        headers: {
          'Authentication': localStorage.getItem('token')
        }
      })
      const data = await response.json()

      if (isMounted) {
        setSubs(data.results)
        setPageCount(Math.ceil(data.total / perPage))
      }
    }
    run()
    return () => { isMounted = false }
  }, [offset])

  const handlePageClick = (e) => setOffset(e.selected)

  const copyEmails = async e => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/subs/email/all`, {
      headers: {
        'Authentication': localStorage.getItem('token')
      }
    })
    let emails = ""
    const data = await response.json()
    if (data.length === 0) return
    data.forEach(email => emails += `${email.email}, `)
    emails = emails.slice(0, -2)
    navigator.clipboard.writeText(emails)
  }

  return (
    <div className="div-wrapper">
      <div className="component-div">
        <span className="component-name">Subscribers</span>
        <button className="link-btn big-btn" onClick={copyEmails}>Copy Emails</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>email</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((data, index) => (
            <SubRow key={index} data={data} />
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

export default Subs
