import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './BlogRow.css'

const BlogRow = ({ data, deleteBlogs }) => {
  const deleteButton = e => {
    deleteBlogs(parseInt(e.target.id))
  }

  const renderDate = date => {
    const formattedDate = new Date(date)
    const returnDate = `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}-${formattedDate.getDate()}`
    return returnDate
  }

  return (

    <tr>
      <td>{data.id}</td>
      <td>{data.tag.length > 20 ? `${data.tag.substring(0, 20)}...` : data.tag}</td>
      <td>{data.title.length > 20 ? `${data.title.substring(0, 20)}...` : data.title}</td>
      <td>{data.description.length > 20 ? `${data.description.substring(0, 20)}...` : data.description}</td>
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
