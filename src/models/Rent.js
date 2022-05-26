/* eslint-disable no-param-reassign */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Rent = sequelize.define('Rent', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
  }, {
    tableName: 'Rents'
  });

  Rent.associate = (models) => {
    Rent.belongsTo(models.Event, { foreignKey: 'id', onDelete: 'CASCADE', as: 'events' });
  };

  Rent.prototype.toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      price: this.price
    };
  };

  return Rent;
};
