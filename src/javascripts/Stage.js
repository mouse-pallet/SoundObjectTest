import PlaneObject from './threeObjects/PlaneObject.js';
import FloorObject from './threeObjects/FloorObject.js';
import WallObject from './threeObjects/WallObject.js';
import ImageObject from './threeObjects/ImageObject.js';
import FairyObject from './threeObjects/FairyObject.js';
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
var fairyobject;
var rendercnt=0;
var group;

export function createStage(){

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x292934, 0.03 );//奥行きの色をぼけさせる

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
	var far = 1200;
	 
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
	//環境光
	// 赤い光
	var light = new THREE.AmbientLight(0xffffff);
	scene.add( light );



	 if ( group == null ) {
 		group = new THREE.Object3D();
		scene.add(group);
	}


	// //jasonテスト
	// //オブジェクト
	// var pathLength=40;//道幅
	// for(var i=0;i<100;i++){　
	//     var loader = new THREE.JSONLoader();　
	//     var modelPath = "./model/Tree.json";//書き出したjsonファイル 　　
	//     loader.load(modelPath, function(geo, mat) {　　　
	//       var faceMat = new THREE.MeshFaceMaterial(mat);　　　
	//       var model = new THREE.Mesh(geo, faceMat);　　　
	//       model.position.set(Math.floor(pathLength/2 +Math.random() * width/100), -5, Math.floor( Math.random() * depth - depth/2));　　　
	//       model.scale.set(1, 1, 1);　　　
	//       // scene.add(model);
	//       group.add(model);　
	//       console.log("model:"+typeof(model));　
	//     });
 //    }




	//有象無象の木	
	var tree=[];
	var treeNum =800;//木の本数
	var pathLength=40;//道幅
	// for(var i=0;i<treeNum/2;i++){//道の左右に木を配置　１ループで左右に一本ずつ
	// 	//右
	// 	var treeRX=Math.floor(pathLength/2 +Math.random() * width/100);
	// 	var treeRZ=Math.floor( Math.random() * depth - depth/2);
	// 	// var objR=new PlaneObject(treeRX,0,treeRZ,[width,height,depth]);
	// 	// objR.createObject();
	// 	// objR.setColor('orange');
	// 	var objR = new ImageObject(treeRX,0,treeRZ,[width,height,depth],20,20,"../images/tree5.png");
	// 	scene.add(objR.getObject());
	// 	tree.push(objR);

	// 	//左
	// 	var treeLX=Math.floor( -pathLength/2-Math.random() * width/100);
	// 	var treeLZ=Math.floor( Math.random() * depth - depth/2);
	// 	var objL = new ImageObject(treeLX,0,treeLZ,[width,height,depth],20,20,"../images/tree5.png");
	// 	// var objL=new PlaneObject(treeLX,0,treeLZ,[width,height,depth]);
	// 	objL.createObject();
	// 	objL.setColor('red');
	// 	// scene.add(objL.getObject());
	// 	group.add(objL.getObject());
	// 	tree.push(objL);
	// }

	var groupgeometry = new THREE.Geometry;
	var meshItem = new THREE.Mesh(new THREE.PlaneGeometry( 40,40, 1, 1));

	for(var i=0;i<treeNum/2;i++){//道の左右に木を配置　１ループで左右に一本ずつ


		//右
		var treeRX = Math.floor(pathLength/2 +Math.random() * width/50);
		var treeRY = 10;
		var treeRZ = Math.floor( Math.random() * depth - depth/2);
		var treeRrad = Math.random() * Math.PI * 2;
		meshItem.position.x = treeRX;
		meshItem.position.y = treeRY;
		meshItem.position.z = treeRZ;
		meshItem.rotation.y = treeRrad;
		groupgeometry.mergeMesh(meshItem);

		var treeRX = Math.floor(-pathLength / 2 -Math.random() * width/50);
		var treeRZ = Math.floor( Math.random() * depth - depth/2);
		meshItem.position.x = treeRX;
		meshItem.position.y = treeRY;
		meshItem.position.z = treeRZ;
		meshItem.rotation.y = treeRrad;
		groupgeometry.mergeMesh(meshItem);

	}

	var loader = new THREE.TextureLoader();
	var map = loader.load( "../images/tree5.png");
	
	var groupmaterial = new THREE.MeshPhongMaterial( { map: map,transparent: true,side:THREE.DoubleSide});
	var groupmesh = new THREE.Mesh(groupgeometry,groupmaterial);
	scene.add(groupmesh);



	musicObjects.push(new Music(20,0,0,"../sounds/sample3.mp3",[width,height,depth]));
	musicObjects[0].setColor('blue');
	musicObjects[0].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
	scene.add(musicObjects[0].getObject()); // シーンに追加

    

    //床オブジェクト
	var floorobject = new FloorObject();
	scene.add(floorobject.getObject()); // シーンに追加

	//壁(球)オブジェクト
	var wallobject = new WallObject();
	scene.add(wallobject.getObject()); // シーンに追加

	//妖精オブジェクト
	fairyobject = new FairyObject();
	fairyobject.setPosition(camera.position.x-2,camera.position.y,camera.position.z-5);
	// fairyobject.setPosition(0,0,0);
	scene.add(fairyobject.getObject()); // シーンに追加
}
// 


// レンダリング ----------------------------------------
export function render() {
  // シーンとカメラを渡してレンダリング
  rendercnt+=0.05;
  fairyobject.setPosition(camera.position.x-2,Math.sin(rendercnt*Math.PI/2),camera.position.z-5);
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}



export function cameraMove(x,y,z){
	camera.position.x+=x;
	camera.position.y+=y;
	camera.position.z+=z;


	

	for(var i=0;i<musicObjects.length;i++){
		musicObjects[i].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
	}
	fairyobject.setPosition(camera.position.x-2,camera.position.y,camera.position.z-5);

}

export function cameraRotation(ry){
	camera.rotation.y+=ry;

}

