var c = document.getElementById('canv');
var $ = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var _w = w * 0.5;
var _h = h * 0.5;
var num = 80;
var hearts = [];
var u = 0;
for (var i = 0; i < num; i++) {
  var heart = new Heart(_w + rnd(-w, w),
    _h + rnd(-h, h), rnd(20, 145), 'heart');
  hearts.push(heart);
}
fallen();

function fallen() {
  u -= .2;
  window.requestAnimationFrame(fallen);
  $.globalCompositeOperation = 'source-over';
  var g_ = $.createLinearGradient(c.width + c.width, c.height + c.height * 1.5, c.width + c.width, 1);
  g_.addColorStop(0, 'hsla(253, 5%, 95%, 1)');
  g_.addColorStop(0.5, 'hsla(253, 75%, 20%, 1)');
  g_.addColorStop(1, 'hsla(0, 0%, 5%, 1)');
  $.fillStyle = g_;
  $.fillRect(0, 0, c.width, c.height);
  $.globalCompositeOperation = 'difference';
  var t = "Alla ".split("").join(String.fromCharCode(0x2004));
  var t2 = "I love утенок".split("").join(String.fromCharCode(0x2004));
  $.font = "2.5em Sonsie One";
  $.fillStyle = 'hsla(' + u + ',85%,50%,.2)';
  $.fillText(t, (c.width - $.measureText(t).width) * 0.5, c.height * 0.45);
  $.fillText(t2, (c.width - $.measureText(t2).width) * 0.5, c.height * 0.58);
  $.font = "1em Sonsie One";
  $.fillStyle = 'hsla(253, 85%, 20%, 1)';
  var t3 = "#AllMyLoveToBrussels".split("").join(String.fromCharCode(0x2004));

  $.fillText(t3, (c.width - $.measureText(t3).width) * 0.8, c.height * 0.9);
  $.font = ".85em Sonsie One";
  $.fillStyle = 'hsla(253, 90%, 20%, 1)';
  var t4 = "Dedicated To All Victims Of Terror".split("").join(String.fromCharCode(0x2004));
  $.fillText(t4, (c.width - $.measureText(t4).width) * 0.83, c.height * 0.95);

  for (var i = 0; i < hearts.length; i++) {
    hearts[i].move();
    hearts[i].render($);
  }
}

function Heart(x, y, sz, _heart) {
  this.x = x || w;
  this.y = y || h;
  this.dy = sz / 100;
  this.sz = sz || 100;
  this._heart = _heart || 'heart';
  this.hue = Math.random() * 360;
  this.move = function() {
    this.y += this.dy;
    if (this.y > h + this.sz) {
      this.y -= h + this.sz * 2;
    }
  };
  this.render = function($) {
    var g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
    g.addColorStop(0, 'hsla(' + this.hue + ',100%,50%,1)');
    g.addColorStop(1, 'hsla(0,0%,0%,0)');
    $.beginPath();
    $.fillStyle = g;
    $.moveTo(this.x, this.y);
    this.hue += 0.3;
    if (this.hue > 359) this.hue = 0;
    var path;
    switch (this._heart) {
      case 'heart':
        path = [
          [-0.00417, -0.25796, -0.44345, -0.29936, -0.49702, 0],
          [-0.54762, 0.30254, -0.08333, 0.5, 0, 0.79618],
          [0.08333, 0.5, 0.54762, 0.30254, 0.49702, 0],
          [0.44345, -0.29936, 0.0417, -0.25796, 0, 0]
        ];
        break;
      default:
        break;
    }
    for (var i = 0; i < path.length; i++) {
      $.bezierCurveTo(path[i][0] * this.sz + this.x, path[i]
        [1] * this.sz + this.y, path[i]
        [2] * this.sz + this.x, path[i]
        [3] * this.sz + this.y, path[i]
        [4] * this.sz + this.x, path[i]
        [5] * this.sz + this.y);
    }
    $.closePath();
    $.fill();
  };
}

function rnd(min, max) {
  return Math.random() * (max - min) + min;
}
window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
});