
int boxsize = 60, save_cycle = 20;
float rspd = 1.0;
Box b;

void setup() {
  size(300,300,P3D);
  colorMode(HSB,360,100,100,100);
  textFont(loadFont("Migu-1C-Bold-48.vlw"));
  textAlign(CENTER, CENTER);
  b = new Box(boxsize, "あけましておめでとうございます！");
}

void draw() {
  background(0);

  translate(width/2, height/2);

  camera(0,-50,100, 0,10,0, 0,1,0);
  ambientLight(10,10,10);
  directionalLight(0,0,100, 0,2,-3);

  b.show();
  savepic();
}


class Box {
  int bsize, face, pface, tz;
  int[] flist = {0, 1, 2, 3};
  float rotangle, cspd;
  String[] str_a;
  Box(int _bsize, String _str) {
    bsize = _bsize;
    str_a = _str.split("");
    str_a = splice(str_a, "", 0);
    str_a = splice(str_a, "", 0);
    tz = (int)(1 + bsize/2);
    pface = 0;
    cspd = 4.0/str_a.length;
  }
  void show() {
    rotangle = rspd*frameCount;
    face = (int)(rotangle/90);
    if (face == str_a.length) exit();

    // box
    rotateY(radians(rotangle % 360));
    noStroke();
    fill((int)(cspd*frameCount) % 360, 40, 90);
    box(bsize, bsize, bsize);

    // year
    stroke(1);
    textSize(16);
    fill(0, 0, 10);
    pushMatrix();
    rotateX(+PI/2);
    text("2017", 0,0,tz);
    popMatrix();

    // text
    textSize(48);
    fill(0, 0, 10);
    for (int i = 0; i <= 3; i++) {
      text(str_a[flist[i] % str_a.length], 0,0,tz);
      rotateY(-PI/2.0);
    }
    if (pface != face) {
      flist[pface % 4] = (flist[pface % 4] + 4) % str_a.length;
      pface = face;
    }
  }
}

void savepic() {
  if(frameCount % save_cycle == 2) {
    save("pic/pic" + nf((int)(frameCount/save_cycle), 4) + ".png");
  }
}
