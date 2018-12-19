var targtime = "2018/12/19 17:29";
//var targtime = "2016/12/29 23:50";

// var sound = new Audio("src/xxx.mp3");

function newyear2017() {
  var APP_NAME = 'New Year 2019';
  var VERSION = '1.2';

  var sprite = $("#sprite > div");
  var event = {
    down: 'mousedown',
    up: 'mouseup',
    move: 'mousemove'
  }
  var pic = {// sprite.property
    width: 300,
    height: 300,
    max: 86, // number of pics
    y0: 0, // base-y
    y: 0 // current-y
  };
  var x0 = 0; // base-mouseX
  var flag = false; // rotate flag (auto)
  var logflag = false;

  function agent_checker() {
    var agent = navigator.userAgent;
    if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1
       || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1) {
      event.down = "touchstart";
      event.up = "touchend";
      event.move = "touchmove";
      window.addEventListener('touchmove', function(e) { e.preventDefault(); }, {passive: false});
      $('#title').html('＼ Swipe Me! ／');
    } else {
      $('#title').html('＼ Drag Me! ／');
    }
  }

  function draw_arrow() {
    var w = pic.height, h = ~~((1.0/3.0)*pic.width);
    $('#arrow_container').html(
      '<canvas id="arrow" width="' + h + '" height="' + w + '"></canvas>'
    );
    var canvas = $('#arrow')[0];
    if ( ! canvas || ! canvas.getContext ) {
      $('#arrow').hide();
      return false;
    }
    // arrow.width, arrow.height, bar.height, head.ratio
    var aw = 0.9, ah = 0.9, bh = 0.4, hr = 1.5;
    var ctx = canvas.getContext('2d');
    var grad = ctx.createLinearGradient(0,0, w,0);
    grad.addColorStop(0, 'rgba(80,80,255,0)');
    grad.addColorStop(1, 'rgba(120,120,255,0.7)');
    ctx.fillStyle = grad;
    ctx.translate(h/2, w/6);
    ctx.rotate(0.5*Math.PI);
    ctx.translate(-h/2, -w/6);
    ctx.beginPath();
    ctx.moveTo(~~(w-0.5*(1-aw)*w), ~~(0.5*h));
    ctx.lineTo(~~(w-0.5*(1-aw)*w - h*ah*hr), ~~(h-0.5*(1-ah)*h));
    ctx.lineTo(~~(w-0.5*(1-aw)*w - h*ah*hr), ~~(h-0.5*(1-bh)*h));
    ctx.lineTo(~~(0.5*(1-aw)*w), ~~(h-0.5*(1-bh)*h));
    ctx.lineTo(~~(0.5*(1-aw)*w), ~~(0.5*(1-bh)*h));
    ctx.lineTo(~~(w-0.5*(1-aw)*w - h*ah*hr), ~~(0.5*(1-bh)*h));
    ctx.lineTo(~~(w-0.5*(1-aw)*w - h*ah*hr), ~~(0.5*(1-ah)*h));
    ctx.closePath();
    ctx.fill();
  }

  function add_hook_event() {
    function get_mousex(e) {
      var t = e.originalEvent.touches;
      return (t ? t[0] : e).screenY;
    }
    $('html').on(event.down, function(e) {
      x0 = get_mousex(e);
      pic.y = 0;
      flag = true;
    });
    $('html').on(event.up, function(e) {
      flag = false;
      pic.y0 = (pic.y0 + pic.y) % (pic.height*pic.max);
    });
    $('html').on(event.move, function(e) {
      var x;
      if (flag) {
        x = get_mousex(e);
        pic.y = (~~(-(x-x0)/20))*pic.height;
        sprite.css('background-position', '0 ' + (pic.y0 + pic.y) + 'px');
        if (pic.y0 + pic.y <= -pic.height*pic.max) {
          $('#title').html('＼ Happy New Year ／');
        }
        if (logflag) {
          $('#log').css('color', '#fff');
          $('#log').html(pic.y0 + pic.y);
        }
      }
    });
  }

  function prep() {
    sprite.css('visibility', 'visible');
    $('#note').show();
    $('#footer').show();
    //sound.play();
  }

  agent_checker();
  draw_arrow();
  prep();
  add_hook_event();
}


function countdown() {
  var title = $('#title');
  var date_NY = (new Date(targtime)).getTime();
  var dt;
  var itv;
  title.css({'margin-top': '100px', 'font-size': '40pt'});
  function zeropad(n) { return ("0" + ~~n).slice(-2); }
  function countdown_1() {
    dt = (date_NY - (new Date().getTime()))/1000;
    if (dt > 0) {
      title.html([~~(dt/3600),
                  zeropad((dt % 3600)/60),
                  zeropad(dt % 60)].join(":"));
    } else {
      clearInterval(itv);
      location.reload();
    }
  }
  itv = setInterval(countdown_1, 1000);
}


$(function() {
  if (new Date().getTime() >= new Date(targtime).getTime()) {
    newyear2017();
  } else {
    countdown();
  }
});
