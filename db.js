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

  const getPaginatedBlogs = async (offset, limit, column, order) => {
    let query
    if (column && order) {
      query = `SELECT * FROM (SELECT * FROM blog LIMIT ${offset}, ${limit}) 
      ORDER BY ${column} ${order}`
    }
    else {
      query = `SELECT * FROM blog LIMIT ${offset}, ${limit}`
    }
    console.log(query);
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

  const getFeaturedBlogs = async () => {
    const query = `SELECT * FROM blog WHERE featured=1 ORDER BY created_at DESC LIMIT 6`
    try {
      console.log(query);
      return await db.all(query)
    } catch (error) {
      console.error(error)
    }
  }

  const getFeaturedBlogsNumber = async () => {
    const query = `SELECT COUNT(id) AS total FROM blog WHERE featured=1`
    try {
      console.log(query);
      return await db.get(query)
    } catch (error) {
      console.error(error)
    }
  }


  const addImage = async filename => {
    const query = `INSERT INTO image (path) VALUES(?)`
    try {
      return await db.run(query, [filename])
    } catch (error) {
      console.error(error)
    }
  }

  const deleteImageByPath = async path => {
    const query = `DELETE FROM image WHERE path=?`
    try {
      return await db.run(query, [path])
    } catch (error) {
      console.error(error)
    }
  }

  const countImages = async () => {
    const query = `SELECT COUNT(id) AS total FROM image`
    try {
      return await db.get(query)
    } catch (error) {
      console.error(error)
    }
  }

  const getPaginatedImages = async (offset, limit) => {
    const query = `SELECT * FROM image LIMIT ${offset}, ${limit}`
    try {
      return await db.all(query)
    } catch (error) {
      console.error(error);
    }
  }

  const getPaginatedSubs = async (offset, limit) => {
    const query = `SELECT * FROM subscribe LIMIT ${offset}, ${limit}`
    try {
      return await db.all(query)
    } catch (error) {
      console.error(error);
    }
  }

  const countSubs = async () => {
    const query = `SELECT COUNT(id) AS total FROM subscribe`
    try {
      return await db.get(query)
    } catch (error) {
      console.error(error)
    }
  }

  const addSub = async sub => {
    const query = `INSERT INTO subscribe (email) VALUES(?)`
    try {
      return await db.run(query, [sub.email])
    } catch (error) {
      console.error(error)
    }
  }

  const getSubByEmail = async email => {
    try {
      const query = `SELECT id, email FROM subscribe WHERE email=?`
      return await db.get(query, [email])
    } catch (error) {
      console.error(error)
    }
  }

  const getAllSubs = async () => {
    try {
      const query = `SELECT email FROM subscribe`
      return await db.all(query)
    } catch (error) {
      console.error(error)
    }
  }

  const addContact = async contact => {
    const query = `INSERT INTO contact (name, title, email, body) VALUES(?, ?, ?, ?)`
    try {
      return await db.run(query, [contact.name, contact.title, contact.email, contact.body])
    } catch (error) {
      console.error(error)
    }
  }

  const countContacts = async () => {
    const query = `SELECT COUNT(id) AS total FROM contact`
    try {
      return await db.get(query)
    } catch (error) {
      console.error(error)
    }
  }

  const getPaginatedContacts = async (offset, limit) => {
    const query = `SELECT * FROM contact LIMIT ${offset}, ${limit}`
    try {
      return await db.all(query)
    } catch (error) {
      console.error(error);
    }
  }

  const getContactById = async id => {
    try {
      const query = `SELECT * FROM contact WHERE id=?`
      return await db.get(query, [id])
    } catch (error) {
      console.error(error)
    }
  }


  const getSocial = async () => {
    try {
      const query = `SELECT * FROM social_media`
      return await db.get(query)
    } catch (error) {
      console.error(error)
    }
  }

  const updateSocial = async social => {
    const query = `UPDATE social_media SET facebook=?, instagram=?, youtube=?, twitter=?, github=? WHERE id=?`
    try {
      return await db.run(query, [social.facebook, social.instagram, social.youtube, social.twitter, social.github, 1])
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
    deleteBlog,
    getFeaturedBlogs,
    getFeaturedBlogsNumber
  }

  const Image = {
    addImage,
    countImages,
    deleteImageByPath,
    getPaginatedImages
  }

  const Sub = {
    getPaginatedSubs,
    countSubs,
    addSub,
    getSubByEmail,
    getAllSubs
  }

  const Contact = {
    addContact,
    countContacts,
    getPaginatedContacts,
    getContactById
  }

  const Social = {
    getSocial,
    updateSocial
  }

  return { Admin, Blog, Image, Sub, Contact, Social }

}

module.exports = initializeDB