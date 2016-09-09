import * as THREE from 'three';

class FloorObject{
	// 物体を追加する ----------------------------------------
	// ジオメトリーの作成
	//constructor(img,sound,pos){
		//this.img=img;
		//this.sound=sound;
	constructor(){

		this.map1 = THREE.TextureLoader( '../../images/moss.jpg');

		this.geometry = new THREE.PlaneGeometry( 800, 1200, 1, 1 );
		this.material = new THREE.MeshLambertMaterial( { map: this.map1 } )
		// メッシュの作成
		this.cube = new THREE.Mesh(this.geometry, this.material);
		this.cube.position.set(0,-30,-20);
		this.cube.rotation.x=-Math.PI/2;
		this.cube.receiveShadow = true;//影の有効化
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
		// this.drawObject();
		return this.cube;
	}

	setPosition(x,y,z){
		this.cube.position.set(0, 0, 0);  // 位置を設定(x, y, z)	
	}



	// drawObject(){
	//     var imgFile = [
	//         '../images/moss.jpg'
	//     ];
	 
	//     var canv = document.createElement("canvas");
	//     canv.width = 800;
	//     canv.height = 1200;
	 
	//     var allnum = imgFile.length;
	//     var cnt = 0;
	//     var imgList = [];
	//     for(var i in imgFile){
	//         imgList[i] = new Image();
	//         imgList[i].onload = ()=>
	//         {
	//             if (++cnt == allnum) //画像が全部揃ったらメッシュを作成
	//                 this.drawImage(canv, imgList);
	//         };
	//         imgList[i].onerror = function()
	//         {
	//             if (++cnt == allnum) //画像が全部揃ったらメッシュを作成
	//                 this.drawImage(canv, imgList);
	//         }; 
	//         imgList[i].src = imgFile[i];
	//     }
	// }

	// drawImage(canv, imgList){
	//     var ctx = canv.getContext('2d');
	//     var n = 0;
	//     var ysiz = imgList[n].height;
	//     var xsiz = imgList[n].width;
	//     for(var y = 0; y < canv.height; y += ysiz)
	//     {
	//         for(var x = 0; x < canv.width; x += xsiz)
	//         {
	//             var img = imgList[n++ % imgList.length];
	//             if(img.width > 0)
	//                 //読み込めたやつ
	//                 ctx.drawImage(img, x, y);
	//             else
	//             {
	//                 //読み込めなかったとき
	//                 ctx.fillStyle = "#f0e68c";
	//                 ctx.fillRect(x, y, xsiz, ysiz);
	//                 ctx.fillStyle = "#ff4500";
	//                 ctx.font = "italic bold 20px sans-serif";
	//                 ctx.fillText("no image", x + 80, y + 120);
	//             }
	//         }
	//     }
	     
	//     // テクスチャを作成
	//     var tex = new THREE.Texture(canv);
	//     tex.needsUpdate = true;

	//     this.material = new THREE.MeshLambertMaterial( { map: tex } );
	// 	// メッシュの作成
	// 	this.cube = new THREE.Mesh(this.geometry, this.material);

	// }

}

export default FloorObject;