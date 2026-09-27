'use strict';

const background = document.getElementById("background");
const bgtx = background.getContext('2d');
let particles = [], n = 80, animId = null;

const bgWidth = window.innerWidth;
const bgHeight = window.innerHeight;
background.width = bgWidth;
background.height = bgHeight;
console.log(bgHeight);
//各サイトのURLの左にアイコン
//背景に星動かす
//iPhoneだと下（footer?）に背景がない。主要素は見えてる

function createParticles(n) {
  particles = [];
  for (let i = 0; i < n; i++) particles.push({
    x: Math.random()*bgWidth, 
    y: Math.random()*bgHeight, 
    vx: (Math.random()-0.5)*1.2, 
    vy: (Math.random()-0.5)*1.2, 
    r: Math.random()*2+1
  });
}

function animateParticles() {
  bgtx.clearRect(0, 0, bgWidth, bgHeight);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if(p.x < 0 || p.x > bgWidth) p.vx *= -1;
    if(p.y < 0 || p.y > bgHeight) p.vy *= -1;
    bgtx.beginPath();
    bgtx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    bgtx.fillStyle = "#ffffff";
    bgtx.fill();
  });
  particles.forEach((a, i) => {
    for(let j = i+1; j < particles.length; j++) {
      const b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if(d < 40) {
        bgtx.beginPath();
        bgtx.moveTo(a.x, a.y);
        bgtx.lineTo(b.x, b.y);
        bgtx.strokeStyle = "#ffffff";
        bgtx.lineWidth = 0.5;
        bgtx.stroke();
      }
    }
  });
  animId = requestAnimationFrame(animateParticles);
}
createParticles(n);
animateParticles();
