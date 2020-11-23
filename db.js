const { open } = require('sqlite')
const sqlite3 = require('sqlite3')

const initializeDB = async () => {
  const db = await open({
    filename: 'db.sqlite',
    driver: sqlite3.Database
  })

  const getAdminByUsername = async username => {
    try {
      const query = `SELECT id, username, password FROM admin WHERE username=?`
      return await db.get(query, [username])
    } catch (error) {
      console.error(error)
    }
  }

  const getAdminById = async id => {
    try {
      const query = `SELECT id, username FROM admin WHERE id=?`
      return await db.get(query, [id])
    } catch (error) {
      console.error(error)
    }
  }

  const addBlog = async blog => {
    const query = `INSERT INTO blog (tag, title, description, content, featured) VALUES(?, ?, ?, ?, ?)`
    try {
      return await db.run(query, [blog.tag, blog.title, blog.description, blog.content, blog.featured])
    } catch (error) {
      console.error(error)
    }
  }

  const countBlogs = async () => {
    const query = `SELECT COUNT(id) AS total FROM blog`
    try {
      return await db.get(query)
    } catch (error) {
      console.error(error)
    }
  }

  const getPaginatedBlogs = async (offset, limit) => {
    const query = `SELECT * FROM blog LIMIT ${offset}, ${limit}`
    try {
      return await db.all(query)
    } catch (error) {
      console.error(error);
    }
  }

  const getBlogById = async id => {
    try {
      const query = `SELECT * FROM blog WHERE id=?`
      return await db.get(query, [id])
    } catch (error) {
      console.error(error)
    }
  }

  const getBlogsByTag = async tag => {
    try {
      const query = `SELECT * FROM blog WHERE tag LIKE '%${tag}%'`
      return await db.all(query)
    } catch (error) {
      console.error(error)
    }
  }

  const updateBlog = async (blog, id) => {
    const query = `UPDATE blog SET tag=?, title=?, description=?, content=?, featured=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
    try {
      return await db.run(query, [blog.tag, blog.title, blog.description, blog.content, blog.featured, id])
    } catch (error) {
      console.error(error)
    }
  }

  const deleteBlog = async id => {
    const query = `DELETE FROM blog WHERE id=?`
    try {
      return await db.run(query, [id])
    } catch (error) {
      console.error(error)
    }
  }

  const Admin = {
    getAdminByUsername,
    getAdminById
  }

  const Blog = {
    addBlog,
    countBlogs,
    getPaginatedBlogs,
    getBlogById,
    getBlogsByTag,
    updateBlog,
    deleteBlog
  }

  return { Admin, Blog }

}

module.exports = initializeDB