import express from "express";
import cors from "cors";
import {
  welcome,
  handlePushNotificationSubscription,
  check_sub,
  unsubscribe,
} from "./util/sub_handler.js";
import { gl } from "./util/logger.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

// todo
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "./client/build")));
} else {
  app.use(express.static(path.join(path.resolve(), "./client/public")));
}

app.post("/check_sub", check_sub);

app.post("/unsubscribe", unsubscribe);

app.post("/subscription", welcome, handlePushNotificationSubscription);

app.listen(process.env.PORT || 3003);
gl.log(`server is running http://localhost:${process.env.PORT}`);
