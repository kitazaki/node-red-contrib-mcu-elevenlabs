import {Node} from "nodered";
import AudioOut from "pins/audioout";
import ElevenLabsStreamer from "elevenlabsstreamer";
let audio, key, volume;

class Elevenlabs extends Node {
    onStart(config) {
        super.onStart(config);
        //key = String(config.key);
        key = String(config.credentials.key);
        volume = Number(config.volume);
	//console.log("key,volume:"+key+","+volume);

	audio = new AudioOut({});
        audio.enqueue(0, AudioOut.Volume, volume);
        audio.start();
    };
    onMessage(msg, done) {
	//console.log("msg:"+msg.payload);

	new ElevenLabsStreamer({
		key,
		voice: "AZnzlk1XvdvUeBnXmlld",
		latency: 2,
		text: msg.payload,
		audio: {
			out: audio,
			stream: 0
		},
		onError(e) {
			trace("ElevenLabs ERROR: ", e, "\n");
			this.close();
                        done();
		},
		onDone() {
			trace("ElevenLabs Done\n");
			this.close();
			done();
		}
	})

	//this.send(msg);
        //done();
    };
    static type = "mcu_elevenlabs";
    static {
         RED.nodes.registerType(this.type, this)
    };
};

