"use strict";
const express = require("express");
const app = express();
const path = require("path");

let todoList = [];  // To-Doリストの管理用配列
app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname, "public")));  // 静的ファイルの設定
app.use(express.urlencoded({ extended: true }));

// フロントエンドのHTMLファイルを提供
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
 // To-DoリストのHTMLファイル
});

// その他のエンドポイント
app.post("/check", (req, res) => {
  res.json({ number: todoList.length });
});

app.get("/read", (req, res) => {
  const start = Number(req.query.start);
  console.log(`Received request for /read with start: ${start}`);  // ログ出力
  if (start === 0) {
    res.json({ tasks: todoList });
  } else {
    res.json({ tasks: todoList.slice(start) });
  }
});

app.post("/post", (req, res) => {
  const task = req.body.task;
  const dueDate = req.body.dueDate;  // 期限を受け取る
  todoList.push({ task, dueDate });
  res.json({ number: todoList.length });
});


// サーバーをポート8080で起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
