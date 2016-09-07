import PlaneObject from './PlaneObject.js';

class Music extends PlaneObject{

	constructor(posX,posY,posZ,music,width,height) {
		super(posX,posY,posZ);
		this.music=music;
		this.AudioContext = window.AudioContext || window.webkit.AudioContext;
		this.audioCtx = new AudioContext();

		this.panner = this.audioCtx.createPanner();
		this.listener = this.audioCtx.listener;

		this.width=width/2;//画面幅
		this.height=height/2;//画面高さ
		this.aspect=height/width;
		console.log("here");
  		this.panner.setPosition(posX/this.width,posY/this.height,posZ/this.aspect);//音源の位置を設定
  	// this.listener.setPosition(Lpos[0],Lpos[1],Lpos[2]);//リスナー位置設定

  }

  getObject(){
  	this.setProperty();
  	this.getData();


  	return　super.getObject();
  }

  
  setProperty(){
  	this.panner.panningModel = 'HRTF';
  	this.panner.distanceModel = 'linear';
  	this.panner.refDistance = 1;
  	this.panner.maxDistance = 100000;
  	this.panner.rolloffFactor = 1;
  	this.panner.coneInnerAngle = 360;
  	this.panner.coneOuterAngle = 0;
  	this.panner.coneOuterGain = 0;
  	// this.panner.setOrientation(1,0,0);

  	this.listener.dopplerFactor = 1;
  	this.listener.speedOfSound = 343.3;
  	this.listener.setOrientation(0,0,-1,0,1,0);

  }


//＊＊＊＊リスナーの位置の初期の値をどこかで与える必要あり。

setlistererPos(lposX,lposY,lposZ){
	this.listener.setPosition(lposX/this.width,lposY/this.height,lposZ/this.aspect);

}

setpannerPos(pposX,pposY,pposZ){
	this.panner.setPosition(pposX/this.width,pposY/this.height,pposZ/this.aspect);
  	// this.panner.setVelocity(0,0,0);
  	super.setPosition(pposX,pposY,pposZ);//オブジェクトの位置も変更
  }


getData() {
	this.source = this.audioCtx.createBufferSource();
	var request = new XMLHttpRequest();

	request.open('GET', this.music, true);

	request.responseType = 'arraybuffer';

    console.log(this);
	request.onload = () => {
        console.log(this);
		var audioData = request.response;
		console.log(audioData);
		this.audioCtx.decodeAudioData(audioData, (buffer) =>{

			var myBuffer = buffer;
			this.source.buffer = myBuffer;

			this.source.connect(this.panner);
			this.panner.connect(this.audioCtx.destination);
			this.source.start(0);
			// this.play();
        // positionPanner();
        // this.source.loop = true;
    },

    function(e){"Error with decoding audio data" + e.err});

	}

	request.send();
}

play(){
	this.source.start(0);
}

stop(){
	this.source.stop(0);
}
  //最後にすべてのpannerとthis.listenerにthisをつける。
}

export default Music;