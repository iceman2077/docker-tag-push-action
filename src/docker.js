const cp = require('child_process');
const core = require('@actions/core');
const cpOptions = require('./settings');

const login = () => {
  const registry = core.getInput('registry', { required: true });
  const username = core.getInput('username');
  const password = core.getInput('password');
  core.info(`Logging into Docker registry ${registry}...`);
  cp.execSync(`docker login -u ${username} --password-stdin ${registry}`, {
    input: password
  });
};

const tag = (sorceImage, targetImage) => {
  core.info(`Tag sorce image ${sorceImage} to image ${targetImage}`);
  cp.execSync(`docker tag ${sorceImage} ${targetImage}`, cpOptions);
};

const push = imageName => {
  core.info(`Pushing Docker image ${imageName}...`);
  cp.execSync(`docker push ${imageName}`, cpOptions);
};

module.exports = {
  tag,
  login,
  push
};
