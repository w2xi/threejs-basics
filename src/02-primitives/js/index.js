import * as THREE from '../../../node_modules/three/build/three.module.js'
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js'

let canvas = document.querySelector('#c')
let scene, camera, renderer, controls
let geometry, material, wireframe, line

init()

function init(){
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  const fov = 60
  const aspect = window.innerWidth / window.innerHeight
  const near = 1
  const far = 100
  
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 2, 5)
  // Notice: 摄像机默认指向Z轴负方向，上方向朝向Y轴正方向
  // 这里需要改变的camera的指向，否则什么也看不见
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  scene.add(new THREE.AxesHelper(20))

  const light = new THREE.DirectionalLight(0xffffff, 1.2)
  light.position.set(1, 6, 6)
  scene.add(light)

  geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)
  makeInstance(geometry, 0xdc69ff, 0)

  geometry = new THREE.CircleBufferGeometry(.5, 24)
  makeInstance(geometry, 0x44cb76, -1.5)

  geometry = new THREE.ConeGeometry(.5, 1, 16)
  makeInstance(geometry, 0x54edd2, 1.5)

  geometry = new THREE.CylinderGeometry(.5, .5, 1, 8)
  makeInstance(geometry, 0xffeb65, -3)

  // 十二面体
  geometry = new THREE.DodecahedronGeometry(.5, 2)
  makeInstance(geometry, 0xfca762, 3)

  geometry = new THREE.IcosahedronGeometry(.5, 2)
  makeInstance(geometry, 0x65b8fe, -4.5)

  geometry = new THREE.OctahedronGeometry(.5)
  makeInstance(geometry, 0x4ddfac, 4.5)

  renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)
  controls = new OrbitControls(camera, canvas)
  controls.update()
}

function makeInstance(geometry, color, x = 0){
  const material = new THREE.MeshPhongMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = x
  scene.add(mesh)

  wireframe = new THREE.WireframeGeometry(geometry)
  line = new THREE.LineSegments(wireframe)
  line.material.color.set(0xffffff)
  line.material.opacity = 0.25
  line.material.transparent = true
  mesh.add(line)

  return mesh
}

function animate(time){
  time *= 0.001

  controls.update()
  renderer.render(scene, camera)
}