"use strict";

document.querySelector('#bbsForm').addEventListener('submit', (e) => {
    e.preventDefault();  // フォーム送信によるページ遷移を防止

    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: 'name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'  // URLエンコード形式で送信
        }
    };

    fetch("/post", params)
        .then(response => response.json())
        .then(response => {
            console.log(response);  // レスポンスを表示
            alert("投稿が完了しました！");
            document.querySelector('#name').value = '';  // フォームの内容をリセット
            document.querySelector('#message').value = '';
        })
        .catch(error => {
            console.error("Error posting message:", error);
        });
});
