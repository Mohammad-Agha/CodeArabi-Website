import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import './Blog.css'

const Blog = ({ match }) => {

  const [blog, setBlog] = useState({})
  const [wysiwyg, setWysiwyg] = useState([])

  useEffect(() => {
    const run = async () => {
      const response = await fetch(`http://localhost:5000/api/blog/${match.params.id}`)
      const data = await response.json()
      const { id, tag, title, description, content, created_at, updated_at } = data
      const date = new Date(created_at)
      const created = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      let updated = null
      if (updated_at) {
        const date2 = new Date(updated_at)
        updated = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`
      }
      const parsedData = parse(content)
      const result = []
      parsedData.forEach(element => {
        if (element.type === 'pre') {
          return result.push(element, parse(`<div class="copy-div"><button class="btn-copy">نسخ</button></div>`))
        }
        return result.push(element)
      })
      setWysiwyg(result)
      const btns = document.querySelectorAll('.btn-copy')
      btns.forEach(element => element.addEventListener('click', () => {
        const prev = element.parentElement.parentElement.previousElementSibling.firstChild
        const data = prev.innerHTML
        let formattedData = data.replace(/<br>/g, "\n")
        formattedData = formattedData.replace(/&amp;/g, '&')
        formattedData = formattedData.replace(/&lt;/g, '<')
        formattedData = formattedData.replace(/&gt;/g, '>')
        navigator.clipboard.writeText(formattedData)
      }));

      setBlog({
        id, tag, title, description, created, updated
      })
    }
    run()
  }, [match.params.id])

  return (
    <div className="blog--container">
      <h1 className="blog-title">{blog.title}</h1>
      <h2 className="blog-tags">{blog.tag}</h2>
      <h3 className="blog-created">{blog.created} نشر في</h3>
      <h3 className="blog-updated">{blog.updated && `${blog.updated} آخر تحديث`}</h3>
      <p className="blog-description">{blog.description}</p>
      <div className="blog-content">
        {wysiwyg.map((data, index) => <div key={index}>{data}</div>)}
      </div>
    </div>
  )
}

export default Blog
