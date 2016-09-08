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
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(height, width); // Canvasのサイズ設定
	renderer.shadowMapEnabled = true;//陰の有効化
	document.body.appendChild(renderer.domElement);

	 
	// ライティングを設定する ------------------------------------------
	var color = 'white'; // 光の色
	// ライトオブジェクトの作成
	var directionalLight = new THREE.DirectionalLight(color);
	directionalLight.position.set(0, 7, 10); // 光源の角度を設定
	
	directionalLight.castShadow = true; //影の有効化(光源) 
	scene.add(directionalLight); // シーンに追加

	scene.add( new THREE.AmbientLight(0x333333) );

	var tree=[];
	var treeNum =400;
	var pathLength=40;//道幅
	for(var i=0;i<treeNum/2;i++){//道の左右に木を配置　１ループで左右に一本ずつ
		//右
		var treeRX=Math.floor(pathLength/2 +Math.random() * width/4);
		var treeRZ=Math.floor( Math.random() * depth - depth/2);
		var objR=new PlaneObject(treeRX,0,treeRZ,'orange');
		scene.add(objR.getObject());
		tree.push(objR);

		//左
		var treeLX=Math.floor( -pathLength/2-Math.random() * width/4);
		var treeLZ=Math.floor( Math.random() * depth - depth/2);
		var objL=new PlaneObject(treeLX,0,treeLZ,'orange');
		scene.add(objL.getObject());
		tree.push(objL);
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

export function cameraRotation(ry){
	camera.rotation.y+=ry;

}

