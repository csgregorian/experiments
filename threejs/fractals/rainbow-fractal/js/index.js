var renderer, scene, camera

var ww = window.innerWidth,
  wh = window.innerHeight

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

var generateCubes = (level, position) => {
  if (level < 1) {
    return
  }
  var size = 3 ** level
  scene.add(createCube(size * 3, position))
  for (let pos of POSITIONS) {
    var new_position = position.clone()
    new_position = new_position.addScaledVector(pos, size * 3)
    scene.add(createCube(size, new_position))
    generateCubes(level - 1, new_position)
  }
}

var createCube = function (size, position) {
  var geometry = new THREE.BoxGeometry(size, size, size)
  var mat = new THREE.MeshNormalMaterial()
  var cube = new THREE.Mesh(geometry, mat)

  cube.position.set(position.x, position.y, position.z)

  return cube
}

var angle = 0
var radius = 500

var render = function () {
  requestAnimationFrame(render)

  angle += 0.01
  camera.position.x = radius * Math.cos(angle)
  camera.position.y = radius * Math.cos(angle)
  camera.position.z = radius * Math.sin(angle)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  renderer.render(scene, camera)
}

init()
