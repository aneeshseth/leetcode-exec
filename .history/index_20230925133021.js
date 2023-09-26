const Docker = require('dockerode');
const docker = new Docker();

const portBindings = {
    '80/tcp': [{ HostPort: '8080' }]
};

const pullContainer = async()=>{
    await docker.pull('wordpress', function (err, stream) {
        docker.modem.followProgress(stream, onFinished, onProgress);
    
        function onFinished(err, output) {
            createContainer();
        }
        function onProgress(event) {
            if (event.status === 'Downloading') {
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                process.stdout.write(event.progress);
    
            }else{
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                process.stdout.write(event.status+"\n")
            }
        }
    });
}


pullContainer();