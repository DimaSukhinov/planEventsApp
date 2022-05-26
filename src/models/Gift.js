/* eslint-disable no-param-reassign */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gift', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'Gifts'
  });

  Gift.associate = (models) => {
    Gift.belongsTo(models.Event, { foreignKey: 'id', onDelete: 'CASCADE', as: 'event' });
  };

  Gift.prototype.toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      price: this.price
    };
  };

  return Gift;
};