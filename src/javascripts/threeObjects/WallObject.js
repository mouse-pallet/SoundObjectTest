import * as THREE from 'three';
import PlaneObject from './PlaneObject.js';

class WallObject　extends PlaneObject{

	constructor(posX,posY,posZ){
		super(posX,posY,posZ);

		this.loader = new THREE.TextureLoader();
		this.map = this.loader.load( '../../images/starsky.jpg');


		this.geometry = new THREE.SphereGeometry(this.width, 300,300 );
		this.material = new THREE.MeshBasicMaterial( { map: this.map ,side:THREE.BackSide} );
		// メッシュの作成
		this.floor = new THREE.Mesh(this.geometry, this.material);

		this.floor.receiveShadow = true;//影の有効化
	}	


	getObject(){
		this.floor.position.set(0,-30,-20);
		return this.floor;
	}
}




export default WallObject;