import express from "express";
import expressWs from "express-ws";
import http from "http";
import cors from "cors"

export const app = express();
export const server = http.createServer(app);

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const wssInstance = expressWs(app, server).getWss();
