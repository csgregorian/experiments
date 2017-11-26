let renderer, scene, camera

let ww = window.innerWidth
let wh = window.innerHeight

const GRID_SIZE = 8;

function init () {
  renderer = new THREE.WebGLRenderer({canvas: document.getElementById('scene'), antialias: true})
  renderer.setSize(ww, wh)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000)
  camera.position.set(GRID_SIZE, GRID_SIZE * 2, GRID_SIZE * 2)
  camera.lookAt(new THREE.Vector3(GRID_SIZE/2, GRID_SIZE/2, GRID_SIZE/2))
  scene.add(camera)

  drawGrid()

  render()
}

function drawGrid () {
  let geometry = new THREE.Geometry()
  let vertices
  for (let i = 0; i <= GRID_SIZE; i++) {
    geometry.vertices.push(...[
      new THREE.Vector3(i, 0, 0),
      new THREE.Vector3(i, 0, GRID_SIZE),
      new THREE.Vector3(i, 0, 0),
      new THREE.Vector3(i, GRID_SIZE, 0),
      new THREE.Vector3(0, i, 0),
      new THREE.Vector3(0, i, GRID_SIZE),
      new THREE.Vector3(0, i, 0),
      new THREE.Vector3(GRID_SIZE, i, 0),
      new THREE.Vector3(0, 0, i),
      new THREE.Vector3(0, GRID_SIZE, i),
      new THREE.Vector3(0, 0, i),
      new THREE.Vector3(GRID_SIZE, 0, i),
      new THREE.Vector3(i, GRID_SIZE, 0),
      new THREE.Vector3(i, GRID_SIZE, GRID_SIZE),
      new THREE.Vector3(i, 0, GRID_SIZE),
      new THREE.Vector3(i, GRID_SIZE, GRID_SIZE),
      new THREE.Vector3(GRID_SIZE, i, 0),
      new THREE.Vector3(GRID_SIZE, i, GRID_SIZE),
      new THREE.Vector3(0, i, GRID_SIZE),
      new THREE.Vector3(GRID_SIZE, i, GRID_SIZE),
      new THREE.Vector3(GRID_SIZE, 0, i),
      new THREE.Vector3(GRID_SIZE, GRID_SIZE, i),
      new THREE.Vector3(0, GRID_SIZE, i),
      new THREE.Vector3(GRID_SIZE, GRID_SIZE, i)
    ])
  }

  let material = new THREE.LineBasicMaterial({ color: 0xffffff });
  let line = new THREE.LineSegments(geometry, material);

  scene.add(line);
}

let angle = 0

function render () {
  window.requestAnimationFrame(render)

  angle += 0.01
  camera.position.x = GRID_SIZE * 2 * Math.cos(angle)
  camera.position.z = GRID_SIZE * 2 * Math.sin(angle)
  camera.lookAt(new THREE.Vector3(GRID_SIZE/2, GRID_SIZE/2, GRID_SIZE/2))

  renderer.render(scene, camera)
}

init()
