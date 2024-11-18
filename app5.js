const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// じゃんけんのルート
app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;
  console.log({ hand, win, total });

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け'; // Draw
  } else if (
    (hand === 'グー' && cpu === 'チョキ') || // グーがチョキに勝つ
    (hand === 'チョキ' && cpu === 'パー') || // チョキがパーに勝つ
    (hand === 'パー' && cpu === 'グー')       // パーがグーに勝つ
  ) {
    judgement = '勝ち'; // Win
    win += 1; // 勝ち数を増やす
  } else {
    judgement = '負け'; // Lose
  }

  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  res.render('janken', display);
});

app.get("/", (req, res) => {
  res.render('index');  // EJSテンプレートをレンダリング
});

app.get("/henken", (req, res) => {
  res.render("henken");  // 占いフォームページ
});

app.post("/henken-result", (req, res) => {
  const userNumber = req.body.userNumber;  // ユーザーが入力した数字を取得
  
  // 数字が1〜100の範囲内か確認
  const num = parseInt(userNumber);
  let fortune = "";  // 結果を格納する変数
  
  if (isNaN(num) || num < 1 || num > 100) {
    fortune = "1〜100の数字を入力してください！";
  } else {
    const randomSeed = num % 10;  // 数字の一部を運勢の決定に使う

    // 運勢を決定
    switch (randomSeed) {
      case 0:
        fortune = "大吉！全てうまくいくでしょう！";
        break;
      case 1:
      case 2:
        fortune = "吉！少しの努力で良い結果が得られます。";
        break;
      case 3:
      case 4:
        fortune = "中吉！着実に進むことで幸運が訪れます。";
        break;
      case 5:
      case 6:
        fortune = "小吉！思わぬところにチャンスが隠れています。";
        break;
      case 7:
      case 8:
        fortune = "末吉！運は少しずつ開けていきます。";
        break;
      case 9:
        fortune = "凶…慎重に行動することをおすすめします。";
        break;
      default:
        fortune = "運勢の結果が読み取れませんでした。";
    }
  }

  // 結果をレスポンスとして返す
  res.render('henken-result', { result: fortune });  // fortune 変数を使用
});




// 年齢入力に応じたメッセージを返すルート
app.get("/age", (req, res) => {
  res.render('age');
});

app.post("/age", (req, res) => {
  const age = parseInt(req.body.age, 10);
  let message = '';

  if (isNaN(age)) {
    message = '年齢を入力してください';
  } else if (age < 20) {
    message = '若いですね！';
  } else {
    message = '大人ですね！';
  }

  res.render('result', { message: message });
});

// 計算機能を追加するルート
app.get("/calculator", (req, res) => {
  res.render('calculator');
});

app.post("/calculator", (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  
  if (isNaN(num1) || isNaN(num2)) {
    res.render('result', { message: '有効な数値を入力してください' });
  } else {
    const sum = num1 + num2;
    res.render('result', { message: `計算結果: ${sum}` });
  }
});
app.get("/", (req, res) => {
  res.render('index');
});


// サーバーの起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
