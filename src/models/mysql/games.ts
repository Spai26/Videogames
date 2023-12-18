import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Database } from "../../config";
import { BaseRepository } from "../../repositories/index";
import { IGame } from "../../interfaces";

const data = {
  id: "1d6a92b7-94a4-11ee-a5dc-b42e99f91ce3",
  name: "mi primer juego",
  slug: "mi-primer-juego",
  description:
    "If you encounter game crashes, please try updating your graphics card driver. We are sorry to inform you that AMD graphics cards and some earlier released NVIDIA graphics cards may experience crashes when starting the game. You can try updating your graphics card driver to resolve this issue.",
  thumbnail_game:
    "https://media.rawg.io/media/screenshots/d75/d75bf15ab007368615b155ab1f93b002.jpg",
  background_image:
    "https://media.rawg.io/media/screenshots/d75/d75bf15ab007368615b155ab1f93b002.jpg",
  realeased: "2023-06-31",
  rating: 3.56,
  origin: "DB",
  isdeleted: true
};

const conn = Database.getInstance();
export class GameModel extends BaseRepository<IGame, string> {
  constructor() {
    super({
      getAll: async (): Promise<IGame[]> => {
        try {
          const connect = await conn.connect();

          const sql = `select BIN_TO_UUID(id) as id, name, slug, thumbnail_game, background_image, realeased, rating, origin, isdeleted, create_at, update_at  
            from games 
            where isdeleted = false
            order by create_at desc;`;

          const [rows] = await connect.query<RowDataPacket[]>(sql);

          return rows as IGame[];
        } catch (error) {
          throw new Error(`Error fetching games:, ${error}`);
        }
      },
      create: async (input: Partial<IGame>): Promise<IGame> => {
        try {
          const {
            name,
            slug,
            description,
            thumbnail_game,
            background_image,
            realeased,
            rating,
            origin
          } = input;
          let result;
          const connect = await conn.connect();

          const sql = `INSERT INTO games (id, name, slug, description, thumbnail_game, background_image, realeased, rating, origin)
          VALUES (
            UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?, ?, ?);`;

          const [rows] = await connect.query<ResultSetHeader>(sql, [
            name,
            slug,
            description,
            thumbnail_game,
            background_image,
            realeased,
            rating,
            origin
          ]);
          console.log(rows);

          if (rows.affectedRows > 0) {
            if (name) {
              console.log(name);
              result = await this.getByOneByField(name, "name");
              console.log(result);
            }
          }
          return result;
        } catch (error) {
          throw new Error(`Failed to create game: ${error}`);
        }
      },
      update: async (id: string, input: Partial<IGame>) => {
        const {
          name,
          slug,
          description,
          thumbnail_game,
          background_image,
          realeased,
          rating
        } = input;

        try {
          const connect = await conn.connect();
          const sql = `UPDATE GAMES
        SET 
          name= IFNULL(?, name), 
          slug= IFNULL(?, slug), 
          description= IFNULL(?,description),
          thumbnail_game= IFNULL(?,thumbnail_game), 
          background_image=IFNULL(? ,background_image), 
          realeased=IFNULL(?,realeased), 
          rating=IFNULL(?,rating)
        WHERE id = uuid_to_bin(?);`;

          const [result] = await connect.query<ResultSetHeader>(sql, [
            name,
            slug,
            description,
            thumbnail_game,
            background_image,
            realeased,
            rating,
            id
          ]);

          if (result.affectedRows > 0) {
            const updatedGame = await this.getById(id);

            if (updatedGame) {
              return updatedGame;
            }
          }
          throw new Error("Failed to update game or game not found");
        } catch (error) {
          throw new Error(`Failed to update game: ${error}`);
        }
      },
      delete: async (id: string): Promise<IGame> => {
        return data;
      },
      getById: async (id: string): Promise<IGame> => {
        try {
          const connect = await conn.connect();

          const sql = `select BIN_TO_UUID(id) as id, name, slug, description, thumbnail_game, background_image, realeased, rating, origin, isdeleted, create_at, update_at  
          from games 
          where id = uuid_to_bin(?) and  isdeleted = false ;`;

          const [game] = await connect.query(sql, [id]);

          return game[0];
        } catch (error) {
          throw new Error(`Error fetching gamesId:, ${error}`);
        }
      }
    });
  }

  async deletedLogic(id) {
    try {
      const connect = await conn.connect();

      const sql = `update games 
      set isdeleted = true
      where id  = uuid_to_bin(?)`;

      const [result] = await connect.query<ResultSetHeader>(sql, [id]);

      if (result.affectedRows > 0) return true;

      return false;
    } catch (error) {
      throw new Error(`Error delete logic games:, ${error}`);
    }
  }

  async getByOneByField(value: string, field: string): Promise<IGame | null> {
    try {
      const connect = await conn.connect();
      let sql = "";
      let params: string[] = [];

      const findElement = {
        id: {
          sql: `select BIN_TO_UUID(id) as id,
               name, slug, description, thumbnail_game, 
               background_image, realeased, rating, origin, 
               isdeleted, create_at, update_at  
               from games 
               where id = uuid_to_bin(?) and  isdeleted = false;`,
          params: [value]
        },
        slug: {
          sql: `select BIN_TO_UUID(id) as id,
               name, slug, description, thumbnail_game, 
               background_image, realeased, rating, origin, 
               isdeleted, create_at, update_at  
               from games 
               where slug = ? and  isdeleted = false;`,
          params: [value]
        },
        name: {
          sql: `select BIN_TO_UUID(id) as id,
               name, slug, description, thumbnail_game, 
               background_image, realeased, rating, origin, 
               isdeleted, create_at, update_at  
               from games 
               where name = ? and  isdeleted = false;`,
          params: [value]
        }
      };
      const query = findElement[field];
      if (!query) {
        return null;
      }

      sql = query.sql;
      params = query.params;

      const [result] = await connect.query<RowDataPacket[]>(sql, params);

      return result[0] as IGame;
    } catch (error) {
      throw new Error(`Error getOne games:, ${error}`);
    }
  }

  static mysqlGame(data: RowDataPacket[]): IGame[] {
    return data.map((row: RowDataPacket) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      thumbnail_game: row.thumbnail_game,
      background_image: row.background_image,
      realeased: row.realeased,
      rating: row.rating,
      origin: row.origin,
      isdeleted: row.isdeleted,
      create_at: row.create_at,
      update_at: row.update_at
    }));
  }
}
