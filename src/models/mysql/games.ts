import { BaseRepository } from "@repositories/BaseRespository";

export interface IGame {
  id: string;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;

  platforms?: Platform2[];
  origin?: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface Platform2 {
  id: number;
  name: string;
}

export interface DGame extends IGame {
  description: string;
}

const data = {
  id: "1d6a92b7-94a4-11ee-a5dc-b42e99f91ce3",
  name: "mi primer juego",
  slug: "mi-primer-juego",
  released: "2023-06-31",
  background_image:
    "https://media.rawg.io/media/screenshots/d75/d75bf15ab007368615b155ab1f93b002.jpg",
  rating: 3.56,
  description:
    "If you encounter game crashes, please try updating your graphics card driver. We are sorry to inform you that AMD graphics cards and some earlier released NVIDIA graphics cards may experience crashes when starting the game. You can try updating your graphics card driver to resolve this issue.",
  genres: ["Simulation", "Shooter"]
};

export class GameModel extends BaseRepository<IGame, string> {
  constructor() {
    super({
      getAll: async (): Promise<IGame[]> => {
        return [];
      },
      create: async (input: Partial<IGame>): Promise<IGame> => {
        return data;
      },
      update: async (id: string, input: Partial<IGame>) => {
        return data;
      },
      delete: async (id: string): Promise<IGame> => {
        return data;
      },
      getById: async (id: string): Promise<IGame> => {
        return data;
      }
    });
  }
}
