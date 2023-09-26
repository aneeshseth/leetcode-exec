const Docker = require('dockerode');


const docker = new Docker({socketPath: "/var/run/docker.sock"});




const containerOptions = {
  Image: 'node:latest', // Specify the image with a tag
  AttachStdin: false,
  AttachStdout: true,
  AttachStderr: true,
  Tty: true,
  OpenStdin: false,
  StdinOnce: false,
};

docker.pull(containerOptions.Image, (err, stream) => {
  if (err) {
    console.error('Error pulling image:', err);
    return;
  }

  docker.modem.followProgress(stream, onFinished, onProgress);

  function onFinished(err) {
    if (err) {
      console.error('Error pulling image:', err);
      return;
    }

    console.log('Image "node:latest" pulled successfully.');

    // Now, create and start the container
    docker.createContainer(containerOptions, (err, container) => {
      if (err) {
        console.error('Error creating container:', err);
        return;
      }

      container.start((err, data) => {
        if (err) {
          console.error('Error starting container:', err);
          return;
        }

        console.log('Container ID:', container.id);
      });
    });
  }

  function onProgress(event) {
    // You can handle progress events here if needed
  }
});

