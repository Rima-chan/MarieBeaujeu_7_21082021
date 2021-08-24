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
        foreignKey: 'userId',
        otherKey: 'publicationId',
      });
      models.Publication.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'publicationId',
        otherKey: 'userId',
      });
      models.Comment.belongsTo(models.User,{
        foreignKey: {
          allowNull: false,
        }
      });
      models.Comment.belongsTo(models.Publication,{
        foreignKey: {
          allowNull: false,
        }
      });
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    publicationId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true,
  });
  return Comment;
};