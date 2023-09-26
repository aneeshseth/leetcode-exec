const Docker = require('dockerode')
const docker = new Docker()
const portBindings = {
    '3000/tcp': [{ HostPort: '8000' }]
};