# Jenkins CI/CD Pipeline for Node.js Application

A complete CI/CD implementation using **Jenkins, Docker, GitHub, Node.js, Express, and Jest**.

This project demonstrates how a source-code change pushed to GitHub can automatically trigger Jenkins to test the application, build a Docker image, deploy a new container, and verify the deployment.

## Project Overview

This project was developed as **Task 2 of my DevOps Internship at Elevate Labs**.

The objective is to implement a Jenkins-based CI/CD pipeline that automates the software delivery process.

### CI/CD Flow

```text
Developer
    |
    | git push
    v
GitHub Repository
    |
    | SCM Polling
    v
Jenkins Pipeline
    |
    +--> Checkout Source Code
    |
    +--> Install Dependencies
    |
    +--> Run Jest Tests
    |
    +--> Build Docker Image
    |
    +--> Deploy Docker Container
    |
    +--> Verify Deployment
    |
    v
Running Node.js Application