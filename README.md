<br/>
<br/>
<div align="center">
  <img height="100" width="130" src="https://media.discordapp.net/attachments/1064596920133230642/1071486133629894687/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" />
  <h3>Dicord Remote Controller</h3>
  <p align="center">
    A web-based discord bot dashboard & controller.
    <br />
    <a href="#getting-started">Take a Try</a>
    ·
    <a href="https://github.com/Omi036/discord-controller/issues/">Report Bug</a>
    ·
    <a href="https://github.com/Omi036/discord-controller/issues/">Request Feature</a>
    ·
    <a href="https://github.com/Omi036/discord-controller/blob/main/CHANGELOG.md">Changelog</a>
  </p>
</div>



## Index
<ol>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#development">Development</a>
    <ul>
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#server-side">Server Side</a></li>
        <li><a href="#renderer-side">Renderer Side</a></li>
        <li><a href="#websocket">Websocket</a></li>
    </ul>
    </li>
    <li><a href="#license">License</a></li>
 </ol>


## About
With this tool, you can take <s>almost</s> fully control of a discord bot.  
Although we are still under early development, we plan to add fully control over channels, bots, guilds, users query, and more.  
In the meanwhile, you can try our demo. See <a href="#getting-started">getting started.</a>
<img src="https://media.discordapp.net/attachments/1064596920133230642/1071438018013057104/Captura_de_pantalla_2023-02-04_a_las_15.31.49.png?width=1422&height=675" />
<img src="https://i.imgur.com/XZi5IFr.gif" />

## Getting Started
### Prerequisites
<ul>
  <li><a href="https://nodejs.org/en/download/" target="_blank">Node v12.0.0</a> or higher. Check with <code>node -v</code></li>
  <li><a href="https://nodejs.org/en/download/" target="_blank">Npm</a>. Check with <code>npm -v</code></li>
</ul>

### Installation
1. Clone this repository downloading the .zip or via git:
  ```sh
  git clone https://github.com/Omi036/discord-controller
  ```  
2. Cd into the folder and setup the dependencies
  ```sh
  cd discord-controller
  npm run setup
  ```  
3. Start the application with npm:
  ```sh
  npm run start
  ```
  
4. A browser window should pop up, if not, try going to <a href="http://localhost:5018" target="_blank">localhost:5018</a> in your browser.

## Usage
1. To launch the app, go to the root folder of the app, often called <code>discord-controller</code>
```sh
cd YOUR_PATH/discord-controller/
```
2. Then, execute `npm run start` and a browser window to <a href="http://localhost:5018" target="_blank">localhost:5018</a> should show up.  
3. You should be greeted with the following screen:  
<img src="https://i.imgur.com/ct8eZ40.png" />
4. Type down your discord token and select the intents you want to login in. (If not sure, select default)<br/>
5. Now, you are inside the dashboard!, take notice that we're still under early development, many categories are missing nor bugged.

## Development
### Project Structure
The project is build fully on javascript / jsx  
It is divided in 3 parts:  
* The server side. This is the responsible of comunicating with the discord API and sending the data back to the dashboard.  
It's located at <code> discord-controller/src/ </code>  
* The renderer side. It's mainly the web dashboard. To gather data from the data API, it messages the server-side via websockets, and displays all the data received. Located at <code> discord-controller/web/</code>  
* The discord API. The API from the own discord, where all the data is gathered from.  
<img src="https://media.discordapp.net/attachments/1064596920133230642/1071461718313668669/image.png?width=1441&height=543" />

### Server Side
* When the app starts, the script <code>index.js</code> is executed.  
* This script starts the websocket on port <code>5017</code> and prepares discord login command on <code>socketCommands.js</code>
* The server will wait until it receives a socket message with the token, then, sends the token to <code>discord.js</code>.  
* After that, discord.js will export all the possible commands to <code>socketCommands.js</code>.  
* Finally, when a message is received, it's header section will be used to fetch the command on <code>socketCommands.js</code>, and it's content will be send through the fetched function.
<img src="https://media.discordapp.net/attachments/1064596920133230642/1071476340219453470/image.png?width=1441&height=403" />

### Renderer Side
* When the app starts, npm starts the vite project located at <code>discord-controller/web/</code>  
* It first loads <code>web/src/main.jsx</code> that loads <code>App.jsx</code>, which contains the full app inside 2 components.  
* In the meanwhile, <code>web/src/misc/WebSocket.jsx</code> will be loaded, this script contains the connection to the server.  
* If there is already a discord client connected, it will override the login section.  

### WebSocket
* The websockets messages, must be <code>JSON.stringified</code> before of being sent, and <code>JSON.parsed</code> before of being used.  
* The message must be an object, containing a <code>header</code> and a <code>content</code> key.
* The header key must be a string, it represents the command id/name.
* The content key is usually an object, it contains the parameters for the command.
* To add a custom command, append it to the <code>Commands</code> object located at the bottom of <code>discord-controller/src/socketCommands.js</code>

## License
Distributed under the MIT License. See `LICENSE` for more information.    

<p align="right"><a href="#index">back to top</a></p>
