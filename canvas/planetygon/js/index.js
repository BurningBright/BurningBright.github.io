var ww, wh, renderer, scene, camera, planet, strokes;

function init() {

  ww = window.innerWidth;
  wh = window.innerHeight;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("scene"),
    antialias: true
  });
  renderer.setSize(ww, wh);
//  renderer.setClearColor(0xe6daf9);
  renderer.setClearColor(0xffffff);
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xe6daf9, 310, 550);

  camera = new THREE.PerspectiveCamera(50, ww / wh, 20, 10000);
  camera.position.set(0, 0, 600);
  scene.add(camera);

  createPlanet();

  requestAnimationFrame(render);
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  ww = window.innerWidth;
  wh = window.innerHeight;

  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();

  renderer.setSize(ww, wh);
}

function createPlanet() {
  planet = new THREE.Object3D();
  scene.add(planet);

  var geometry = new THREE.Geometry();
  for (var x = 0; x < 3500; x++) {
    var lat = 2 * Math.PI * Math.random();
    var long = Math.acos(2 * Math.random() - 1);
    var u = Math.cos(long);
    var pos = {
      x: (Math.random() * 40 + 220) * Math.sqrt(1 - (u * u)) * Math.cos(lat),
      y: (Math.random() * 40 + 220) * Math.sqrt(1 - (u * u)) * Math.sin(lat),
      z: (Math.random() * 40 + 220) * u
    };
    var dest = {
      x: 80 * Math.sqrt(1 - (u * u)) * Math.cos(lat),
      y: 80 * Math.sqrt(1 - (u * u)) * Math.sin(lat),
      z: 80 * u
    };
    var vector = new THREE.Vector3(pos.x, pos.y, pos.z);
    TweenMax.to(vector, Math.random() * 5 + 2, {
      x: pos.x*0.2,
      y: pos.y*0.2,
      z: pos.z*0.2,
      repeat: -1,
      delay: -9,
      yoyo: true,
      ease: Power1.easeIn
    });
    vector.amount = 0;
    geometry.vertices.push(vector);
  }

  var segments = new THREE.Geometry();
  var color, perlin;
  for (var i = geometry.vertices.length - 1; i >= 0; i--) {
    var vector = geometry.vertices[i];
    for (var j = geometry.vertices.length - 1; j >= 0; j--) {
      if (vector.distanceTo(geometry.vertices[j]) < 25 && vector.amount < 6) {
        segments.vertices.push(vector);
        segments.vertices.push(geometry.vertices[j]);
        geometry.vertices[i].amount++;
        geometry.vertices[j].amount++;
        perlin = Math.abs(noise.simplex3(vector.x * 0.005, vector.y * 0.005, vector.z * 0.002));
        color = new THREE.Color("hsl(" + (perlin * 80 + 220) + ", 50%,50%)")
        segments.colors.push(color);
        segments.colors.push(color);
      }
    }
  }

  var material = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors
  });
  strokes = new THREE.LineSegments(segments, material);
  planet.add(strokes);

}

function render(a) {
  requestAnimationFrame(render);

  strokes.geometry.verticesNeedUpdate = true;
  planet.rotation.x += 0.001;
  planet.rotation.y += 0.002;

  renderer.render(scene, camera);
}

init();
