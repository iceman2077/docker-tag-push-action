# Docker Tag & Push Action

Tag a Docker image and pushes it to the private registry of your choosing.

## Basic usage

- Ensure you run the [checkout action](https://github.com/actions/checkout) before using this action
- Add the following to a workflow `.yml` file in the `/.github` directory of your repo

```yaml
steps:
  - uses: actions/checkout@v2
    name: Check out code

  - uses: mr-smithers-excellent/docker-build-push@v5
    name: Build & push Docker image
    with:
      image: repo/image
      tags: v1, latest
      registry: registry-url.io
      dockerfile: Dockerfile.ci
      username: ${{ secrets.DOCKER_USERNAME }}
      password: ${{ secrets.DOCKER_PASSWORD }}
```

## Inputs

| Name            | Description                                                      | Required | Type    |
| ------------    | ------------------------------------------                       | -------- | ------- |
| image           | Docker image name                                                | Yes      | String  |
| sourceImageName | Source Docker Image                                              | Yes      | String    |
| targetImageName | Destination Docker image tag (if different from sourceImageName) | No       | String    |
| registry        | Target Docker registry                                           | No       | String  |
| username        | Docker registry username                                         | Yes      | String  |
| password        | Docker registry password or token                                | Yes      | String  |

## Outputs

| Name            | Description                                        | Format                 |
| -------------   | -------------------------------------------------- | ---------------------- |
| pushedImageName | Name of the Docker image that was pushed | `registry/owner/image` |

