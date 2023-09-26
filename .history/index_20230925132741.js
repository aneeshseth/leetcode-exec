const Docker = require('dockerode')
const docker = new Docker()
const portBindings = {
    '3000/tcp': [{ HostPort: '8000' }]
};

docker.pull('wordpress', function (err, stream) {
    //...
    docker.modem.followProgress(stream, onFinished, onProgress);

    function onFinished(err, output) {

    }
    function onProgress(event) {

    }
})