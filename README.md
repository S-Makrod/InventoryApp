# InventoryApp

This is an inventory app built for the Shopify Backend Intern challenge. 

## Description

This Inventory App has basic CRUD operations so items can be created, viewed, updated, and deleted. For the additional challenge I chose the option which gives users the 
"ability to create “shipments” and assign inventory to the shipment, and adjust inventory appropriately" (Shopify Handout https://docs.google.com/document/d/1PoxpoaJymXmFB3iCMhGL6js-ibht7GO_DkCF2elCySU/edit).

There are two sections below:
- "How to Run" contains instructions on how you can set up the repository on your own device. Additionally, it contains a link to the Repl.it so that you may just view the application from there directly
- "How to Run" contains instruction on how to use the app when it is running

## How to Run

### Repl.it Hosting (No setup required)

To use the app without having without any setup required please visit the following link: https://replit.com/@SaadMakrod/InventoryApp#index.js. This is a link to the 
Repl.it containing the project. Once you arrive you will see the following screen:

![image](https://user-images.githubusercontent.com/53048085/169674339-c532b36c-9e91-4310-b656-15f1f6f211de.png)

Click the green run button to start the app. Once it starts you will see the following page:

![image](https://user-images.githubusercontent.com/53048085/169674362-dd03551e-5ec2-4cb6-86d2-27899e43f284.png)

You can also click the "Open Website" link and it will open the app in a new tab like so:

![image](https://user-images.githubusercontent.com/53048085/169674387-65af5ef3-69f7-4afc-892e-03e53edcdab4.png)

### Setup On Your Device

You will need the following to run the application:
- Node.js: setup instructions @ https://nodejs.org/en/download/
- MongoDB: setup instructions @ https://www.mongodb.com/cloud/atlas/register
- GitHub Account: instructions @ https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners
- Code Editor: instructions @ https://code.visualstudio.com/download

Helpful Resources:
- https://www.makeuseof.com/tag/a-beginners-guide-to-the-windows-command-line/ 
- https://macpaw.com/how-to/use-terminal-on-mac.

Once you have these set up you have to pull the repository. To do this navigate to your preferred directory in the terminal. The easiest way to do this for beginners on Windows is 
to navigate to your preferred directory on the explorer and type <code>powershell</code> in the top bar like so:

![image](https://user-images.githubusercontent.com/53048085/169674692-d4dd623f-dc97-4b5d-977c-78e18dd97b1b.png)

Then press enter and you will see a terminal pop up:

![image](https://user-images.githubusercontent.com/53048085/169674708-379d76a0-d96c-4b56-8e57-8a36a681118f.png)

Now type the commad below, this will pull the repo:
<pre>
git clone https://github.com/S-Makrod/InventoryApp.git
</pre>

Once the repo is cloned navigate to it by using <code>cd ./InventoryApp</code>. Open the folder with your code editor and create a <code>.env</code> file. 
Inside that file you will have to set two values like so:

<pre>
MONGODB_URI='MONGO URL GOES HERE'
PORT=3001
</pre>

Port can be left as 3001, however <code>MONGODB_URI</code> must be changed to the url of your database cluster. A great set of instructions on how to do this can be found at
https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db. Just follow the mongodb section until you obtain your MongoDB URI and then update the .env.

Finally, to run the app, open up your terminal and navigate to the application folder and run the following commands:
<pre>
npm install
npm start
</pre>

The <code>npm install</code> command will download all dependencies and <code>npm start</code> will start the server. Now navigate to http://localhost:3001/ and the app will be loaded!

## How to Use

Once you have the app running on either Repl.it or your local machine you will see a screen similar to:

![image](https://user-images.githubusercontent.com/53048085/169674387-65af5ef3-69f7-4afc-892e-03e53edcdab4.png)

The app is straightforward to use, general instructions are below:
- To add inventory click the "Add Item" button and to add a shipment click the "Add Shipment" button
- To see more details of a shipment or item click the "Show" button located next to it, to hide details click the "Hide" button
- To edit an inventory or shipment click the "Show" button located next to it and then click the "Edit" button
- To delete an item or shipment click the "Delete" button located next to it

