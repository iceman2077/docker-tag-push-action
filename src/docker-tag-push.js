const core = require('@actions/core');
const docker = require('./docker');

let sourceImageName;
let targetImageName;

// Get GitHub Action inputs
const processInputs = () => {
  sourceImageName = core.getInput('sourceImageName', { required: true });
  targetImageName = core.getInput('targetImageName');
};

const run = () => {
  try {
    processInputs();
    if (targetImageName) {
      core.info(`Docker tag ${sourceImageName} ${targetImageName}`);
      docker.tag(sourceImageName, targetImageName);
    } else {
      targetImageName = sourceImageName;
    }
    core.info(`Docker image to push: ${targetImageName}`);

    docker.login();
    docker.push(targetImageName);

    core.setOutput('targetImageName', targetImageName);
  } catch (error) {
    core.setFailed(error.message);
  }
};

module.exports = run;
