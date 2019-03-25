---
title: 🐳 Simplified guide to using Docker for local development environment
date: 2019-03-06T17:11:03.284Z
keywords: docker, local, development, environment, guide, javascript
featuredImage: ssl_drawing.png
---

I recently started working at <a href="https://anyfin.com/en" target="_blank">Anyfin</a>. As a new engineer on the team, I had to setup the entire development environment. Drawing my expectations from my previous work engagements I thought this would take me a couple of days. But to my surprise I had a working setup of quite a few backend services written in NodeJS, Golang and Python along side the web site and portal (Javascript) in ~5hrs.
This post will explain on how we use Docker at Anyfin to setup a productive local development environment quite easily. I have seen such attempts at my previous workplaces before but none of those have worked as seamlessly as the one we have here.

**👮🏻‍Credit disclaimer:🚨** <br/>
The entire credit for the setup goes to my colleagues: Kim, Niemi, Asparuh, Pepijn and Sven. I found the setup at Anyfin extremely awesome and hence wanted to share it with everyone.

## Example Architecture

Lets say we have a set of services that have the following architecture.

![example architecture](./architecture.svg)

From the diagram we can see we have:

- NJS1 - NodeJS service running on port **7000** and dependent on the database Db1 (running on port **5433**).
- Py1 - Python service running on port **9000** and dependent on the database Db1 (running on port **5433**).
- Go1 - Golang service running on port **5000** and dependent on the database Db1 (running on port **5433**).

---

- NJS2 - NodeJS service running on port **8000** and dependent on the database Db1 (running on port **5432**).
- Py2 - Python service running on port **3000** and dependent on the database Db1 (running on port **5432**).

---

- Web - A simple webpack based dev server for frontend running on port **8080**.

_PS: We want the services to be exposed on the said ports in the local environment so that they can communicate with each other via those._

## The Problem

1. In order to run all of those services, typically we would open up separate terminal tabs/windows and then run them separately (looks something like this). This is a bit harder to manage as more services grow.

![example terminal](./example_terminal.png)

2. Lets say both nodejs services depend on different node versions, then on each of those terminals you ll need to switch node versions manually 😡. Same case with multiple database services running on multiple ports. 👺

3. Setting all of this up on a new colleagues laptop will be a pain.

These are all consume a bit of your time every day and are frankly a bit annoying 🤯.

## Docker based local development environment.
