import React from 'react'
import { Link } from 'react-router-dom'

const FeedbackRow = ({ data }) => {
  return (
    <tr style={{ height: "40px" }}>
      <td>{data.id}</td>
      <td>{data.name.length > 20 ? `${data.name.substring(0, 20)}...` : data.name}</td>
      <td>{data.title.length > 20 ? `${data.title.substring(0, 20)}...` : data.title}</td>
      <td>{data.body.length > 20 ? `${data.body.substring(0, 20)}...` : data.description}</td>
      <td><a href={`mailto:${data.email}`}>{data.email}</a></td>
      <td>{data.created_at}</td>
      <td><Link className="update-btn" to={`/admin/feedbacks/${data.id}`}>Read more</Link></td>
    </tr>
  )
}

export default FeedbackRow
