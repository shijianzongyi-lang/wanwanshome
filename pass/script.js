'use strict';

const p = document.getElementById('output');

document.querySelector('button').addEventListener('click', () => {
  const text = document.getElementById('textInput');
  const report = text.value;

  //日本語の正規表現
  const PJ1 = new RegExp(/受か|合格|うか|ごうかく/);
  const PJ2 = new RegExp(/ません/);
  const PJ3 = new RegExp(/なかっ/);
  const NJ1 = new RegExp(/落ち|不合格|おち|ふごうかく|滑|すべ/);
  //英語の正規表現
  const PE1 = new RegExp(/pass|succeed/);
  const NE1 = new RegExp(/disqualifi|rejected|fail|unsuccessful/)

  //判定する
  let a = 0
  if (PJ1.test(report) == true) {
    if (PJ2.test(report) == true) {
      a = -1;
    } else if (PJ3.test(report) == true) {
      a = -1;
    } else if (NJ1.test(report) == true) {
      a = -1;
    } else {
      a = 1;
    }
  } else if (NJ1.test(report) == true) {
    a = -1;
  } else if (PE1.test(report) == true) {
    a = 2;
  } else if (NE1.test(report) == true) {
    a = -2;
  }

  //反応のリスト
  const a1 = ['合格おめでとう！！', '合格おめでとうございます。貴方様のますますのご発展をお祈り申し上げます。', 'すごい！めっちゃ頑張ったね！！', '合格、誠におめでとうございます。今後一層のご活躍とご健康を祈念いたします'];
  const a2 = ['頑張りは必ず誰かが見ているよ', 'あなたのこれまでの努力は必ず結果につながる', 'どんな結果でも、あなたの価値は変わらない', 'あなたが挑戦した時点で、もうすばらしい']
  const a3 = ['Cogratulations on passing your exams!!', 'Excellent!!', 'Wonderful!!', 'Fantastic!!'];
  const a4 = ['You\'re gonna do fine!', 'It\'s OK, cheer up!', 'I\'m on your side.', 'We\'ll support you anyway we can.']

  //判定後の処理
  const arg = Math.floor(Math.random() * 4);
  //console.log(arg);
  if (a == 1) {
    p.textContent = a1[arg];
  } else if (a == -1) {
    p.textContent = a2[arg];
  } else if (a == 2) {
    p.textContent = a3[arg];
  } else if (a == -2) {
    p.textContent = a4[arg];
  } else {
    setTimeout(() => {
      location.href = 'https://abehiroshi.la.coocan.jp/';
    }, 1000); //1秒待機
    p.textContent = 'ページを移動します. . .';
  }
});