import MP3Streamer from "mp3streamer";

// https://docs.elevenlabs.io/api-reference/text-to-speech

export default class {
        constructor(options) {
                const {key, voice, latency, format, text, model, voice_settings, ...o} = options;
                const body = ArrayBuffer.fromString(JSON.stringify({
                        text,
                        model_id: model ?? "eleven_monolingual_v1",
                        voice_settings: voice_settings ?? {
                                stability: 0,
                                similarity_boost: 0
                        }
                }));

		//console.log("key, voice, latency, format, text, model, voice_settings:"+key+","+voice+","+latency+","+format+","+text+","+model+","+voice_settings);

                return new MP3Streamer({
                        ...o,
                        http: device.network.https,
                        request: {
                                method: 'POST',
                                headers: new Map([
                                        ["content-type", "application/json"],
                                        ["accept", "audio/mpeg"],
                                        ["xi-api-key", key],
                                        ['content-length', body.byteLength.toString()],
                                ]),
                                onWritable(count) {
                                        this.position ??= 0;
                                        this.write(body.slice(this.position, this.position + count))
                                        this.position += count
                                },
                        },
                        port: 443,
                        host: "api.elevenlabs.io",
                        path: `/v1/text-to-speech/${voice}/stream?optimize_streaming_latency=${latency ?? 0}&output_format=${format ?? 'mp3_44100_128'}`,
                })
        }
}

