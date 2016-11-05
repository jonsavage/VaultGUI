# VaultGUI [![Build Status](https://travis-ci.org/jonsavage/VaultGUI.svg?branch=master)](https://travis-ci.org/jonsavage/VaultGUI)

A cross-platform desktop app for interacting with a Hashicorp Vault server (check it out here: https://github.com/hashicorp/vault.)

Node-Vault is a super useful package that handles all interaction with the Vauth Server REST API: https://github.com/kr1sp1n/node-vault

Build Instructions:
After cloning all you should need to do is run `npm start` or `electron .`. 
All of the node_modules are checked in to verison control making things simpler.

Feel free to contribute or submit issues as needed.

## Features Completed
1. Server Connection
2. Authentication Methods
 * Root Token
 * userpass (username and password)
 * GitHub (token)
3. Seal/Unseal
4. Read Secrets
5. List Mounted Secret Backends
6. List Mounted Auth Backends
