'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Publication.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Publication.init({
    idUSERS: DataTypes.INTEGER,
    title: DataTypes.STRING,
    attachment: DataTypes.STRING,
    comments: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Publication',
  });
  return Publication;
};