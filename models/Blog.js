module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blog", {
    tag: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    featured: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
    {
      timestamps: false,
    }
  )

  return Blog;
};