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
      // M to M relation : relation bewteen Users and Publications through comments
      models.User.belongsToMany(models.Publication, {
        through: models.Comments,
        foreignKey: 'userId',
        otherKey: 'publicationId',
      });
      models.Publication.belongsToMany(models.User, {
        through: models.Comments,
        foreignKey: 'publicationId',
        otherKey: 'userId',
      });
      // Make the link between foreing keys and reference tables
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
      models.Comment.belongsTo(models.Publication, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Comment.init({
    publicationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Comment',
  });
  return Comment;
};