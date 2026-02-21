import { Server } from "@hocuspocus/server";
// (선택) 영속 저장 원하면
// import { SQLite } from "@hocuspocus/extension-sqlite";

const server = new Server({
  port: 1234,

  // extensions: [
  //   new SQLite({ database: "hocuspocus.sqlite" }),
  // ],
});

server.listen();
console.log("Hocuspocus running on ws://127.0.0.1:1234");
