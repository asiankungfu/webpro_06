document.addEventListener('DOMContentLoaded', function() {
    // (1) 1つ目のボタン：無名関数を使用して，idがresult1のテキストに
    // "ボタン1が押されました"と表示
    document.getElementById('btn1').addEventListener('click', function() {
      document.getElementById('result1').textContent = "ボタン1が押されました";
    });
  
    // (2) 2つ目のボタン：ラムダ式を使用して，idがresult2のテキストに
    // "ボタン2が押されました"と表示
    document.getElementById('btn2').addEventListener('click', () => {
      document.getElementById('result2').textContent = "ボタン2が押されました";
    });
  
    // (3) 3つ目のボタン：無名関数またはラムダ式を使用して，
    // idがresult1とresult2のテキストの内容をクリア
    document.getElementById('btn3').addEventListener('click', () => {
      document.getElementById('result1').textContent = "";
      document.getElementById('result2').textContent = "";
    });
  });
  