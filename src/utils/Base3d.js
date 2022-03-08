import * as THREE from "three"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
class Base3d {
    constructor(selector) {
        this.container = document.querySelector(selector)
        this.camera 
        this.scene 
        this.model 
        this.contros 
        this.renderer 
        this.init()
        this.amimate()
    }
    init() {
        //初始化场景
        this.initScene()
        //初始化相机
        this.initCamera()
        this.initRenderer()
        this.initContros()
        //添加物体
        this.addMesh()
        window.addEventListener("resize",this.onWindowResize.bind(this))
    }
    initScene() {
        this.scene = new THREE.Scene()
        this.setEnvMap("000")
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 0.25 ,200)
        this.camera.position.set(-1.8, 0.6, 2.7)
    }
    initContros() {
        this.contros = new OrbitControls(this.camera,this.renderer.domElement)
        this.contros.enableDamping = true
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        //设置渲染的像素比
        this.renderer.setPixelRatio(window.devicePixelRatio)
        //设置渲染的尺寸大小
        this.renderer.setSize(window.innerWidth,window.innerHeight)
        //设置渲染的背景颜色
        // this.renderer.setClearColor(new THREE.Color(0xff00ff))
        //色调映射
        this.renderer.toneMapping  = THREE.ACESFilmicToneMapping
        //曝光程度
        this.renderer.toneMappingExposure = 2
        this.container.appendChild(this.renderer.domElement)
        
    }
    //设置环境背景
    setEnvMap(hdr) {
  
        new RGBELoader().setPath("./files/hdr/").load(hdr + ".hdr",(texture)=>{
            // console.log(texture)
            texture.mapping = THREE.EquirectangularReflectionMapping
            this.scene.background = texture
            this.scene.environment = texture

        })
    }
    render() {
        this.renderer.render(this.scene, this.camera)
    }
    amimate() {
        this.renderer.setAnimationLoop(this.render.bind(this))
    }
    setModel(modelName) {
       return new Promise((resolve, reject) => {
            const loader = new GLTFLoader().setPath("./files/gltf/");
            loader.load(modelName ,(gltf)=>{
                console.log(gltf);
                this.model = gltf.scene.children[0]
                this.scene.add(this.model)
                resolve(this.modelName + '添加成功')
            })
       })

    }
    addMesh() {
        this.setModel("detail_awning.glb")
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        // this.render()
    }
}
export default Base3d;