# VaultGUI [![Build Status](https://travis-ci.org/jonsavage/VaultGUI.svg?branch=master)](https://travis-ci.org/jonsavage/VaultGUI)

A cross-platform desktop app for interacting with a Hashicorp Vault server (check out Vault here: https://github.com/hashicorp/vault)

![read_secrets](/readme_images/read_secrets.png?raw=true "Read Secrets")

Install Directions:

Currently, only executables (not installers) are avaliable, and executables must be build on your machine. Soon full signed installers will be available for download for OSX Linux and Windows.
To build installers make sure you have Node `7.4.0` installed.

Run:
```
git clone https://github.com/jonsavage/VaultGUI.git
cd VaultGUI
npm install
```
Then run the appropriate following command. (Note. If you are on a Linux machine and would like to package a Windows executable you will need to have wine on your `PATH`).
```
npm run package:osx
npm run package:windows
npm run package:linux
```
After running you will find your executable in the 

Build Instructions:

Ensure node `>=7.4.0` is installed.

After cloning, run:
```
npm install
npm run start
``` 

Feel free to submit issues, feature requests and contributions as needed.

## Features Completed
1. Server Connection
2. Authentication Methods
 * Root Token
 * userpass (username and password)
 * GitHub Token
3. Seal/Unseal
4. Read Secrets
5. List Mounted Secret Backends
6. List Mounted Auth Backends
7. List Mounted Secrets
8. Write Secrets
9. Delete Secrets
10. Status and Health
11. List Policies 

Major props goes out to node-vault, which is the REST Client used to communicate with the Vault server.
https://github.com/kr1sp1n/node-vault
