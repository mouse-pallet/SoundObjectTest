import * as THREE from 'three';

class MusicObject{
	// 物体を追加する ----------------------------------------
	// ジオメトリーの作成
	//constructor(img,sound,pos){
		//this.img=img;
		//this.sound=sound;
	constructor(pos){
		this.x=pos[0];
		this.y=pos[1];
		this.z=pos[2];

		var geometry = new THREE.CubeGeometry(20, 20, 20); // サイズ設定（x, y, z）
		// マテリアルの作成
		var material = new THREE.MeshPhongMaterial({color: 'orange'});
		// メッシュの作成
		this.cube = new THREE.Mesh(geometry, material);
		this.cube.position.set(this.x, this.y, this.z);
	}	

	setMusic(music){
		this.music=music;
	}

	setImage(img){
		this.img= img;
	}



	getObject(){
		return this.cube;
	}

	setPosition(x,y,z){
		this.cube.position.set(0, 0, 0);  // 位置を設定(x, y, z)	
	}

}

export default MusicObject;
