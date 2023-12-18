import { RowDataPacket } from "mysql2";
import { IGenre, IPlatform } from "./index";

export const ORIGIN = {
  database: "BD",
  api: "API"
} as const;

export interface IGame {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail_game: string | null;
  background_image: string;
  realeased: string;
  rating: number;
  origin: string;
  isdeleted: boolean;
}

export interface WithRelationGame extends IGame {
  genders: IGenre[];
  platforms: IPlatform[];
}
