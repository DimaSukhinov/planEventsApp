/* eslint-disable no-param-reassign */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Contributor = sequelize.define('Contributor', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    isAccepted: { type: DataTypes.BOOLEAN, allowNull: false }
  }, {
    tableName: 'Contributors'
  });

  Contributor.associate = (models) => {
    Contributor.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'users' });
    Contributor.belongsTo(models.Event, { foreignKey: 'eventId', onDelete: 'CASCADE', as: 'events' });
  };

  Contributor.prototype.toJSON = () => {
    return {
      id: this.id,
      eventId: this.eventId,
      userId: this.userId,
      isAccepted: this.isAccepted
    };
  };

  return Contributor;
};
