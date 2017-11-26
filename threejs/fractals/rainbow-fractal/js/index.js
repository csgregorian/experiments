let renderer, scene, camera

let ww = window.innerWidth
let wh = window.innerHeight

function init () {
  renderer = new THREE.WebGLRenderer({canvas: document.getElementById('scene')})
  renderer.setSize(ww, wh)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000)
  camera.position.set(0, 0, 500)
  scene.add(camera)

  generateCubes(4, new THREE.Vector3(0, 0, 0))
  render()
}

const POSITIONS = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, -1, 0),
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0, 0, -1)
]

function generateCubes (level, position) {
  if (level < 1) {
    return
  }
  let size = 3 ** level
  scene.add(createCube(size * 3, position))
  for (let pos of POSITIONS) {
    let newPosition = position.clone().addScaledVector(pos, size * 3)
    scene.add(createCube(size, newPosition))
    generateCubes(level - 1, newPosition)
  }
}

function createCube (size, position) {
  let geometry = new THREE.BoxGeometry(size, size, size)
  let mat = new THREE.MeshNormalMaterial()
  let cube = new THREE.Mesh(geometry, mat)

  cube.position.set(position.x, position.y, position.z)

  return cube
}

let angle = 0
let radius = 500

function render () {
  window.requestAnimationFrame(render)

  angle += 0.01
  camera.position.x = radius * Math.cos(angle)
  camera.position.y = radius * Math.cos(angle)
  camera.position.z = radius * Math.sin(angle)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  renderer.render(scene, camera)
}

init()
