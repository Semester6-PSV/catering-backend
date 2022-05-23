function initEvents(client){
    client.on('sample-event', sampleFunction)
}

function sampleFunction(data){
    console.log(data);

}

module.exports = {
    initEvents: initEvents,
    sampleFunction: sampleFunction
}