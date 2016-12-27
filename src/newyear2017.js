function sprite() {
  var APP_NAME = 'New Year 2017';
  var VERSION = '1.1';

  var sprite = $("#sprite > div");
  var event = {
    down: 'mousedown',
    up: 'mouseup',
    move: 'mousemove'
  }
  var pic = {// sprite.property
    width: 300,
    height: 300,
    max: 80, // number of pics
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
      // $(window).on('touchmove', function(e) { e.preventDefault(); });
      $('#title').html('＼ Swipe Me! ／');
    } else {
      $('#title').html('＼ Drag Me! ／');
    }
  }

  function draw_arrow() {
    var w = pic.width, h = ~~((1.0/3.0)*pic.height);
    $('#arrow_container').html(
      '<canvas id="arrow" width="' + w + '" height="' + h + '"></canvas>'
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
      return (t ? t[0] : e).screenX;
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
        pic.y = ~~(-(x-x0)/20)*pic.height;
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

  agent_checker();
  draw_arrow();
  add_hook_event();
}

$(function() {
  sprite();
});
