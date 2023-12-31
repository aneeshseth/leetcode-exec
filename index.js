const Docker = require('dockerode');
const express = require('express')
const app = express()


const docker = new Docker({socketPath: "/var/run/docker.sock"});


app.get("/", async (req,res) => {
    let code = `function sumArray(arr) {
        if (!Array.isArray(arr)) {
          throw new Error('Input is not an array');
        }
      
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
          if (typeof arr[i] === 'number') {
            sum += arr[i];
          }
        }
      
        return sum;
      }
      const numbers = [1, 2, 3, 4, 5];
const result = sumArray(numbers);
console.log(result); // Output: 15

    `
    const container = docker.getContainer("3765d44bc72e")
    container.start(async function (err, data) {
        const addToVolume = await container.exec({ Cmd: ['/bin/sh', '-c', `echo "${code}" > /home/node/app/myfile.txt`], AttachStdin: true, AttachStdout: true });
            const aTVStream = await addToVolume.start()
            aTVStream.on("data", () => {
            })              
            aTVStream.on('end', async () => {
                const exec = await container.exec({ Cmd: ['/bin/sh', '-c', 'cat /home/node/app/myfile.txt'], AttachStdin: true, AttachStdout: true });
                const stream = await exec.start()
                let output = ``;
                stream.on('data', (chunk) => {
                  output += chunk.toString();
                });
                stream.on('end', async () => {
                    output = output.substring(8,output.length - 1)
                    console.log(code)
                    console.log(typeof code)
                    const execCodeInContainer =  await container.exec({ Cmd: ["node", "-e", `${output}`], AttachStdin: true, AttachStdout: true });
                    const streamCode = await execCodeInContainer.start()
                    let codeOutput = '';
                    streamCode.on('data', (chunk) => {
                      codeOutput = codeOutput.replace(/\s/g, '') 
                      codeOutput += chunk.toString()
                    })
                    streamCode.on('end', () => {
                      console.log(codeOutput)
                    })
                })
            })
    })
})



app.listen(3005, () => {
    console.log("running")
})

/*
 output = `function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      const randomNum = getRandomNumber(1, 100);
console.log(randomNum); // This will print a random number between 1 and 100.
      `
      const execCodeInContainer =  await container.exec({ Cmd: ["node", "-e", output], AttachStdin: true, AttachStdout: true });
      const streamCode = await execCodeInContainer.start()
      let codeOutput = '';
      streamCode.on('data', (chunk) => {
        codeOutput = codeOutput.replace(/\s/g, '') 
        codeOutput += chunk.toString()
      })
      streamCode.on('end', () => {
        console.log(codeOutput)
      })





*/



/*

const containerOptions = {
  Image: 'node:latest', 
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

    console.log('Image "node:latest" pulled');


    const cs = docker.getContainer("fa83271ff4ba")
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
    
  }
});

*/
