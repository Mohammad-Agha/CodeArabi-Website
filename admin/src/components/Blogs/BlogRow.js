import React from 'react'
import { Link } from 'react-router-dom'

import './BlogRow.css'

const BlogRow = ({ data, deleteBlogs }) => {
  const deleteButton = e => {
    deleteBlogs(parseInt(e.target.id))
  }

  return (

    <tr>
      <td>{data.id}</td>
      <td>{data.tag.length > 10 ? `${data.tag.substring(0, 10)}...` : data.tag}</td>
      <td>{data.title.length > 10 ? `${data.title.substring(0, 10)}...` : data.title}</td>
      <td>{data.description.length > 10 ? `${data.description.substring(0, 10)}...` : data.description}</td>
      <td>{data.featured === 1 ? '✔' : '✗'}</td>
      <td>{data.created_at}</td>
      <td>{!data.updated_at ? 'never' : data.updated_at}</td>
      <td>
        <Link className="update-btn" to={`/admin/blogs/${data.id}`}>Update</Link>
        <button className="delete-btn" id={data.id} onClick={deleteButton}>Delete</button>
      </td>

    </tr>
  )
}

export default BlogRow
