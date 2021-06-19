import "./style.css"
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from "gsap"

const gui = new dat.GUI();

const guiParams={
    color:0xff0000
}

const size={
    width:window.innerWidth,
    height:window.innerHeight
}
const canvas=document.querySelector(".webgl")

window.addEventListener("resize",()=>{
    size.width=window.innerWidth
    size.height=window.innerHeight
    camera.aspect=size.width/size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width,size.height)
})

const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(55,size.width/size.height,0.01,100)
camera.position.z=3
scene.add(camera)

const controls=new OrbitControls(camera,canvas)

const material=new THREE.MeshNormalMaterial()
gui.add(material,'wireframe')

const fontloader=new THREE.FontLoader()
fontloader.load('fonts/gentilis_regular.typeface.json',(font)=>{
    const textGeo=new THREE.TextBufferGeometry('Surya',{
        font: font,
		size: 0.8,
		height: 0.3,
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5
    })
    textGeo.center()
    const text=new THREE.Mesh(textGeo,material)
    scene.add(text)
    camera.lookAt(text.position)
})

for(let i=0;i<50;++i){
    const torusGeometry = new THREE.TorusBufferGeometry( 0.3,0.2, 16, 32 );
    const torus=new THREE.Mesh(torusGeometry,material)
    scene.add(torus)
    const randomSize=Math.random()
    torus.position.set((Math.random()-0.5)*15,(Math.random()-0.5)*15,(Math.random()-0.5)*15)
    torus.rotation.x=Math.random()*Math.PI
    torus.rotation.y=Math.random()*Math.PI
    torus.scale.set(randomSize,randomSize,randomSize)
    const boxGeometry=new THREE.BoxBufferGeometry(0.5,0.5,0.5)
    const box=new THREE.Mesh(boxGeometry,material)
    scene.add(box)
    box.position.set((Math.random()-0.5)*15,(Math.random()-0.5)*15,(Math.random()-0.5)*15)
    box.rotation.x=Math.random()*Math.PI
    box.rotation.y=Math.random()*Math.PI
    const sphereGeometry=new THREE.SphereBufferGeometry(0.5,32,32)
    const sphere=new THREE.Mesh(sphereGeometry,material)
    scene.add(sphere)
    sphere.position.set((Math.random()-0.5)*15,(Math.random()-0.5)*15,(Math.random()-0.5)*15)
    sphere.rotation.x=Math.random()*Math.PI
    sphere.rotation.y=Math.random()*Math.PI
    sphere.scale.set(randomSize,randomSize,randomSize)
}

const renderer=new THREE.WebGLRenderer({canvas})
renderer.setSize(size.width,size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.render(scene,camera)
gsap.from(camera.position,{x:3,z:5,y:-3,duration:2,delay:0.5,ease: "elastic.out(1,0.3)"})

const clock=new THREE.Clock()
const tick=()=>{
    const elapsedTime=clock.getElapsedTime()
   
    renderer.render(scene,camera)
    controls.update()
    window.requestAnimationFrame(tick)
}
tick()
gui.hide();