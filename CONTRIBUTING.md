# Contribute to LSALab website

We highly appreciate your effort to contribute, you can talk to us or just create a pull request then I will give it a review!!

## Feature Requests

Feature Requests are highly encouraged. Feel free to submit a new one.

## Bugs

We are using [GitHub issues](https://github.com/NTHU-LSALAB/lsalab-web/issues) to manage bugs. We keep a close eye on them. Before filing a new issue, try to ensure your problem does not already exist.

---

## Before Submitting a Pull Request

We will review your pull request and either merge it, request changes, or close it.

## Contribution Prerequisites

-   You have [Node.js](https://nodejs.org/en/) at version >= v14 and <= v16, [Yarn](https://yarnpkg.com/en/) at v1.2.0+, and [Docker](https://www.docker.com/) installed.
-   You are familiar with [Git](https://git-scm.com).

**Before submitting your pull request** make sure the following requirements are fulfilled:

-   Fork the repository and create your new branch from `main`.
-   Run `yarn setup` in the root of the repository.
-   If you've fixed a bug or added code that should be tested, please make sure to add tests
-   Ensure the following test suites are passing:
    -   `yarn test:front`
    -   `yarn test:back`
-   Make sure your code lints by running `yarn lint`.
-   If your contribution fixes an existing issue, please make sure to link it in your pull request.

## Development Workflow

### 1. Fork the [repository](https://github.com/NTHU-LSALAB/lsalab-web)

[Go to the repository](https://github.com/NTHU-LSALAB/lsalab-web) and fork it using your own GitHub account.

### 2. Clone your repository

```bash
git clone git@github.com:YOUR_USERNAME/lsalab-web.git
```

### 3. Install the dependencies

Go to the root of the repository and run the setup:

```bash
cd lsalab-web
yarn setup

```

### 4. Start the application

```bash
# For linux
docker/run.sh
# For MacOS
docker/macos/run.sh
yarn dev
```

### 5. Modify environment variable files

TODO

<!-- Make sure to read the [`getstarted` application README](./examples/getstarted/README.md) for more details. -->

The frontend should now be available at http://localhost:3000/ while the backend at http://localhost:1337

**Awesome! You are now able to contribute to LSALab website.**

### 6. Available commands

-   `yarn build` builds the frontend and administration panel.
-   `yarn setup` installs dependencies.
-   `yarn lint` lints the codebase.
<!-- -   `yarn test:clean` removes the coverage reports. -->
-   `yarn test:front` runs front-end related tests.
-   `yarn test:back` runs the back-end unit tests.

---
