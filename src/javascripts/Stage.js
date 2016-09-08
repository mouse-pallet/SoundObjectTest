import PlaneObject from './threeObjects/PlaneObject.js';
import FloorObject from './threeObjects/FloorObject.js';
import Music from './threeObjects/Music.js';
import * as THREE from 'three';


var scene;
var width;
var height;
var depth;
var aspect;
var renderer;
var camera;
var musicObjects=[];

export function createStage(){

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xAA9966, 0.015 );//奥行きの色をぼけさせる

	// カメラの作成 ------------------------------------------
	// fov: 画角(視野角)
	var fov = 75;

	height = 600; // 縦幅
	width = 600; // 横幅
	depth=600;
	// aspect: アスペクト比、カメラで撮影したものの縦横比
	aspect = height/width;
	 
	// near： ニアークリップ、 カメラからの撮影開始位置、これより近いものは撮影しない
	var near = 1;
	// far: ファークリップ カメラからの撮影終了位置、これより遠いものは撮影しない
	var far = 300;
	 
	// カメラ作成
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	//カメラ配置
	camera.position.set(0, 0, 30); // (x, y, z)
	console.log(camera.position);

	// レンダラーの追加 ----------------------------------------
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(height, width); // Canvasのサイズ設定
	document.body.appendChild(renderer.domElement);
	 
	// ライティングを設定する ------------------------------------------
	var color = 'white'; // 光の色
	// ライトオブジェクトの作成
	var directionalLight = new THREE.DirectionalLight(color);
	directionalLight.position.set(0, 7, 10); // 光源の角度を設定
	scene.add(directionalLight); // シーンに追加

	scene.add( new THREE.AmbientLight(0x333333) );

	var tree=[];
	var treeNum =200;
	for(var i=0;i<treeNum;i++){
		var treeX=Math.floor( Math.random()*width-width/2) ;
		var treeZ=Math.floor( Math.random() * depth-depth/2 );
		var obj=new PlaneObject(treeX,0,treeZ,'orange');
		scene.add(obj.getObject());
		tree.push(obj);
	}


	musicObjects.push(new Music(40,0,0,'green',"../sounds/sample3.mp3",width,height,depth));
	musicObjects[0].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
	scene.add(musicObjects[0].getObject()); // シーンに追加

    

    //床オブジェクト
	var floorobject = new FloorObject();
	scene.add(floorobject.getObject()); // シーンに追加
}



// レンダリング ----------------------------------------
export function render() {
  // シーンとカメラを渡してレンダリング
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}



export function cameraMove(x,y,z){
	camera.position.x+=x;
	camera.position.y+=y;
	camera.position.z+=z;
	console.log(camera.position.z);


	for(var i=0;i<musicObjects.length;i++){
		musicObjects[i].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
	}
	// renderer.render(scene, camera);
}

export function cameraRotation(rx){
	camera.rotation.x+=rx;

}

