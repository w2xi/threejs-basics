import * as THREE from '../../../node_modules/three/build/three.module.js'
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js'

let canvas = document.querySelector('#c')
let scene, camera, renderer, controls, light
let geometry, material, wireframe, line

init()

function init(){
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  const fov = 70
  const aspect = window.innerWidth / window.innerHeight
  const near = 1
  const far = 100
  
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 2, 6)
  // Notice: 摄像机默认指向Z轴负方向，上方向朝向Y轴正方向
  // 这里需要改变的camera的指向，否则什么也看不见
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  scene.add(new THREE.AxesHelper(6))

  const light = new THREE.DirectionalLight(0xffffff, 1.2)
  light.position.set(1, 6, 6)
  scene.add(light)

  // 盒子
  geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)
  makeInstance(geometry, 0xdc69ff, 0)

  console.log(geometry);

  // 平面圆
  geometry = new THREE.CircleBufferGeometry(.5, 24)
  makeInstance(geometry, 0x44cb76, -1.5)

  // 锥体
  geometry = new THREE.ConeGeometry(.5, 1, 16)
  makeInstance(geometry, 0x54edd2, 1.5)

  // 柱体
  geometry = new THREE.CylinderGeometry(.5, .5, 1, 8)
  makeInstance(geometry, 0xffeb65, -3)

  // 十二面体
  geometry = new THREE.DodecahedronGeometry(.5, 2)
  makeInstance(geometry, 0xfca762, 3)

  // 二十面体
  geometry = new THREE.IcosahedronGeometry(.5, 2)
  makeInstance(geometry, 0x65b8fe, -4.5)

  //八面体
  geometry = new THREE.OctahedronGeometry(.5)
  makeInstance(geometry, 0x4ddfac, 4.5)

  // 2D平面
  geometry = new THREE.PlaneGeometry(1, 1)
  makeInstance(geometry, 0xdc4acf, -6)

  // 中间有洞的 2D 圆盘
  geometry = new THREE.RingGeometry(.2, .5, 10)
  makeInstance(geometry, 0x57c69c, 6)

  // 球体
  geometry = new THREE.SphereGeometry(.5, 10, 10)
  makeInstance(geometry, 0xff87e4, 0, 1.5)

  // 四面体
  geometry = new THREE.TetrahedronGeometry(.5)
  makeInstance(geometry, 0xc758fc, 1.5, 1.5)

  // 圆环体（甜甜圈）
  geometry = new THREE.TorusGeometry(.5, .2, 6, 12)
  makeInstance(geometry, 0x47ce86, -1.5, 1.5)

  // 环形节
  geometry = new THREE.TorusKnotGeometry(.2, .1)
  makeInstance(geometry, 0x94feff, 3, 1.5)

  geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
  geometry = new THREE.EdgesGeometry(geometry)
  material = new THREE.MeshPhongMaterial({ color: 0x666666 })
  line = new THREE.LineSegments( geometry, material );
  line.position.x = -3
  line.position.y = 1.5
  scene.add(line)

  geometry = new THREE.TetrahedronGeometry(.5)
  geometry = new THREE.EdgesGeometry(geometry)
  material = new THREE.MeshPhongMaterial({ color: 0x666666 })
  line = new THREE.LineSegments( geometry, material );
  line.position.x = -4.5
  line.position.y = 1.5
  scene.add(line)

  renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)
  controls = new OrbitControls(camera, canvas)
  controls.update()
}

function makeInstance(geometry, color, x = 0, y = 0){
  const material = new THREE.MeshPhongMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = x
  mesh.position.y = y
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