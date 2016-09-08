import * as THREE from 'three';

class FloorObject{
	// 物体を追加する ----------------------------------------
	// ジオメトリーの作成
	//constructor(img,sound,pos){
		//this.img=img;
		//this.sound=sound;
	constructor(){
		var map1 = THREE.ImageUtils.loadTexture( '../images/moss.jpg' );
		this.geometry = new THREE.PlaneGeometry( 800, 1200, 40, 60 );
		this.material = new THREE.MeshLambertMaterial( { map: map1 } )
		// メッシュの作成
		this.cube = new THREE.Mesh(this.geometry, this.material);
		this.cube.position.set(0,-30,-10);
		this.cube.rotation.x=-Math.PI/2;
	}	

	// setMusic(music){
	// 	this.music=music;
	// }

	setImage(img){
		this.img= img;
	}

	setColor(){

		this.material = new THREE.MeshPhongMaterial({color: 'green'});
		// メッシュの作成
		this.cube = new THREE.Mesh(this.geometry, this.material);

	}



	getObject(){
		return this.cube;
	}

	setPosition(x,y,z){
		this.cube.position.set(0, 0, 0);  // 位置を設定(x, y, z)	
	}

}

export default FloorObject;