'use strict';

const p = document.getElementById('output');
let btn = document.getElementById('btn');
let div = document.getElementById('result');
let btm = document.documentElement;

// ［表示］ボタンを押したら…
btn.addEventListener('click', () => {
  btn.classList.add('nondisplay')
  div.classList.remove('nondisplay');
  let bottom = btm.scrollHeight - btm.clientHeight;
  window.scroll({
    top: bottom,
    behavior: "smooth"
  });
  //入力結果まとめ
  const result = [0, 0, 0, 0];
  const radio1 = document.getElementsByName('quest1');
  let score = 0;
  for (const btn of radio1) {
    if (btn.checked == true) {
      result[0] = btn.value;
    }
  }
  const radio2 = document.getElementsByName('quest2');
  for (const btn of radio2) {
    if (btn.checked == true) {
      result[1] = btn.value;
    }
  }
  const radio3 = document.getElementsByName('quest3');
  for (const btn of radio3) {
    if (btn.checked == true) {
      result[2] = btn.value;
    }
  }
  const radio4 = document.getElementsByName('quest4');
  for (const btn of radio4) {
    if (btn.checked == true) {
      result[3] = btn.value;
    }
  }
  //アルファベット‐数値変換
  const cal = [0, 0, 0, 0];
  if (result[0] == 'a' || result[0] == 'b') {
    cal[0] = 1;
  } else if (result[0] == 'c') {
    cal[0] = 0.3;
  } else if (result[0] == 'd') {
    cal[0] = 0.2;
  }
  if (result[1] == 'e' || result[1] == 'h') {
    cal[1] = -32;
  } else if (result[1] == 'f' || result[1] == 'g') {
    cal[1] = 32;
  }
  if (result[2] == 'j') {
    cal[2] = -21;
  } else if (result[2] == 'k') {
    cal[2] = -31;
  } else if (result[2] == 'l') {
    cal[2] = -41;
  } else if (result[2] == 'm') {
    cal[2] = -51;
  }
  if (result[3] == 'o') {
    cal[3] = -19;
  } else if (result[3] == 'p') {
    cal[3] = -29;
  } else if (result[3] == 'q') {
    cal[3] = -39;
  } else if (result[3] == 'r') {
    cal[3] = -49;
  }
  //点数計算
  const raw_score = Math.round((100 + cal[1] + cal[2] + cal[3]) * cal[0]);
  if (raw_score > 100) {
    score = 100;
  } else if (raw_score < 0) {
    score = 0;
  } else {
    score = raw_score;
  }
  
  //カウントアップ
  const refresh = Math.round(2000 / score); //カウント時間(ミリ秒)
  var scores = document.getElementById('output');
  scores.setAttribute('data-num', score);
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    counter.innerText = "0";
    const updateCount = () => {
      const target = +counter.getAttribute('data-num');
      const current = +counter.innerText;
      const increment = target / 100;
      if (current < target) {
        counter.innerText = `${Math.ceil(current + increment)}`;
        setTimeout(updateCount, refresh); //更新速度(ミリ秒)
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
  //p.textContent = `${score}％`;

  //Xへの共有
  const share_title = `わたしのワンワン度は...${score}％でした。`;
  const share_twitter = document.getElementById("js-share-twitter");
  share_twitter.setAttribute(
	  "href",
	  "https://twitter.com/share?url=" + "https://shijianzongyi-lang.github.io/wanwan/" + "&text=" + share_title + "&hashtags=ワンワン度診断"
  );
});

document.getElementById('btn2').addEventListener('click', () => {
  window.location.reload();
  window.scroll({
    top: 0,
  });
});