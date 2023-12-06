import fs from "node:fs";
import { Router } from "express";

const pathRoute = `${__dirname}`;

const removeExtends = (filename: string) => {
  return filename.split(".").shift();
};

export const ApiRouter = ({ models }) => {
  const apiRoute = Router();

  fs.readdirSync(pathRoute).forEach((filename) => {
    const routefile = removeExtends(filename);
    if (routefile !== "index" && models) {
      import(`./${routefile}.routes`).then((moduleRouter) => {
        const nameModel = models;
        apiRoute.use(
          `/${routefile}`,
          moduleRouter.createRoute({ model: nameModel })
        );
      });
    }
  });

  return apiRoute;
};
