# Packstack

Packstack makes it easy for backpackers to plan their expeditions. At its core, Packstack features a flexible, versatile gear inventory management system that makes building packing lists simple.

Packstack is built with React, Typescript, NodeJS, Docker and Postgres.

The latest release can be found at [Packstack.io](https://packstack.io)

Join us on [Slack](https://join.slack.com/t/packstackio/shared_invite/enQtODY0NDAwNzY3ODQyLWM0NmRhODA3YzAzMzI0ZjkxNTdmNzcyYzcyOWFjYTRhZDE2MDEwZDEwMmJiMGMzNmI3MDhmMDM4MjcyYWQyNDA).

### Getting started

#### Prerequisites
* Git
* Docker
* Yarn

#### Install
* Clone the repo: `git clone https://github.com/maplethorpej/packstack.git`
* Navigate to project root: `cd packstack`
* Copy and rename `docker-compose-example.yml` to `docker-compose.yml`
    * _change configuration if desired_
* Build project: `docker-compose up --build`
* In a new terminal window, install backend packages: `cd api && yarn install`
* Copy and rename: `api/config/config-example.json` to `api/config/config.json`
    * _change configuration if desired_
* Seed categories: `yarn run seed:dev`
* Install frontend packages: `cd ../frontend/ && yarn install`
* Create a `.env` file and add the following line:
    * `REACT_APP_API_DEV="http://127.0.0.1:3000/api/v1/"`
* Start the dev environment: `yarn start`
* View the project locally at `localhost:3001`
* 🎉🙌🤘🙌🎉

__Note__: To stop docker, find the terminal running docker, press `CTRL+C` and run `docker-compose down`.

### Contributing
If you’re interested in contributing to Packstack, thank you! – there’s much yet to be done 🙂

[Learn more about contributing](CONTRIBUTING.md), and make sure to read our [Code of Conduct](CODE_OF_CONDUCT.md).

### Roadmap
* Coming soon
* Coming soon
* Coming soon

### License
[Apache 2.0](LICENSE.txt)
