# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Installation and setup
Clone the project  repository from github

```
cd client
npm install
ng serve
```

You computer should have installed NodeJS LTS and lastes Angular CLI. To install angular cli globally run the following command.
```
npm install -g @angular/cli
```

## Configuration
To configure the application, find the following file and change necessary api server information
```
src/app/config/config.service.ts
```

## Development server

Run `ng serve` for a dev server.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests


Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

To check code linting. Run `ng lint`

### N.B. To test the client app the backend `server` api must keep running
