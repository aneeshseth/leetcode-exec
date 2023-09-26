const Docker = require('dockerode');


const docker = new Docker({socketPath: "/var/run/docker.sock"});


const containerOptions = {
    Image: 'node',
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    OpenStdin: false,
    StdinOnce: false
};


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
