let renderer, scene, camera

let ww = window.innerWidth
let wh = window.innerHeight

function init () {
  renderer = new THREE.WebGLRenderer({canvas: document.getElementById('scene'), antialias: true})
  renderer.setSize(ww, wh)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000)
  camera.position.set(0, 0, 500)
  scene.add(camera)

  render()
}

let angle = 0
let i = 0
function render () {
  const RADIUS = 500;
  window.requestAnimationFrame(render)

  if (i++ % 10 == 0) {
    while (scene.children.length)
    {
        scene.remove(scene.children[0]);
    }
    generateBars()
  }

  angle += 0.01
  camera.rotation.x = 150
  camera.position.y = -150
  camera.position.z = 250
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  renderer.render(scene, camera)
}

function generateBars () {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let height = Math.random() * 100
      let mesh = buildBar(height)
      mesh.position.x = x * 10 - 50;
      mesh.position.y = y * 10 - 50;
      mesh.position.z = height / 2
      scene.add(mesh)
    }
  }
}


function buildBar (height) {
  

  let geometry = new THREE.BoxGeometry(10, 10, height)
  let material = new THREE.MeshNormalMaterial();
  let mesh = new THREE.Mesh(geometry, material);

  return mesh
}

init()
