const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const PORT = process.env.PORT || 3000

let colorGlobal = "#fff";

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log(colorGlobal);
    socket.emit("conn", colorGlobal);

    socket.on("change", (color) => {
        console.log(color);
        colorGlobal = color;
        io.emit("changed", color);
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public" + "/index.html");
});

app.get("/light", (req, res) => {
    res.sendFile(__dirname + "/public" + "/color.html");
});

httpServer.listen(, () => {
    console.log("listening on port 3000");
});
