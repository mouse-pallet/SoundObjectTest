import MusicObject from './MusicObject.js';
import * as THREE from 'three';

var scene;
var width;
var height;
var aspect;
var renderer;
var camera;

export function createStage(){

	scene = new THREE.Scene();

	// カメラの作成 ------------------------------------------
	// fov: 画角(視野角)
	var fov = 75;

	 
	height = 600; // 縦幅
	width = 400; // 横幅
	// aspect: アスペクト比、カメラで撮影したものの縦横比
	aspect = height/width;
	 
	// near： ニアークリップ、 カメラからの撮影開始位置、これより近いものは撮影しない
	var near = 1;
	// far: ファークリップ カメラからの撮影終了位置、これより遠いものは撮影しない
	var far = 1000;
	 
	// カメラ作成
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	//カメラ配置
	camera.position.set(0, 30, 70); // (x, y, z)

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

	var musicobject = new MusicObject([10,-10,5]);
	scene.add(musicobject.getObject()); // シーンに追加
}
// レンダリング ----------------------------------------
export function render() {
  // シーンとカメラを渡してレンダリング
  renderer.render(scene, camera);
}

