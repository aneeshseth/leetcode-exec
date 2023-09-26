const Docker = require('dockerode');


const docker = new Docker({socketPath: "/var/run/docker.sock"});


const containerOptions = {
    Image: 'node',
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
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
