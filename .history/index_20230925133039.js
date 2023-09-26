const Docker = require('dockerode');
const docker = new Docker();

const portBindings = {
    '80/tcp': [{ HostPort: '8080' }]
};



const createContainer = async () => {
    const container = await docker.createContainer({
        Image: 'wordpress',
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        ExposedPorts: { '80/tcp': {} },
        HostConfig: {
          PortBindings: portBindings
        },
        name: 'wordpress-site'
      });

      await container.start();
}


