# Backend API

## Description

Repository of the backend application

```bash
$ git clone https://github.com/<link_repo>
```

## Installation

While the project is cloned, assuming that you have nodejs and npm installed, run the command

```bash
$ npm i
```
This will install the backend project dependencies

## How to run

To be able to run the application you need to have a server mysql running on the port you have specified
in your environment config file.

### Configuration

Create a file called ``.env`` at the root of your project with the following configurations :
```
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=projet_back
DATABASE_NAME=db_projet
DATABASE_LOCAL_PORT=3306
DATABASE_DOCKER_PORT=3306

API_PORT=8080
JWT_SIGN_SECRET=mySecretJwtToken
JWT_ACCESS_EXPIRE_IN=3600
```

Once you've created the file, configure your server mysql. 

If you have docker & docker-compose installed, just run  

```bash
$ docker-composer up -d
```

This will automatically create a server mysql with the configuration provided inside the ``.env`` file we've created before.

Otherwise, you need to install Xamp, or Wampserver, and configure your database manually with the right configuration. 

### Run application

When you've everything configured, you can run the application using the following command:

```bash
$ npm start
```



