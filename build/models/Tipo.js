"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Connection
const connection_1 = __importDefault(require("../db/connection"));
const Tipo = connection_1.default.define('Tipo', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipos: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'tipos',
    timestamps: true
});
exports.default = Tipo;
