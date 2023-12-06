import cors from "cors";

const ACCEPTED_ORIGINS = ["http://localhost:8080"];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    allowedHeaders:
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
    methods: "GET, POST, OPTIONS, PUT, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true // Habilitar el envío de cookies
  });
