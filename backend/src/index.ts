import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db";
import UserRoutes from "./routes/user";
import TaskRoutes from "./routes/task";
import { expressjwt } from "express-jwt";
import { getAuthUser } from "./middleware/Authentication";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res, next) => {
  res.send("HELLO");
});

app.use(
  "/",
  expressjwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: "/api/register", methods: ["POST"] },
      { url: "/api/login", methods: ["POST"] },
    ],
  }),
  async (req: any, res: any, next: any) => {
    if (req.headers.authorization) {
      req.user = await getAuthUser(req.headers.authorization);
      if (!req.user) {
        return res.status(401).send({
          message: "User not found or unauthorized",
        });
      }
    }
    next();
  }
);

// Custom error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      status: 401,
      message: "No authorization token was found",
    });
  }

  res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
});

// API Routes
app.use("/api", UserRoutes);
app.use("/api", TaskRoutes(io));

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
