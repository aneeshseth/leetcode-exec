const Docker = require('dockerode');

// Create a new Docker instance
const docker = new Docker();

// Define container options
const containerOptions = {
  Image: 'ubuntu', 
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
