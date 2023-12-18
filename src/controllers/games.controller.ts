import { Request, Response } from "express";
import { GameModel } from "../models/mysql";
import { generateSlug } from "../helpers";

const GameDB = new GameModel();
export class GameController {
  /**
   * !TODO: falta anexar los juegos de la api | las relaciones
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response) {
    try {
      const results = await GameDB.getAll();

      const response = {
        total: results.length,
        status: true,
        next: "worked",
        data: results
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getByid(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await GameDB.getById(id);

      const response = {
        status: !!result,
        data: result
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const results = await GameDB.create(req.body);

      return res.status(201).json(results);
    } catch (error) {
      return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
  }

  /**
   * TODO: validar los campos ingresados
   * !agregar tipado para los id
   * @param req
   * @param res
   * @params {id}
   * @querys deleted | updated
   * @returns
   */
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { query } = req.query;
    try {
      const existsGame = await GameDB.getById(id);

      if (!existsGame) {
        return res.status(404).json({ message: "Game dont exists!" });
      }

      // deleted logic
      if (query === "deleted") {
        const result = await GameDB.deletedLogic(id);

        if (result) {
          return res.status(202).json({
            response: {
              status: !!result,
              message: "deleted item!"
            }
          });
        }
      }

      // updated
      if (query === "updated") {
        let slug = "";

        if (existsGame.name !== req.body.name) {
          slug = generateSlug(req.body.name);

          const updated = {
            ...req.body,
            slug
          };

          const result = await GameDB.update(id, updated);

          return res.status(202).json({
            response: {
              status: !!result,
              data: result
            }
          });
        }

        const result = await GameDB.update(id, req.body);

        return res.status(202).json({
          response: {
            status: !!result,
            data: result
          }
        });
      }

      return res.status(400).send("Invalid query parameter verify");
    } catch (error) {
      return res.status(500).json({ error: `Internal Server Error ${error}` });
    }

    /* const results = await GameDB.getById(id); */
  }

  /**
   * TODO: validar las tablas relacionales
   * !procedimiento almacenado
   * !control de tiempo
   * @param req
   * @param res
   * @returns
   */
  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const results = await GameDB.getById(id);

      return res.send(results);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
