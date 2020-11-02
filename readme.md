<h1 align="center">
  <img src="./assets/Logo.svg" height="96px">
</h1>
<br />
<p align="center"><b>A Node.JS and React-Native app for a fake transportation company.</b></p>
<br />

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/caiotracera/fastfeet?color=FFC042">

  <img src="https://img.shields.io/github/languages/count/caiotracera/fastfeet?color=FFC042">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/caiotracera/fastfeet?color=FFC042">

  <a href="https://www.linkedin.com/in/caiotracera/">
    <img alt="Made by caiotracera" src="https://img.shields.io/badge/made%20by-caiotracera-%230172B3?color=FFC042">
  </a>

  <a href="https://github.com/caiotracera/fastfeet/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/caiotracera/fastfeet?color=FFC042">
  </a>

  <a href="https://github.com/caiotracera/fastfeet/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/caiotracera/fastfeet?color=FFC042">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?color=FFC042"/>
</p>

<br />

<blockquote align="center">
"Do the things you think you cannot do."
</blockquote>

<br />

<p align="center">
  <a href="#rocket-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#calling-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<br />

<div align="center">
  <img src="./assets/banner.svg"/>
</div>

<br />

# :rocket: About the project
The main ideia for this project is to develop an app for a fake transportation company, where the delivery man can take an order and deliver it to the recipient.<br /> All ideas for future implementations can be found <a href="https://github.com/caiotracera/fastfeet/issues/1">here</a>.

<br />

# :calling: Getting started
In order to run this project, you must have installed <a href="https://nodejs.org/en/">Node.js</a>, <a href="https://yarnpkg.com/">Yarn</a>, <a href="https://git-scm.com/">Git CLI</a>, <a href="https://www.docker.com/">Docker</a> and be able to run an Android or iOS simulator. If you met all the requirements, follow the instructions:
<br /><br />
<b>Clone the project</b>
```bash
$ git clone https://github.com/caiotracera/fastfeet.git && cd fastfeet
```

<b>Start the backend server</b>
```bash
$ cd server # Starting from the project's root folder, access the server folder
$ yarn # Install the dependencies
$ yarn typeorm migrations:run # Run the migrations on your database
$ yarn dev:server # Start the server
```

<b>Start the mobile app</b>
```bash
$ cd mobile # Starting from the project's root folder, access the mobile folder
$ yarn # Install the dependencies
$ yarn android # Install and open the app in your android device.
$ yarn ios # Install and open the app in your IOS device.
```

<br />

# :memo: License

Made with :sparkling_heart: by Caio.
<br />
:coffee: Can we have a coffe? <a href="https://www.linkedin.com/in/caiotracera/">Get in touch!</a>