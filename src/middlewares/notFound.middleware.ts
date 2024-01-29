import { Request, Response, NextFunction } from "express";

class RutaNoEncontradaMiddleware {

  public handle(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({ error: 'Ruta no encontrada' })
  }
}

export default new RutaNoEncontradaMiddleware();