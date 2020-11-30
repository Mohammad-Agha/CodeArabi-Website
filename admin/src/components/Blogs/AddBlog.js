import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import ManageImages from './ManageImages'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './AddBlog.css'

const AddBlog = () => {

  const [viewImages, setViewImages] = useState(false)
  const [alert, setAlert] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [tag, setTag] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [featured, setFeatured] = useState(false)
  const [error, setError] = useState('')
  const [tagError, setTagError] = useState(null)
  const [descriptionError, setDescriptionError] = useState(null)
  const [titleError, setTitlteError] = useState(null)
  const [featuredError, setFeaturedError] = useState(null)

  useEffect(() => {
    const run = async () => {
      const response = await fetch(`http://localhost:5000/api/blog/featured/count`)
      const data = await response.json()
      if (data.data.total >= 6) {
        document.getElementById("featured").disabled = true
        setFeaturedError('You already have 6 featured blogs')
      }
    }

    run()
  }, [])

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
  }

  const handleChange = async e => {
    e.target.name === 'tag' && setTag(e.target.value)
    e.target.name === 'title' && setTitle(e.target.value)
    e.target.name === 'description' && setDescription(e.target.value)
    if (e.target.name === 'featured') {
      e.target.checked ? setFeatured(true) : setFeatured(false)
    }
  }

  const submitBlogForm = async e => {
    e.preventDefault()
    if (!tag) {
      setTagError('Tag is required')
      setTimeout(() => {
        setTagError(null)
      }, 2000)
    }
    if (!title) {
      setTitlteError('Title is required')
      setTimeout(() => {
        setTitlteError(null)
      }, 2000)
    }
    if (!description) {
      setDescriptionError('Description is required')
      setTimeout(() => {
        setDescriptionError(null)
      }, 2000)
    }
    if (!tag || !title || !description) return
    const response2 = await fetch(`http://localhost:5000/api/blog/featured/count`)
    const data2 = await response2.json()
    if (data2.data.total >= 6) {
      setFeaturedError('You already have 6 featured blogs')
      setTimeout(() => {
        setFeaturedError(null)
      }, 2000)
      return
    }
    let tagsArray = []
    const tags = tag.split(',')
    const trimmedTags = tags.map(tag => tag.trim())
    trimmedTags.map(tag => tag.length > 0 && tagsArray.push(tag))
    let tagString = ""
    tagsArray.map(tag => tagString += `${tag}, `)
    tagString = tagString.substring(0, tagString.length - 2)
    const body = {
      tag: tagString,
      title,
      description,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      featured
    }
    try {
      const response = await fetch(`http://localhost:5000/api/blog`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': localStorage.getItem('token')
        },
        body: JSON.stringify(body)
      })
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 2000)
      setTag('')
      setDescription('')
      setTitle('')
      setFeatured(false)
      setEditorState(EditorState.createEmpty())
    } catch (error) {
      console.log(error);
    }
  }

  const submitImageForm = async e => {
    e.preventDefault()
    const files = [...e.target.fileField.files]
    console.log(files);
    if (files.length === 0) {
      setError('No image was selected')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    if (files[0].size > 1000000) {
      setError('Image size should be less than 1MB')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    const body = new FormData();
    body.append('image', files[0])
    try {
      const response = await fetch('http://localhost:5000/api/image', {
        headers: {
          "Authentication": localStorage.getItem('token')
        },
        method: 'POST',
        body
      })
      const data = await response.json()
      if (data.msg) {
        setError(data.msg)
        setTimeout(() => {
          setError('')
        }, 2000)
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const showImages = () => setViewImages(!viewImages)

  return (
    <div className="div-wrapper">
      <div className="component-div">
        <span className="component-name">Add Blog</span>
        <button className="link-btn big-btn" onClick={submitBlogForm}>Add blog</button>
      </div>
      {alert && <div className="show-alert-green">Blog Added</div>}
      <form className="add-blog-form">
        <div className="form-group">
          <label>Tag (Use commas for multiple tags){tagError && <span className="form-error">{tagError}</span>}</label>
          <input value={tag} onChange={handleChange} type="text" name="tag" placeholder="e.g Python, DS, Complexity, Big-O" />
        </div>
        <div className="form-group">
          <label>Title {titleError && <span className="form-error">{titleError}</span>}</label>
          <input value={title} onChange={handleChange} type="text" name="title" placeholder="e.g Sorting Arrays in Python with Complexity Analysis" />
        </div>
        <div className="form-group">
          <label>Description {descriptionError && <span className="form-error">{descriptionError}</span>}</label>
          <input value={description} onChange={handleChange} type="text" name="description" placeholder="e.g Learn how to sort arrays in different ways with Python" />
        </div>
        <div className="form-group">
          <label className="same-line">
            <input id="featured" onChange={handleChange} checked={featured} type="checkbox" name="featured" />
            <span>Featured</span>
            {featuredError && <span className="form-error">{featuredError}</span>}
          </label>
        </div>
        <div className="form-group">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor editor"
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              image: {
                previewImage: true,
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                alt: { present: true, mandatory: true },
                defaultSize: {
                  height: '100px',
                  width: '100px',
                },
              },
            }}
          />
        </div>
      </form>
      <form onSubmit={submitImageForm} className="add-image-form" encType="multipart/form">
        <label htmlFor="file">Choose an Image</label>
        <input name="fileField" className="input-file" id="file" type="file" multiple name="fileField" />
        {error && <span className="image-error">{error}</span>}
        <button className="input-upload">Upload</button>
      </form>
      <div className="form-control form-group-center">
        <button style={{ marginBottom: '20px' }} className="link-btn big-btn" onClick={showImages}>Manage Images</button>
      </div>
      {viewImages ? <ManageImages /> : ''}
    </div>
  )
}

export default AddBlog