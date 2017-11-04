Angular Protractor Test
==============================

First clone this repository.

Then, to get the App Started I installed NodeJS (https://nodejs.org/en/download/)

next run: 
> npm install -g http-server

So this will run a web server for the Angular project.

Now, open up Command Line and cd to the project directory, then start the server with: 	
> http-server


Once you run this, you will be given an "Available on" link(s). 

If http://127.0.0.1:8080/ is listed in the Available on, then you can ignore
line 22. 

|| Ignore if line 19 is true: edit line 13 where is says "let baseURL = ''" and place one of the addresses there.

*** Installing Protractor

open cmd and copy/type:
>npm install -g protractor

then to make sure it is updated copy/type:
> webdriver-manager update

and finally copy/type:
webdriver-manager start

there, now the Selenium Server is running. We can test! 

Now, open up another Command Line and navigate to app/protractor
and copy/type:
> protractor conf.js

this will fun the tests!

