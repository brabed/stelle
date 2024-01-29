"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RutaNoEncontradaMiddleware {
    handle(req, res, next) {
        res.status(404).json({ error: 'Ruta no encontrada' });
    }
}
exports.default = new RutaNoEncontradaMiddleware();
