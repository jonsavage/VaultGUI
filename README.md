# VaultGUI [![Build Status](https://travis-ci.org/jonsavage/VaultGUI.svg?branch=master)](https://travis-ci.org/jonsavage/VaultGUI)

A cross-platform desktop app for interacting with a Hashicorp Vault server (check it out here: https://github.com/hashicorp/vault.)

Node-Vault is a super useful package that handles all interaction with the Vauth Server REST API: https://github.com/kr1sp1n/node-vault

Build Instructions:
Uses: node `7.4.0`

After cloning:
run `npm install`
run `npm run start` 

Feel free to contribute or submit issues as needed.

## Features Completed
1. Server Connection
2. Authentication Methods
 * Root Token
 * userpass (username and password)
3. Seal/Unseal
4. Read Secrets
5. List Mounted Secret Backends
6. List Mounted Auth Backends
7. List Mounted Secrets
8. Write Secrets

This is my first JS, React and Electron App) Very open to feedback. Please tell me if I'm going about this the wrong way.
