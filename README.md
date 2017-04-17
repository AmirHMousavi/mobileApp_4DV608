# 4DV608-mobile
Advanced Software Design Project

# Prerequisites

* NodeJS and NPM, you can find them [here](https://nodejs.org/en/).
* Cordova and Ionic (`sudo npm -g install cordova ionic`)


### prepare to run the app
```sh
# clone the project from repository
git clone https://github.com/AmirHMousavi/mobileApp_4DV608.git

# go to project folder
cd mobileApp_4DV608

# install the dependencies
npm install

# serve the app on browser
ionic serve
```

For serving on emulator (the app is not signed yet to run on real device)
```sh
ioinic prepare android (or ios)
ionic run android (or ios)
```

The android platform is already added, the general approach for adding a 
platform is:

```sh
ionic platform add android (or ios)
```
