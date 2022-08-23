import "reflect-metadata";
import fastify,  { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";
import database from "./configurations/knexfile";
import knex from "knex";
import { Model } from "objection";
import { createBullBoard } from "@bull-board/api";
import { Server, IncomingMessage, ServerResponse } from "http";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { FastifyAdapter } from "@bull-board/fastify";
import { EriConfig } from "@configurations/eri";
import CryptoJS from "crypto-js";

dotenv.config();

class App {
  public app: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  public app_domain = "0.0.0.0";
  public app_port = Number(process.env.PORT) || 3000;
  

  constructor() {
    const serverAdapter = new FastifyAdapter();

    this.app = fastify({ logger: true });
    App.database();
    // this.app.register(require("@fastify/cors"), {
    //   origin: ["http://localhost:3000"],
    //   optionsSuccessStatus: 200,
    //   methods: "GET,HEAD,PUT,POST,DELETE",
    // });
    this.app.register(require('@fastify/websocket'), {
      options: { maxPayload: 1048576, clientTracking: true },
    })


    createBullBoard({
      queues: [new BullMQAdapter(EriConfig.queue("invite")), new BullMQAdapter(EriConfig.queue("security-sms"))],
      serverAdapter,
    });

    //serverAdapter.setBasePath('/admin/queues');
    this.app.register(serverAdapter.registerPlugin(), {
      basePath: "/admin/queues",
    });

    this.listen();
    
  }

  private static database() {
    Model.knex(knex(database.development));
  }

  public listen() {
    this.app.listen(this.app_port, this.app_domain, async () => {
      const cipher = CryptoJS.AES.encrypt('yamandegg', EriConfig.key);
      console.log(cipher.toString());
    });
  }
}

export default App;