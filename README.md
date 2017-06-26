BigPanda DevOps Exercise
-----------------------------
This project includes two services. Each has it's own code, and an ansible role that
installs and configures it. The services are written in nodejs. 
A short explanation on the services:
1. img-panda. This service serves you a random panda image everytime you issue a 
GET request!
You can install by running ansible-playbook install.yml.
It will install and configure all the things you need. 
2. smart-panda. This service will show how many POST requests the server served 
on a simple GET request! This service includes redis as a cache database. 
You can install by running ansible-playbook install.yml.
It will install and configure all the things you need. 

The services and their installations are all written in a way to cover many areas, 
such as alerting you when something is wrong, alerting you if something is wrong during 
the installation proccess, and of course everything is logged.


