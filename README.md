<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center">SCRIBBL</h2>
  <p align="center">
    A HANDWRITING KEYBOARD FOR MACOS
  </p>
    <br />
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#screenshot-of-the-project">Working Sample</a></li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- SCREENSHOTs -->
## Screenshot of the project

<h3>Working Sample</h3>

https://github.com/MKMukeshkannan/scribbl/assets/119940345/37ffc4ad-3d75-49eb-9065-05735318e941




<!-- ABOUT THE PROJECT -->
## About The Project
This app produces an blank canvas that lays on top all windows once opened, This allows users
to scribble/write on the blank canvas which is sent to a third party library that is connected
via websocket. Each stroke made by the use is sent to the server where the actual type recognition
takes place, and the server responds with a plain recognized text.
This text is now typed on to the active text feild on the OS using APPLE SCRIPT..

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
I used the following frameworks/tools to build this project:

* [![Electron][Electron]][Electron-url]
* [![Node][Node]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
Instruction to clone this reporsitory and setting it locally on your machine.

### Installation
 1. Clone the repo
    ```sh
    git clone 
    ```
 2. Run the command
    ```sh
    npm i
    ```
 3. Now run migrate commad
    ```sh
    npm start
    ```
    This will create required tables and relations in the database.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

-  Handwriting keyboards are excellent for digital note-taking and document annotation. They allow users to write directly on the screen, replicating the experience of writing on paper.
-  Handwriting keyboards can support multiple languages, making them useful for individuals who need to switch between different language scripts or alphabets regularly.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

M K Mukesh Kannan - [@mukesh-kannan](https://www.linkedin.com/in/mukesh-kannan-mk/) - mukeshkannan311@gmail.com

Project Link: [Scribbl](https://github.com/MKMukeshkannan/scribbl/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



[Electron]: https://img.shields.io/badge/Electron-20232A?style=for-the-badge&logo=ElectronJS&logoColor=#092E20
[Electron-url]: www.electronjs.org
[Node]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
