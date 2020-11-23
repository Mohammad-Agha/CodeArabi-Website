import React, { useState } from 'react'

const Blog = ({ data, updateBlogs, deleteBlogs }) => {

  const updateButton = e => {
    updateBlogs(parseInt(e.target.id))
  }

  const deleteButton = e => {
    deleteBlogs(parseInt(e.target.id))
  }

  return (
    <div>
      <ul>
        <li>{data.id}</li>
        <li>{data.title}</li>
        <li>{data.description}</li>
        <li>{data.featured ? 'true' : 'false'}</li>
        <li>{data.created_at}</li>
        <li>{data.updated_at ? data.updated_at : 'null'}</li>
        <button id={data.id} onClick={updateButton}>Update</button>
        <button id={data.id} onClick={deleteButton}>Delete</button>
      </ul>
    </div>
  )
}

export default Blog
