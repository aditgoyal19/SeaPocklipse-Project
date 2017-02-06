/**
 * 
*
 * *
 * *Class - AudioComponent: This class sets various properties for the audio object that is created in myAudioEngine class

                  Method Summary   : 1.   ctor()             :   Constructor function
                                     2.   setBuffer()        :   Setting of Buffer
                                     3.   play()             :   Play Function Called From myAudioEngine wrapper Function PlayMusic given the offset of audio and bool value specifying to play loop
                                     4.   getPlaying()       :   Function used to know whether the track is being played or not
                                     5.   stop()             :   Used to Stop the playing of sound
                                     6.   _stopOfWebAudio()  :   Called from the Stop function play function to stop the Music
                                     7.   pause()            :   To pause the sound being played
                                     8.   _pauseOfWebAudio() :   Called from various functions to Pause the sound being Played
                                     9.   cloneNode()        :   Called from the Stop function play function to stop the Music
                                     10.  setVolume()        :   To set the volume of the sound to be played
                                     11.  getVolume()        :   returns the volume of Sound being played



 Class - myAudioEngine: This Class will provide the Audio component for the project by calling the Webaudio calls to play music and effects


                 Method Summary   : 1.  cloneNode()             :   This functions clones the sound when playing multiple instances for same sound such as Explosio events, shootiing events etc.
                                    2.  load()                  :   loading and caching of the Url is done here
                                    3.  loadAudioFromExtList()  :   Loading of the Url from the Existing Cache
                                    4.  playMusic()             :   It takes the Url to be played and also the Loop boolean whether to play or not
                                    5.  stopMusic()             :   Called to stop the music
                                    6.  getMusicVolume()        :   To know the Volume of the Music being Played
                                    7.  setMusicVolume()        :   To set up the volume of the music
                                    8.  playEffect()            :   Same as playmusic but used for playing effect
                                    9.  pauseEffect()           :   Used to Pause the Effect
                                    10.  stopEffect()           :   To stop the Effect which is being played

  *
 *
 *
 *
 */

var myAudioEngine;
var AudioComponent=cc.Class.extend({

    volume:1,
    _loop:false,
    src:null,
    _touch:false,

    _playing: false,
    _AUDIO_TYPE: "WEBAUDIO",
    _pause: false,

     //Web Audio
     _buffer: null,
     _currentSource: null,
     _startTime: null,
     _currentTime: null,
     _context: null,
     _volume: null,

     _ignoreEnded: false,

/*
* Constructor Function
* */

    ctor:function(context,volume,url)
    {
        context && (this._context = context); // if context is not null or undefined _context will get set
        volume && (this._volume = volume);
        if(context && volume){
        this._AUDIO_TYPE = "WEBAUDIO";
        }
        this.src = url;

    },

    _setBufferCallback: null,


    /*
    * Setting of Buffer
    * */
    setBuffer: function(buffer){

            if(!buffer) return;

             var playing = this._playing;

             this._AUDIO_TYPE = "WEBAUDIO";

             if(this._buffer && this._buffer != buffer && this.getPlaying()) {
                 this.stop();
             }
             this._buffer = buffer;

            if(playing) {
                this.play();
            }
             this._volume["gain"].value = this.volume;
             this._setBufferCallback && this._setBufferCallback(buffer);
         },

/*
* Play Function Called From myAudioEngine wrapper Function PlayMusic
* given the offset of audio and bool value specifying to play loop
* */
    play:function(offset,loop)

    {
        this._playing=true;
        this.loop = loop === undefined ? this.loop : loop;

        var cs = this._currentSource;
        if (!this._buffer) {
            return;
        }
        if (!this._pause && cs) {
            if (this._context.currentTime === 0 || this._currentTime + this._context.currentTime - this._startTime > this._currentSource.buffer.duration)
                this._stopOfWebAudio();
            else
                return;
        }

        var audio = this._context["createBufferSource"]();
        audio.buffer = this._buffer;
        audio["connect"](this._volume);
        audio.loop = this.loop;
        this._startTime = this._context.currentTime;
        this._currentTime = 0;

        if(audio.start){
            audio.start(0,offset||0);
        }

        this._currentSource=audio;
        var self = this;
        audio["onended"] = function(){
            if(self._ignoreEnded){
                self._ignoreEnded = false;
            }
            else{
                self._playing = false;
            }
        };

    },


    /**
     * Function used to know whether the track is being played or not
     *
     * */
    getPlaying:function()
    {
        if(!this._playing){
            return this._playing;
        }

         var sourceNode = this._currentSource;
         if(!this._playing && !sourceNode)
                 return true;

    },
/*
* Used to Stop the playing of sound
* */
    stop: function(){
                 this._playing = false;

                         this._stopOfWebAudio();

             },
/*
* Called from the Stop function play function to stop the Music
* */
    _stopOfWebAudio: function(){
                 var audio = this._currentSource;
                 this._ignoreEnded = true;
                 if(audio){
                         audio.stop(0);
                         this._currentSource = null;
                     }
             },

/*
* To pause the sound being played
* */
    pause: function(){
                 this._playing = false;
                 this._pause = true;

                 this._pauseOfWebAudio();

             },
/*
* Called from various functions to Pause the sound being Played
* */
    _pauseOfWebAudio: function(){
         this._currentTime += this._context.currentTime - this._startTime;
         var audio = this._currentSource;
         if(audio){
                 audio.stop(0);
             }
    },
    /**
     * To set the volume of the sound to be played
     * */
    setVolume: function(volume){
         if(volume > 1) volume = 1;
         if(volume < 0) volume = 0;
         this.volume = volume;
         if(this._AUDIO_TYPE === "WEBAUDIO"){

                 if(this._volume){
                         this._volume["gain"].value = volume;
                     }
             }
    },
/*
* returns the volume of Sound being played
* */
    getVolume: function(){
                 return this.volume;
             },
/*
* This functions clones the sound when playing multiple instances for same sound such as Explosio events, shootiing events etc.
*
* **/
    cloneNode: function(){
        var audio, self;


            var volume = this._context["createGain"]();
            volume["gain"].value = 1;
            volume["connect"](this._context["destination"]);
            audio = new AudioComponent(this._context, volume, this.src);
            if(this._buffer){
                audio.setBuffer(this._buffer);
            }else{
                self = this;
                this._setBufferCallback = function(buffer){
                    audio.setBuffer(buffer);
                    self._setBufferCallback = null;
                };
            }

        audio._AUDIO_TYPE = this._AUDIO_TYPE;
        return audio;
    }
});

(function(polyfill){

    var SWA = polyfill.webAudio,
        SWB = polyfill.multichannel,
        SWC = polyfill.auto;

    var support = [];
/*
* Making of the list of extension and the codecs used for playing the sound
* **/
    (function(){
        var audio = document.createElement("audio");
        if(audio.canPlayType) {
            var ogg = audio.canPlayType('audio/ogg; codecs="vorbis"');
            if (ogg && ogg !== "") support.push(".ogg");
            var mp3 = audio.canPlayType("audio/mpeg");
            if (mp3 && mp3 !== "") support.push(".mp3");
            var wav = audio.canPlayType('audio/wav; codecs="1"');
            if (wav && wav !== "") support.push(".wav");
            var mp4 = audio.canPlayType("audio/mp4");
            if (mp4 && mp4 !== "") support.push(".mp4");
            var m4a = audio.canPlayType("audio/x-m4a");
            if (m4a && m4a !== "") support.push(".m4a");
        }
    })();
    try{
        /*
        * Initializing of the WebAudio Context variable for the Browser
        * **/
        if(SWA){
            var context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
        }
    }catch(error){
        SWA = false;
        cc.log("browser don't support webAudio");
    }
/*
Used for maintaining the Cache for the Urls Played and Also Load the Url after checking the support for extension and codecs
It Creates the object from our audioComponent Class of Webaudio and connect it to the destination(Speaker)

* **/
    var loader = {

        cache: {},
/*
* loading and caching of the Url is done here
* **/
        load: function(realUrl, url, res, cb){

            if(support.length === 0)
                return cb("can not support audio!");

            var i;

            var extname = cc.path.extname(realUrl);

            var typeList = [extname];
            for(i=0; i<support.length; i++){
                if(extname !== support[i]){
                    typeList.push(support[i]);
                }
            }

            var audio;

            if(loader.cache[realUrl])
                return cb(null, loader.cache[realUrl]);

            if(SWA){
                var volume = context["createGain"]();
                volume["gain"].value = 1;
                volume["connect"](context["destination"]);
                audio = new AudioComponent(context, volume, realUrl);
            }else{
                audio = new AudioComponent(null, null, realUrl);
            }

            this.loadAudioFromExtList(realUrl, typeList, audio, cb);

            loader.cache[realUrl] = audio;

        },
/*
* Loading of the Url from the Existing Cache
* **/
        loadAudioFromExtList: function(realUrl, typeList, audio, cb){

            if(typeList.length === 0){
                var ERRSTR = "can not found the resource of audio! Last match url is : ";
                ERRSTR += realUrl.replace(/\.(.*)?$/, "(");
                support.forEach(function(ext){
                    ERRSTR += ext + "|";
                });
                ERRSTR = ERRSTR.replace(/\|$/, ")");
                return cb(ERRSTR);
            }

            realUrl = cc.path.changeExtname(realUrl, typeList.splice(0, 1));

            if(SWA){//Buffer
                if(polyfill.webAudioCallback)
                    polyfill.webAudioCallback(realUrl);
                var request = new XMLHttpRequest();
                request.open("GET", realUrl, true);
                request.responseType = "arraybuffer";

                // Our asynchronous callback
                request.onload = function () {
                    context["decodeAudioData"](request.response, function(buffer){
                        //success
                        audio.setBuffer(buffer);
                        cb(null, audio);
                    }, function(){
                        //error
                        loader.loadAudioFromExtList(realUrl, typeList, audio, cb);
                    });
                };
                request.send();
            }


        }
    };
    cc.loader.register(["mp3", "ogg", "wav", "mp4", "m4a"], loader);


/*
* Wrapper to call the Functions of Audio component class
* */
    myAudioEngine ={
        _currMusic: null,
        _musicVolume: 1,
/*
*
* It takes the Url to be played and also the Loop boolean whether to play or not
* */
        playMusic: function(url, loop){
            var bgMusic = this._currMusic;
            if(bgMusic && bgMusic.src !== url && bgMusic.getPlaying()){
                bgMusic.stop();
            }
            var audio = loader.cache[url];
            if(!audio){
                cc.loader.load(url);
                audio = loader.cache[url];
            }
            audio.play(0, loop);
            audio.setVolume(this._musicVolume);
            this._currMusic = audio;
        },

/**
 * Called to stop the music
 *
 * */
        stopMusic: function(releaseData){
            var audio = this._currMusic;
            if(audio){
                audio.stop();
                if (releaseData)
                    cc.loader.release(audio.src);
            }
        },

        /*
        * To know the Volume of the Music being Played
        *
        * **/
        getMusicVolume: function(){
            return this._musicVolume;
        },
/**
 * To set up the volume of the music
 * */
        setMusicVolume: function(volume){
            volume = volume - 0;
            if(isNaN(volume)) volume = 1;
            if(volume > 1) volume = 1;
            if(volume < 0) volume = 0;

            this._musicVolume = volume;
            var audio = this._currMusic;
            if(audio){
                audio.setVolume(volume);
            }
        },

        _audioPool: {},
        _maxAudioInstance: 5,
        _effectVolume: 1,
/**
 * Same as playmusic but used for playing effect
 *
 * */
        playEffect: function(url, loop){


            var effectList = this._audioPool[url];
            if(!effectList){
                effectList = this._audioPool[url] = [];
            }

            var i;

            for(i=0; i<effectList.length; i++){
                if(!effectList[i].getPlaying()){
                    break;
                }
            }

            if(effectList[i]){
                audio = effectList[i];
                audio.setVolume(this._effectVolume);
                audio.play(0, loop);
            }else if(!SWA && i > this._maxAudioInstance){
                cc.log("Error: %s greater than %d", url, this._maxAudioInstance);
            }else{
                var audio = loader.cache[url];
                if(!audio){
                    cc.loader.load(url);
                    audio = loader.cache[url];
                }
                audio = audio.cloneNode();
                audio.setVolume(this._effectVolume);
                audio.loop = loop || false;
                audio.play();
                effectList.push(audio);
            }

            return audio;
        },

        /**
         * Used to Pause the Effect
         *
         * */
        pauseEffect: function(audio){
            if(audio){
                audio.pause();
            }
        },

        /**
         * To stop the Effect which is being played
         * */
        stopEffect: function(audio){
            if(audio)
                audio.stop();
        }
   }


})(cc.__audioSupport);



