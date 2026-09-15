'use strict';

const storage = sessionStorage;
//const p = document.getElementById('output');
const headcomment = document.getElementById('intro');
const judgebtn = document.getElementById('judgebtn');
const resultdiv = document.getElementById('result');
//let btm = document.documentElement;

const questionList = [ "絵や工作など何かを作り上げるのが好き", "兄弟か姉妹がいる", "空想世界の妄想をするのが好きだ", "好奇心旺盛でいろいろなことに興味を持つ", "ダンスを踊るのが好きだ", "赤ちゃんみたいに甘えん坊だ", "チャーミングな髪形をしている", "宇宙に行った経験がある", "赤いものを身に付けている", "あなたの命の源は雲だ"];
let characterList = [{name: "ワンワン", score: 0, appear: 2, rate: 0, img: "wanwan.png", emoji: "🐶"}, 
  {name: "チョーさん", score: 0, appear: 2, rate: 0, img: "cho.png", emoji: "👨"}, 
  {name: "ぽぅぽ", score: 0, appear: 3, rate: 0, img: "poupo.png", emoji: "👶"}, 
  {name: "うーたん", score: 0, appear: 2, rate: 0, img: "u-tan.png", emoji: "🪇"}, 
  {name: "くぅ", score: 0, appear: 2, rate: 0, img: "kuu.png", emoji: "☁️"}, 
  {name: "おうちゃん", score: 0, appear: 2, rate: 0, img: "ouchan.png", emoji: "👧"}, 
  {name: "ジャンジャン", score: 0, appear: 2, rate: 0, img: "janjan.png", emoji: "🐕"}, 
  {name: "ジャンコ", score: 0, appear: 3, rate: 0, img: "janko.png", emoji: "🐕"}, 
  {name: "ゴットン", score: 0, appear: 2, rate: 0, img: "gotton.png", emoji: "🚂"}];
const relationList = [[0, 1, 5], [6, 7], [1], [0, 2], [5, 6], [2, 3], [4, 7], [3, 8], [2, 7, 8], [4]];
const explainList = ["永遠の５歳", "ワンワンの中の人", "うーたんの遺志を継ぐ者", "２０年間出演の大御所赤ちゃん", "いなばあ黎明期を支えた妖精", "いなばあの人間枠", "ワンワンの幼馴染", "ジャンジャンの双子の妹", "段ボールでできた機関車", "---"];
const commentList = ["ワンワンに似ているあなたは、いつも元気いっぱいでみんなから愛されるムードメーカー。人一倍の好奇心をもっており、創作活動に励むのがとても好きでしょう。ワンワンは１１月にNHKホールでテナーサックスを吹くからぜひ来てね！", 
  "チョーさんに似ているあなたは、空想世界の主人公として日々冒険や戦闘に励んでいることでしょう。その一方でワンワンを３０年以上演じ続けるほどの忍耐力と体力の持ち主。好きなことを極める情熱は誰にも負けません。", 
  "ぽぅぽに似ているあなたは、天真爛漫で自分の感情に素直でしょう。ぽわぽわした癒し系ですが、実は芯が強い一面も。うーたんの後継に関してネット上には批判的なコメントもあがっているけど負けずに頑張ってほしい。", 
  "うーたんに似ているあなたは、「うーたん、元気！元気！」が掛け声でしょう。嬉しい時に頭のマラカスをカラカラ鳴らす姿は周りの人たちの笑顔を誘います。安楽死説などのデマも広まっているけど引退の理由でもある「宇宙旅行」を楽しんでほしい。", 
  "くぅに似ているあなたは、声が高く、目が小さく、髪型はモヒカンでしょう。ちょっぴりおませで、お姉さん・お兄さんぶるのが大好き。両親が共に雲のあなたは、空が快晴の日にちょっぴり寂しく感じていることでしょう。", 
  "おうちゃんに似ているあなたは、弾ける笑顔とアクティブなダンスで周りをパッと明るくしてくれるでしょう。好奇心旺盛で何事にも全力です。人間枠の８代目として伝統も重んじます。", 
  "ジャンジャンに似ているあなたは、キレッキレのダンスを踊ってくれるでしょう。自分の魅せ方をよく知っていて、場を盛り上げるエネルギーは一番です。ただ、ワンワンもジャンジャンもまだ５歳なのに「幼馴染」という紹介には違和感を覚えます。", 
  "ジャンコに似ているあなたは、実はジャンジャンよりしっかり者？要領がよく、状況を冷静に見る観察眼を持っています。JANコードの略みたいな名前だけど、もし弟だったらどんな名前を付けられていたか少し気になります。", 
  "ゴットンに似ているあなたは、みんなをどこへでも連れて行ってくれる面倒見の良さがあり、困ったときに一番頼りにされるでしょう。「ゴットン！ゴットン！」と音を立てて進むあなたの姿は周りに元気を与えます。元気な時ほど頭の煙突が回るのであなたの友達はその時の回転具合に合わせて接し方を変えてくれていることでしょう。", 
  "あなたに似ているキャラクターはいないいないばあっ！の中にはいません。これは悪いことではありません。この地球には８０億人以上の人間がいてそれぞれキャラを持っています。あなたがいないいないばあっ！に登場するどのキャラクターにも似ていないなんて地球規模でみたら当たり前のことです。その個性を大切にこれからも生きてください。あと、適当に全部「あてはまらない」にしないでちゃんと答えてください。", 
  "あなたは、いないいないばあっ！の全てのキャラクターに１００％似ています。だけど、適当に全部「あてはまる」にしたでしょ"];
let tmpResult = [0];
let result = {name: "", rate: 0, index: 0};
/*for(let i = 0; i < relationList.length; i++) {
  console.log(`第${i+1}問目は`)
  for(let j = 0; j < relationList[i].length; j++) {
    console.log(characterList[relationList[i][j]].name);
  }
}*/

//問題文生成
document.querySelectorAll('div[id^="statement"]').forEach(statement => {
  const questNumber = statement.id.match(/\d+$/)[0];//今のid番号
  statement.textContent = questionList[questNumber - 1];
});

//スライダー生成
document.querySelectorAll('div[id^="quest"]').forEach((question) => {
  const slidebox = document.createElement('div');
  slidebox.classList = "slidebox";
  const questNumber = question.id.match(/\d+$/)[0];//今のid番号
  slidebox.innerHTML = `<label class="slidelabel"><input type="range" id="slide${questNumber}" list="values"/></label>
      <div class="values">
        <div class="textNonmatch option">あてはまらない</div>
        <div class="option">-</div>
        <div class="option">ー</div>
        <div class="option">どちらでもない</div>
        <div class="option">ー</div>
        <div class="option">-</div>
        <div class="textMatch option">あてはまる</div>
      </div>`;
  question.appendChild(slidebox);
});
/*
      <datalist id="values">
        <option value="0" label="あてはまらない" class="textNonmatch"></option>
        <option value="16" label="-"></option>
        <option value="32" label="ー"></option>
        <option value="50" label="どちらでもない"></option>
        <option value="68" label="ー"></option>
        <option value="84" label="-"></option>
        <option value="100" label="あてはまる" class="textMatch"></option>
      </datalist>
*/

// ［表示］ボタンを押したら…
judgebtn.addEventListener('click', () => {
  /*---------点数算出----------*/
  document.querySelectorAll('input[id^="slide"]').forEach(slide => {
    const questNumber = slide.id.match(/\d+$/)[0];//今のid番号
    for(let i = 0; i < relationList[questNumber - 1].length; i++) {
      const index = relationList[questNumber - 1][i];
      characterList[index].score += Number(slide.value);//点数を加算
    };
  });
  characterList.forEach(character => {//各キャラ(％)計算
    character.rate = Math.round(character.score / character.appear);
  });
  console.log(characterList);
  for(let i = 1; i < characterList.length; i++) {//最大のrateを探索
    const ratediff = characterList[i].rate - characterList[tmpResult[tmpResult.length - 1]].rate;
    if (ratediff > 0) {
      tmpResult = [i];
    } else if (ratediff == 0) {
      tmpResult.push(i);
    }
  }
  const tmpResultIndex = Math.floor(Math.random() * tmpResult.length);
  console.log(tmpResult);
  const resultIndex = tmpResult[tmpResultIndex];
  //結果を辞書型に格納
  result.name = characterList[resultIndex].name;
  if (characterList[resultIndex].rate == 100) {
    result.rate = 99;
  } else {
    result.rate = characterList[resultIndex].rate;
  }
  result.index = resultIndex;
  console.log(result);
  /*---------[診断]後、表示・非表示にする-------*/
  document.querySelectorAll('div[id^="quest"]').forEach(questbox => {
    questbox.classList.add('nondisplay');
  });
  judgebtn.classList.add('nondisplay');
  setInterval(() => {
    resultdiv.classList.remove('nondisplay');
  }, 1200);
  
  headcomment.textContent = "あなたに一番近いキャラクターは...";
  const avatarimg = document.getElementById("avatarimg");
  const resultName = document.getElementById("character_name");
  const resultExplain = document.getElementById("character_explain");
  const resultRate = document.getElementById("character_rate");
  const resultComment = document.getElementById("character_comment");
  if (tmpResult.length == 9 && result.rate == 0) {//全部０％
    resultName.textContent = explainList[9];
    resultExplain.textContent = explainList[9];
    resultRate.textContent = 0;
    resultComment.textContent = commentList[9];
  } else if (tmpResult.length == 9 && result.rate == 99) {//全部１００％
    resultName.textContent = explainList[9];
    resultExplain.textContent = explainList[9];
    resultRate.textContent = 100;
    resultComment.textContent = commentList[10];
  } else {//その他の割合
    avatarimg.innerHTML = `<img src="${characterList[result.index].img}" width="100%" height="100%">`;
    resultName.textContent = result.name;
    resultExplain.textContent = explainList[result.index];
    resultRate.textContent = result.rate;
    resultComment.textContent = commentList[result.index];
  }
  //rateを降順に並べて生成する
  let sortedList = [...characterList].sort((a, b) => b.rate - a.rate);
  console.log(sortedList);
  const otherList = document.getElementById("otherList");
  for(let i = 0; i < characterList.length; i++) {
    if (sortedList[i].name == result.name) {
      continue;
    }
    const resultcard = document.createElement("div");
    resultcard.classList.add("row");
    resultcard.setAttribute("role", "listitem");
    let editedrate = sortedList[i].rate;
    if(editedrate == 100) {
      editedrate = 99;
    }
    resultcard.innerHTML = `<div class="row-top">
          <span class="row-name"><span class="row-avatar"><img src="${sortedList[i].img}" width="100%" height="100%"></span>${sortedList[i].name}</span>
          <span class="row-percent">${editedrate}<span class="row-percent-text">%</span></span>
        </div>
        <div class="bar-track" role="img" aria-label="${sortedList[i].name}との類似度 ${editedrate}%">
          <div class="bar-fill" style="width:${editedrate}%;"></div>
          <div class="bar-thumb" style="left:${editedrate}%;"></div>
        </div>`;
    otherList.appendChild(resultcard);
  }

  //Xへの共有
  const share_title = `わたしに一番似ているキャラクターは...${result.name}${characterList[result.index].emoji}でした。【一致度${result.rate}％📊】`;
  const share_twitter = document.getElementById("js-share-twitter");
  share_twitter.setAttribute(
	  "href",
	  "https://twitter.com/share?url=" + "https://wanwan0923.jp/inabaa/" + "&text=" + share_title + "&hashtags=いなばあキャラ診断"
  );
});

document.getElementById('btn2').addEventListener('click', () => {
  window.location.reload();
  window.scroll({
    top: 0,
  });
});
