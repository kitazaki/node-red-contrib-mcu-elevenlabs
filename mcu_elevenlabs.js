module.exports = function(RED) {
    function Elevenlabs(config) {
        RED.nodes.createNode(this,config);
        console.log(config);
    }
    RED.nodes.registerType("mcu_elevenlabs",Elevenlabs, {
        credentials: {
            key: {type:"password"}
        }
    });
}
