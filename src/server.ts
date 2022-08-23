import dotenv from "dotenv";
import App from "./app";

dotenv.config();

const app = new App();

// app.ready();

app.listen();

console.log(`🚀  Fastify server running on port ${process.env.PORT}`);
