/* eslint-disable no-param-reassign */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const PurchaseItem = sequelize.define('PurchaseItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'PurchaseItems'
  });

  PurchaseItem.associate = (models) => {
    PurchaseItem.belongsTo(models.Event, { foreignKey: 'id', onDelete: 'CASCADE', as: 'event' });
  };

  PurchaseItem.prototype.toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      price: this.price
    };
  };

  return PurchaseItem;
};
