# WeatherOfkApp

The aim of this very simple Angular project is to experiment cloud deployment process with Jenkins and Docker. 

Jenkins pipeline, that need to be run at Jenkins server, is supposed to build Angular app image with Dockerfile, store it in Dockerhub, connect then to Hetzner cloud server, pull then Docker app image from Dockerhub and run app at Docker container at cloud server.

All relevant credentials (GitHub, DockerHub, Hetzner) should be stored at Jenkins server which can be run via Docker or via installed Jenkins in desktop.

I have run Jenkins server via Docker and Dockerfile for Jenkins is not included in this project repository.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
