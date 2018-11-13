# CarShow

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

Technology stack:
- Angular 7, typescript 3.1, rxjs 6.3.
- Bootstrap for styling.
- Other libraries like lodash.

## Before you run the application for the first time.

Do 'npm install'. You may need to install angular-cli in the global level.

## When you run the application:

Run `ng serve` for a dev server. The app is in `http://localhost:4200/` and will automatically reload if you change any of the source files.

Because the API is in http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars, when you run the application locally in your machine, you will get CORS error:
No 'Access-Control-Allow-Origin' header is present on the requested resource.

To overcome this, open Chrome in disable-web-sercurity mode: Open Run in Window:
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security

After the browser is loaded, go to http://localhost:4200/

## How to use the application:
The application shall be self explanatory. When 'Display Car shows' button is clicked, it will open up panels to display result if result is available; or error message if it retrieve error from the backend.

Then you can choose to 'Clear result' but clicking the second button. Or just simply re-click the 'Display Car shows' button. It will clean the result and make another call to the bankend to try to retrieve information.

## Running coverage tests

Run `npm coverage` to execute the coverage on unit tests via [Karma](https://karma-runner.github.io). 

Note:
- Coveragae test is currently configured to be single run. Then the test report is in \coverage\index.html

Integration test against the requriement is in \src\app\shopping-cart\service\shopping-cart.service.integration.spec.ts file.


## Below is orginal angular-cli information.... 


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
