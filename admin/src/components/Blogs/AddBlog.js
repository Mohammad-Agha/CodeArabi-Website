import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './AddBlog.css'

const AddBlog = () => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [tag, setTag] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [featured, setFeatured] = useState(false)

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
    console.log(editorState);
    console.log((draftToHtml(convertToRaw(editorState.getCurrentContent()))));
  }

  const handleChange = e => {
    e.target.name === 'tag' && setTag(e.target.value)
    e.target.name === 'title' && setTitle(e.target.value)
    e.target.name === 'description' && setDescription(e.target.value)
    if (e.target.name === 'featured') {
      e.target.checked ? setFeatured(true) : setFeatured(false)
    }
  }

  const submitBlogForm = () => {

  }

  const submitImageForm = () => {

  }

  return (
    <div className="div-wrapper">
      <div className="component-div">
        <span className="component-name">Add Blog</span>
      </div>
      <form className="add-blog-form" onSubmit={submitBlogForm}>
        <div className="form-group">
          <label>Tag</label>
          <input onChange={handleChange} type="text" name="tag" required />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input onChange={handleChange} type="text" name="title" required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input onChange={handleChange} type="text" name="description" required />
        </div>
        <div className="form-group">
          <label className="same-line">
            <input onChange={handleChange} type="checkbox" name="featured" />
            <span>Featured</span>
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
        {/* <label htmlFor="file">Browse...</label> */}
        <input name="fileField" className="input-file" id="file" type="file" multiple name="fileField" />
        <button className="input-upload">Upload</button>
      </form>
    </div>
  )
}

export default AddBlog