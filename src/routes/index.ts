import { readdirSync } from "fs";
import { Router } from "express";

const pathRoute = `${__dirname}`;

const removeExtends = (filename: string) => {
  return filename.split(".").shift();
};

const apiRoute = Router();

readdirSync(pathRoute).forEach((filename) => {
  const routefile = removeExtends(filename);
  if (routefile !== "index") {
    import(`./${routefile}.routes`).then((moduleRouter) => {
      apiRoute.use(`/${routefile}`, moduleRouter.router);
    });
  }
});

export { apiRoute };
