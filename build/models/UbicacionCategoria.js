"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Connection
const connection_1 = __importDefault(require("../db/connection"));
const UbicacionCategoria = connection_1.default.define('UbicacionCategoria', {
    ubicacionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    categoriaId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'ubicacionesCategorias',
    timestamps: true
});
exports.default = UbicacionCategoria;
