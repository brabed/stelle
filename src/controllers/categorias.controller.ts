import { Request, Response } from "express";

// Model
import Categoria from "../models/Categoria";
import Tipo from "../models/Subcategoria";

class CategoriasController {

  async obtenerCategoria(req: Request, res: Response) {
    const categoriaParam = req.params.categoriaId;

    try {

      const categoria = await Categoria.findOne({
        where: { id: categoriaParam }
      });

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria no encontrada mi papá!!' });
      };

      res.json(categoria);

    } catch (error) {

      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  async obtenerTiposPorCategoria(req: Request, res: Response) {
    const categoriaParam = req.params.categoriaId;

    try {

      const categoria = await Categoria.findOne({
        where: { id: categoriaParam },
        include: [{ model: Tipo }]
      });

      if (!categoria) {
        return res.status(404).json({ message: 'Ubicación no encontrada mi papá!!' });
      };


      const categorias = categoria.toJSON();
      res.json(categorias.Tipos);

    } catch (error) {
    }
  }
}

export const categoriasController = new CategoriasController();