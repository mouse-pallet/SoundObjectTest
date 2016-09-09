import * as THREE from 'three';

class FairyObject{

	constructor(){

		this.x;
		this.y;
		this.z;

		var loader = new THREE.TextureLoader();

		this.map1 = loader.load('../../images/ageha.png');

		this.geometry = new THREE.PlaneGeometry( 2, 2, 1, 1 );
		this.material = new THREE.MeshLambertMaterial( { map: this.map1,transparent: true,side:THREE.DoubleSide} );
		// メッシュの作成
		this.fairy = new THREE.Mesh(this.geometry, this.material);
		// this.fairy.position.set(0,10,-10);
		this.fairy.rotation.y=-Math.PI;

	}	


	getObject(){
		return this.fairy;
	}

	setPosition(x,y,z){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.x = x;
		this.y = y;
		this.z = z;
		this.fairy.position.set(x, y, z);  // 位置を設定(x, y, z)	
	}

	setPositionXZ(cameraX,cameraZ,objX,objZ){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		// this.x = x;
		// this.y = y;
		// this.z = z;
		// this.fairy.position.set(x, y, z);  // 位置を設定(x, y, z)	


		var dis=Math.sqrt((cameraX-objX)*(cameraX-objX) + (cameraZ-objZ) * (cameraZ - objZ));
	

		// console.log("musicObjects x:" + objX + ",z:" + objZ);
		// console.log("listener x:" + cameraX + ",z:" + cameraZ);

		var fairyX=cameraX - 5*(cameraX-objX)/dis;
		var fairyZ=cameraZ - 5*(cameraZ-objZ)/dis;

		// console.log("fairy x:" + fairyX + ",z:" + fairyZ + ",dis:" + dis);

		this.fairy.position.x = fairyX;	
		this.fairy.position.z = fairyZ;	
	}

	setX(x){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.x = x;
		this.fairy.position.x = x;	
	}

	setY(y){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.y = y;
		this.fairy.position.y = y;	
	}

	setZ(z){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.z = z;
		this.fairy.position.z = z;	
	}

}

export default FairyObject;