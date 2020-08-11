## Vacation and Save:
-------------------

## Introduction
* On this app you can get the informations about a desired country and city with one click. For this you have to enter the two text fields (country, city) on the home page. The app is designed to give you the information you need to get a good first impression of the desired holiday destination before you go on holiday.
* On the home page you get the information (capital city, used currency, language, exchange rate) of the entered country, the corresponding informations are also entered in the respective table on the Corona and Weather pages.
* If you wish, you can only use one specific service. E.g. request corona cases in a country or the weather situation in a city.
* The weather situation is given 6 days in forcast of the current date.              
    enjoy it..

## Installation steps

* first you must insall npm because the app is running on node.js. You can do this on [npm](https://nodejs.org/en/download/) or on linux or ubunto with the command:
        
        sudo npm install 
        
* initialize npm in the project to create the package.json

        sudo npm init
    therefor you will have to entere following informations:

        package name: (nodetest) desired_name
        version: (1.0.0)
        description: desired_description
        entry point: (script.js) the start file.js in your project
        test command:
        git repository:
        keywords:
        author:
        license: (ISC)

    see [here](https://docs.npmjs.com/files/package.json) for more informations.

* install express 

        sudo npm install express
    For more inormations aboaut installing express visit [expressjs.com](https://expressjs.com/de/starter/installing.html)

* install node-fetch to be able to send the APIs and laod the responses.json. You can do this with the following command

        sudo npm install node-fetch --save
    For more inormations aboaut installing node-fetch visit [npmjs.com](https://www.npmjs.com/package/node-fetch)

* Now you can configure your main.js (start point in your project) to run the app at desired port.
  
  to run the app all you have to do is running following command
    
        node <your main.js (start point)> 
    
   example:

        node main.js
  your app will be running on localhost:"your desired port"      
* to deploy the app on heroku you have to follow the following steps: see [here](https://devcenter.heroku.com/articles/deploying-nodejs) for more informations.
    
    1-  you must have git in you project
    
     confirm that you have installed [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
     - initialize git
     
           init git
     - add changed files
     
           git add .
     - commit them
     
           git commit -m "your changes"
     - push datas in your git repo
     
           git push origin master
    
    2-   sign up on [heruko](https://signup.heroku.com/login)
    
    3-   create new project
    
    4-   push the app on heroku
        
            git push heroku master
            
     confirm that you have configured the port in your main.js see [here](https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error)
     
     The app will be available on heroku