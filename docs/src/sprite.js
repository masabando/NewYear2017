function sprite() {
  var sprite_container = $("#sprite");
  var sprite = $("#sprite > div");
  var content = $("#content");
  var mousedown_event = 'mousedown', mouseup_event = 'mouseup';
  var move_event = 'mousemove';
  var w = 300;
  var max = 80;
  var x = 0, px = 0;
  var flag = false;
  var c = 0, a = 0;
  var logflag = false;

  function agent_checker() {
    var agent = navigator.userAgent;
    if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1
       || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1) {
      mousedown_event = "touchstart";
      mouseup_event = "touchend";
      move_event = "touchmove";
      // $(window).on('touchmove', function(e) { e.preventDefault(); });
      $('#title').html('Swipe Me!');
    } else {
      $('#title').html('Drag Me!');
    }
  }

  agent_checker();

  $('html').on(mousedown_event, function(e) {
    if (e.originalEvent.touches) {
      px = e.originalEvent.touches[0].screenX;
    } else {
      px = e.screenX;
    }
    flag = true;
  });
  $('html').on(mouseup_event, function(e) {
    flag = false;
    c = (c + a) % (300*80);
  });
  $('html').on(move_event, function(e) {
    if (flag) {
      if (e.originalEvent.touches) {
        x = e.originalEvent.touches[0].screenX;
      } else {
        x = e.screenX;
      }
      a = ~~(-0.6*(x-px)/(w/max))*w;
      sprite.css('background-position', '0 ' + (c + a) + 'px');

      if (logflag) {
        $('#log').css('color', '#fff');
        $('#log').html(c);
      }
    }
  });
}

$(function() {
  sprite();
});
