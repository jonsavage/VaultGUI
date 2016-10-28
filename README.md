# VaultGUI [![Build Status](https://travis-ci.org/jonsavage/VaultGUI.svg?branch=master)](https://travis-ci.org/jonsavage/VaultGUI)

A cross-platform desktop app for interacting with a Hashicorp Vault server.
This project is in the very early stages. I'm currently proof of concept-ing each of Vault's functions.

What is Vault, you say? Check it out here: https://github.com/hashicorp/vault
Node-Vault is a super useful package that handles all of the REST: https://github.com/kr1sp1n/node-vault

Build Instructions:
After cloning all you should need to do is run `npm start` or `electron .` from withing the repo if you have electron prebuilt installed. 
All of the node_modules are checked in to VC making things simpler.

Feel free to contribute or submit issues as needed.

## General Plan:
1. Continue to proof of concept wrap each node-vault method.
2. Organize UI in some sort of intuitive fashion.
3.  Set up a directory like tree UI for displaying/managing secrets. 

## Features Completed
1. Server Connection
2. Authentication Methods
 * Root Token
 * userpass (username and password)
 * GitHub (token)
3. Seal/Unseal

