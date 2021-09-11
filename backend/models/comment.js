'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Publication, {
        through: models.Comment,
      });
      models.Publication.belongsToMany(models.User, {
        through: models.Comment,
      });
      models.Comment.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        },
        onDelete: 'CASCADE',
      });
      models.Comment.belongsTo(models.Publication, {
        foreignKey: {
            allowNull: false
        },
        onDelete: 'CASCADE',
      });
    }
  };
  Comment.init({
    // Force the through table to have primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    content: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true,
  });
  return Comment;
};