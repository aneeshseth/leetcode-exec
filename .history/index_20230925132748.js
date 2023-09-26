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

const container = await docker.createContainer({
    Image: 'your-image-name',
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    ExposedPorts: { '3000/tcp': {} },
    HostConfig: {
      PortBindings: portBindings
    }
  });//creates the container
  
  await container.start(); //starts the container