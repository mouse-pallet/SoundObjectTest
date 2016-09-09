import * as THREE from 'three';

class FairyObject{
	// 物体を追加する ----------------------------------------
	// ジオメトリーの作成
	//constructor(img,sound,pos){
		//this.img=img;
		//this.sound=sound;
	constructor(){
		var loader = new THREE.TextureLoader();

		this.map1 = loader.load('../../images/ageha.png');

		this.geometry = new THREE.PlaneGeometry( 2, 2, 1, 1 );
		this.material = new THREE.MeshLambertMaterial( { map: this.map1,transparent: true,side:THREE.DoubleSide} );
		// メッシュの作成
		this.cube = new THREE.Mesh(this.geometry, this.material);
		// this.cube.position.set(0,10,-10);
		this.cube.rotation.y=-Math.PI;

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
		console.log("x:"+x+",y:"+y+",z:"+z);
		this.cube.position.set(x, y, z);  // 位置を設定(x, y, z)	
	}

}

export default FairyObject;