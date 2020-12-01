import React from 'react'

const SubRow = ({ data }) => {
  return (
    <tr style={{ height: "40px" }}>
      <td>{data.id}</td>
      <td><a href={`mailto:${data.email}`}>{data.email}</a></td>
      <td>{data.created_at}</td>
    </tr>
  )
}

export default SubRow
