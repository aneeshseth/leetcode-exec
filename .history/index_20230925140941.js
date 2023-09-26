const Docker = require('dockerode');


const docker = new Docker({socketPath: "/var/run/docker.sock"});


const containerOptions = {
  Image: Dockerfile, 
  AttachStdin: false,
  AttachStdout: true,
  AttachStderr: true,
  Tty: true,
  Cmd: ['/bin/bash'], 
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
