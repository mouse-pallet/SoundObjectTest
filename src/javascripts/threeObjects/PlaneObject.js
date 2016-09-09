import * as THREE from 'three';

class PlaneObject{
	// 物体を追加する ----------------------------------------
	// ジオメトリーの作成
	//constructor(img,sound,pos){
		//this.img=img;
		//this.sound=sound;
	constructor(posX,posY,posZ){
		this.x=posX;
		this.y=posY;
		this.z=posZ;

		this.geometry = new THREE.CubeGeometry(20, 20, 20); // サイズ設定（x, y, z）
		// マテリアルの作成
		this.material = new THREE.MeshPhongMaterial({color: 'white'});
		// メッシュの作成
		this.cube = new THREE.Mesh(this.geometry, this.material);
		this.cube.position.set(this.x, this.y, this.z);
		this.cube.castShadow = true;
	}	

	// setMusic(music){
	// 	this.music=music;
	// }

	setImage(img){
		this.img= img;
	}

	setColor(color){

		this.material = new THREE.MeshPhongMaterial({color: color});
		this.cube = new THREE.Mesh(this.geometry, this.material);
		this.cube.position.set(this.x, this.y, this.z);

	}



	getObject(){
		return this.cube;
	}

	setPosition(x,y,z){
		this.cube.position.set(0, 0, 0);  // 位置を設定(x, y, z)	
	}

}

export default PlaneObject;