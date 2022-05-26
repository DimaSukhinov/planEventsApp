/* eslint-disable no-param-reassign */

'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    login: { type: DataTypes.TEXT, allowNull: false, unique: true },
    userName: { type: DataTypes.TEXT, allowNull: false },
    password: { type: DataTypes.TEXT, allowNull: false }
  }, {
    tableName: 'Users'
  });

  User.beforeCreate(async (model) => {
    if (model.password !== null) {
      model.password = await bcrypt.hash(model.password, 10);
    } else {
      model.password = null;
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Contributor, { foreignKey: 'id', onDelete: 'CASCADE', as: 'contributors' });
    User.hasMany(models.Event, { foreignKey: 'id', onDelete: 'CASCADE', as: 'events' });
  };

  User.prototype.toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      userName: this.userName
    };
  };

  return User;
};
