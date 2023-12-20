# SyndiPay

syndiPay is a web-based system for managing monthly payments in a real estate management agency.

## Table of Contents

- [SyndiPay](#SyndiPay)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [1. Installation](#1-installation)
      - [1.1. Clone the repository](#11-clone-the-repository)
      - [1.2. Navigate to the project directory](#12-navigate-to-the-project-directory)
      - [1.3. Install dependencies](#13-install-dependencies)
    - [2. Configuration](#2-configuration)
      - [2.1. Create copy of .env.example file and rename it to .env](#21-create-copy-of-envexample-file-and-rename-it-to-env)
      - [2.2. Update environment variables](#22-update-environment-variables)
    - [3. Seed the roles and admin user](#3-seed-the-roles-and-admin-user)
      - [3.1. Run the seed command](#31-run-the-seed-command)
    - [4. Run the application](#4-run-the-application)
  - [File Structure](#file-structure)
    - [1. Main Directories](#1-main-directories)
    - [2. Clean Architecture Layers](#2-clean-architecture-layers)

## Getting Started

These instructions will help you set up and run the SyndiPay API on your local machine for development and testing purposes.

### 1. Installation

#### 1.1. Clone the repository

```sh
https://github.com/ABRACHE01/SyndiPay-api.git
```

#### 1.2. Navigate to the project directory

```sh
cd SyndiPay-api
```

#### 1.3. Install dependencies

```sh
npm install
```

### 2. Configuration

#### 2.1. Create copy of .env.example file and rename it to .env

```sh
cp .env.example .env
```

#### 2.2. Update environment variables

Update the environment variables in the .env file as needed for your local setup.

### 3. Seed the roles and admin user

#### 3.1. Run the seed command

```sh
npm run db:seed
```

### 4. Run the application

```sh
npm run dev
```

By default, the application will run on port `8080`. If you need to change the port, you can do so in the .env file.

## File Structure

The project structure follows the **Clean Architecture** pattern recommended by Uncle Bob. The Clean Architecture [separates the concerns of software into layers](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), where each layer is independent of the other layers.

### 1. Main Directories

- **src**: This directory contains all the source code of the application.
- **test**: This directory contains all the tests for the application.

### 2. Clean Architecture Layers

All the layers in the Clean Architecture are represented in the `src` directory.

- **Domain**: This layer contains the business logic of the application. It is independent of every other layer.
  - **Entities**: This directory contains all the entities of the application. An entity is a representation of a real-world object in the application. For example, a User entity can represent a real-world user in the application.
- **Application**: This layer contains the application-specific business logic of the application. It is dependent on the Domain layer.
  - **Use Cases**: This directory contains all the use cases of the application. A use case is a specific action that a user can perform in the application. For example, a Login use case can represent the action of a user logging into the application.
  - **Interfaces**: This directory contains all the interfaces of the application. An interface is a contract that defines how the application interacts with the outside world. For example, a Controller interface can define how the application handles incoming HTTP requests.
- **Adapters**: This layer contains all the implementations of the interfaces defined in the Application layer. It is dependent on the Application layer.
  - **Controllers**: This directory contains all the controllers of the application. A controller is responsible for handling incoming HTTP requests and returning the appropriate HTTP response.
  - **Services**: This directory contains all the services of the application. A service is responsible for handling the business logic of the application.
- **infrastucture**: This layer contains all the external dependencies of the application. It is dependent on the Adapters layer.
  - **config**: This directory contains all the configuration files of the application.
  - **databases**: This directory contains all the database-related files of the application.
  - **errors**: This directory contains all the error classes of the application.
  - **gateways**: This directory contains all the gateway classes of the application. A gateway is responsible for communicating with an external system.
  - **helpers**: This directory contains all the helper functions of the application.
  - **packages**: This directory contains the packages related files of the application. For example, the `jwt` package contains all the files related to the JSON Web Token (JWT) package.
  - **repositories**: This directory contains all the repository classes of the application. A repository is responsible for communicating with the database.
  - **webserver**: This directory contains all the web server related files of the application.
- **scripts**: This directory contains all the scripts of the application. A script is a utility that can be run from the command line.


