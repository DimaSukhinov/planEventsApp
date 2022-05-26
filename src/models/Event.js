/* eslint-disable no-param-reassign */

'use strict';

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        ownerId: {type: DataTypes.INTEGER, allowNull: false},
        title: {type: DataTypes.TEXT, allowNull: false},
        date: {type: DataTypes.DATEONLY, allowNull: false},
    }, {
        tableName: 'Events'
    });

    Event.associate = (models) => {
        Event.hasMany(models.Contributor, {foreignKey: 'id', onDelete: 'CASCADE', as: 'contributors'});
        Event.hasMany(models.PurchaseItem, {foreignKey: 'id', onDelete: 'CASCADE', as: 'purchaseItems'});
        Event.hasMany(models.Gift, {foreignKey: 'id', onDelete: 'CASCADE', as: 'gifts'});
        Event.hasOne(models.Rent, {foreignKey: 'id', onDelete: 'CASCADE', as: 'rent'});
    };

    Event.prototype.toJSON = () => {
        return {
            id: this.id,
            ownerId: this.ownerId,
            title: this.title,
            date: this.date,
        };
    };

    return Event;
};
