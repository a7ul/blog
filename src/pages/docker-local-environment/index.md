---
title: 🐳 Simplified guide to using Docker for local development environment
date: 2019-03-26T17:11:03.284Z
keywords: docker, local, development, environment, guide, javascript
featuredImage: architecture.svg
---

I recently started working at <a href="https://anyfin.com/en" target="_blank">Anyfin</a>. As a new engineer on the team, I had to setup the entire development environment. Drawing my expectations from my previous work engagements I thought this would take me a couple of days. But to my surprise I had a working setup of quite a few backend services written in NodeJS, Golang and Python along side the web site and portal (Javascript) in ~5hrs.
This post will explain on how we use Docker at Anyfin to setup a productive local development environment quite easily. I have seen such attempts at my previous workplaces before but none of those have worked as seamlessly as the one we have here.

**👮🏻‍Credit disclaimer:🚨** <br/>
The entire credit for the setup goes to my colleagues: Kim, Niemi, Asparuh, Pepijn and Sven. I found the setup at Anyfin extremely awesome and hence wanted to share it with everyone.

## 🧦 Example Architecture

Lets say we have a set of services that have the following architecture.

![example architecture](./architecture.svg)

From the diagram we can see we have:

- NJS1 - NodeJS service running on port **7000** and dependent on the database Db1 (running on port **5433**).
- Py1 - Python service running on port **9000** and dependent on the database Db1 (running on port **5433**).
- Go1 - Golang service running on port **5000** and dependent on the database Db1 (running on port **5433**).

---

- NJS2 - NodeJS service running on port **8000** and dependent on the database Db2 (running on port **5432**).

---

- Web - A simple webpack based dev server for frontend running on port **8080**.

_PS: We want the services to be exposed on the said ports in the local environment so that they can communicate with each other via those._

For simplicity, lets consider that all of these services just return the message:

```
Hello from <service name>
```

So, if you hit **GET http://localhost:7000**, you should get

```
Hello from njs1
```

The code for these services are here: <a href="https://github.com/master-atul/blog-docker-dev-environment-example" target="_blank">https://github.com/master-atul/blog-docker-dev-environment-example</a>

Lets run all of our services on different terminal windows and try it out.
<br/>

## 💩 We typically face these issues with this setup

1. **Terminal hell:** To run all of those services, we would need to open up mulitple terminal tabs/windows and then run them separately (It would look like this). This will become more harder to manage as the number of services grow.

![example terminal](./example_terminal.png)

<center><sub><i>Typical terminal layout of a developer working with multiple services</i></sub></center>
<br/>

2. **Incompatible dependencies**: Lets say our services depend on different node versions. In such cases we would need to manually switch node versions before running our services. Similarly, if our services depend on multiple database servers, then we would need to make sure our database servers are running (on different ports) before we can run our services. All of this is mostly manual and cumbersome.

3. **Fresh setup**: Setting up all of this services on a new machine can be tricky as we need to keep track of all the dependencies we need and their corresponding versions. This leads to the popular **"Works on my machine"**.

All of these are frankly annoying 🤯.

## 🕶 Docker based local development environment

> Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package.

### Mental model 🧞‍

#### Docker container

To form a mental picture, for the time being just consider a **Docker Container** as an extremely light weight isolated linux based virtual machine inside which we will run our application service (<a href="https://www.backblaze.com/blog/vm-vs-containers/" target="_blank">although containers are not exactly VMs</a>). The container will contain our code and all of its dependencies (system libraries, tools, etc). For our setup we will use one docker container per service and separate docker containers for our database.

![containers_mental_modal](./containers_mental_modal.svg)

#### Docker-Compose

> Docker compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.

**TLDR;** Docker compose lets you run all your services at once (also in the right order) and manage them via a unified interface.

Docker compose in general will contain:

- **Services**: Services are the list of induvidual docker containers that will be run by the compose tool. We will specify the ports and other configurations needed to run the docker containers here.

- **Networks**: Network provides a way by which different services can interact with each other. Each container can attach itself to a network and all containers within same networks can communicate with each other. We will use a single network for our case.

- **Volumes**: Docker containers by default do not contain any kind of persistence storage. If a docker container is killed then all the data in its memory gets lost. So in order to save some persistant data you need volumes. Think of volumes as permanent hard drives for these containers. We will have one volume per service.

![compose_modal](./compose_mental_modal.svg)

<br/>

## 🚀 Setting it up

Firstly, make sure you have docker running by following the instructions here <a href="https://www.docker.com/get-started" target="_blank">https://www.docker.com/get-started</a>.

## 🧙‍ Commands Cheatsheet

## 🕵️‍ Some Tips for smoother workflow

CPU and memory

removing all images and then refreshing the entire thing.
