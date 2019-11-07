function calculateWater() {
  document.getElementById("svgOne").innerHTML = "";
  var walls = document.getElementById("wallValue").value;
  var walls = walls.split(",");
  var max = walls.reduce(function(a, b) {
    return Math.max(a, b);
  });
  var j;

  var svgns = "http://www.w3.org/2000/svg";
  for (var x = 0, i = 0; i < walls.length; i++, x += 50) {
    if (walls[i] > 0) {
      for (var y = (max - 1) * 50, j = 0; j < walls[i]; j++, y -= 50) {
        var rect = document.createElementNS(svgns, "rect");
        rect.setAttributeNS(null, "x", x);
        rect.setAttributeNS(null, "y", y);
        rect.setAttributeNS(null, "height", "50");
        rect.setAttributeNS(null, "width", "50");
        rect.setAttributeNS(null, "fill", "black");
        document.getElementById("svgOne").appendChild(rect);
      }
    }
  }

  const left = [];
  const right = [];

  var leftMax = 0;
  var rightMax = 0;

  for (var i = 0, j = walls.length - 1; i < walls.length, j >= 0; i++, j--) {
    left[i] = leftMax;
    leftMax = Math.max(leftMax, walls[i]);

    right[j] = rightMax;
    rightMax = Math.max(rightMax, walls[j]);
  }
  var waterarr = [];
  var total = 0;
  for (var i = 0; i < walls.length; i++) {
    var amount = Math.min(left[i], right[i]) - walls[i];
    waterarr[i] = amount > 0 ? amount : 0;
  }

  var ans = waterarr.reduce((w, v) => w + v, 0);

  for (var x = 0, i = 0; i < walls.length; i++, x += 50) {
    if (waterarr[i] > 0) {
      y = walls[i] > 0 ? (max - walls[i] - 1) * 50 : (max - 1) * 50;
      for (j = 0; j < waterarr[i]; j++, y -= 50) {
        var rect = document.createElementNS(svgns, "rect");
        rect.setAttributeNS(null, "x", x);
        rect.setAttributeNS(null, "y", y);
        rect.setAttributeNS(null, "height", "50");
        rect.setAttributeNS(null, "width", "50");
        rect.setAttributeNS(null, "fill", "blue");
        document.getElementById("svgOne").appendChild(rect);
      }
    }
  }

  document.getElementById("ans").innerHTML = "This amount of water is " + ans;
}
