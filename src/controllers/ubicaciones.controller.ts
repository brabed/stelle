import { Request, Response } from "express";

// Model
import Ubicacion from "../models/Ubicacion";
import Categoria from "../models/Categoria";
import UbicacionCategoria from "../models/UbicacionCategoria";
import Subcategoria from "../models/Subcategoria";

class UbicacionesController {

  // Método para obtener las ubicaciones disponibles
  async obtenerUbicaciones(req: Request, res: Response) {
    try {
      const ubicaciones = await Ubicacion.findAll();
      res.status(200).json(ubicaciones);

    } catch (error) {
      console.error('Error al obtener ubicaciones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Método que permite traer una ubicación pasando el nombre de la ubicación como param
  async obtenerUbicacion(req: Request, res: Response) {
    try {
      const ubicacionParam = req.params.ubicacion;
      const ubicacion = await Ubicacion.findOne({
        where: { slug: ubicacionParam }
      });

      if (!ubicacion) {
        return res.status(404).json({ message: 'Ubicación no encontrada mi papá!!' });
      };

      res.status(200).json(ubicacion);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  // Método que permite obtener las categorias asociadas a la ubicación seleccionada
  async obtenerCategoriasPorUbicacion(req: Request, res: Response) {
    try {
      const ubicacionParam = req.params.ubicacion;

      const ubicacion = await Ubicacion.findOne({
        where: { slug: ubicacionParam },
        include: [{ model: Categoria }]
      });

      if (!ubicacion) {
        return res.status(404).json({ message: 'Ubicación no encontrada mi papá!!' });
      };

      const categorias = ubicacion.toJSON();
      res.status(200).json(categorias.Categoria);

    } catch (error) {
      console.error('Error al obtener las categorias:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  // Método que permite obtener el detalle de una categoría según la ubicación seleccionada
  async obtenerDetalleCategoriaPorUbicacion(req: Request, res: Response) {
    try {

      const ubicacionParam = req.params.ubicacion;
      const categoriaParam = req.params.categoria;

      // 1. Buscar la ubicación
      const ubicacion = await Ubicacion.findOne({
        where: { slug: ubicacionParam },
        include: [{ model: Categoria }]
      });

      if (!ubicacion) {
        return res.status(404).json({ error: 'Ubicación no encontrada' });
      }

      // 2. Buscar la categoria por su slug
      const categoria = await Categoria.findOne({ where: { slug: categoriaParam } });

      const ubicacionJSON = ubicacion.toJSON();

      if (!categoria || !ubicacionJSON.Categoria.some((c: any) => c.slug === categoriaParam)) {
        return res.status(404).json({ error: 'La categoría no pertenece a la ubicación seleccionada' });
      }

      // 3. Respuesta
      res.status(200).json(categoria);

    } catch (error) {
      console.error('Error al obtener el detalle de la categoria:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  // Método para permite obtener las subcateogrias asociadas a la categoria seleccionada
  async obtenerSubcategoriasPorCategorias(req: Request, res: Response) {
    try {

      const ubicacionParam = req.params.ubicacion;
      const categoriaParam = req.params.categoria;

      // 1. Buscar la ubicación
      const ubicacion = await Ubicacion.findOne({
        where: { slug: ubicacionParam }
      });

      if (!ubicacion) {
        return res.status(404).json({ error: 'Ubicación no encontrada' });
      }

      // 2. Buscar la categoria por su slug
      const categoria = await Categoria.findOne({
        where: { slug: categoriaParam },
        include: [{ model: Subcategoria }]
      });

      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada en la ubicación proporcionada' });
      }

      const subcategoriasJSON = categoria.toJSON();

      // 3. Respuesta
      res.status(200).json(subcategoriasJSON.Subcategoria);

    } catch (error) {

    }
  }

  // Método que permite obtener el detalle de una subcategoría según la categoria seleccionada
  async obtenerDetalleSubcategoriasPorCategorias(req: Request, res: Response) {
    try {

      const ubicacionParam = req.params.ubicacion;
      const categoriaParam = req.params.categoria;
      const subCategoriaParam = req.params.subcategoria;
      let categoriaIdParam = 1;

      // 0. Asignar id para validar asociación de la subcategoria con la categoria
      if(categoriaParam === 'instalaciones-y-adecuaciones') { categoriaIdParam = 2; }

      // 1. Buscar la ubicación por slug
      const ubicacion = await Ubicacion.findOne({
        where: { slug: ubicacionParam }
      });

      if (!ubicacion) {
        return res.status(404).json({ error: 'Ubicación no encontrada' });
      }

      // 2. Buscar la categoria por su slug
      const categoria = await Categoria.findOne({
        where: { slug: categoriaParam }
      });

      if (!categoria) {
        return res.status(404).json({ error: 'Categoria no encontrada en la ubicación asociada' });
      }

      // 3. Buscar la subcategoria por slug
      const subcategoria = await Subcategoria.findOne({
        where: {
          slug: subCategoriaParam,
          categoriaId: categoriaIdParam
        }
      });

      if (!subcategoria) {
        return res.status(404).json({ error: 'Subcategoria no encontrada en la categoria asociada' });
      }

      // 4. Respuesta
      res.status(200).json(subcategoria);

    } catch (error) {
      console.error('Error al obtener el detalle de la subcategoria:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
}

export const ubicacionesController = new UbicacionesController();