import React from 'react'
import { Link } from 'react-router-dom'

const FeedbackRow = ({ data }) => {
  return (
    <tr style={{ height: "40px" }}>
      <td>{data.id}</td>
      <td>{data.name.length > 17 ? `${data.name.substring(0, 17)}...` : data.name}</td>
      <td>{data.title.length > 17 ? `${data.title.substring(0, 17)}...` : data.title}</td>
      <td>{data.email}</td>
      <td>{data.created_at}</td>
      <td><Link className="update-btn" to={`/admin/feedbacks/${data.id}`}>Read more</Link></td>
    </tr>
  )
}

export default FeedbackRow
