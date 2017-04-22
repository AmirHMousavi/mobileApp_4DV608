# 4DV608-mobile
Advanced Software Design Project

# Prerequisites

* NodeJS and NPM, you can find them [here](https://nodejs.org/en/).
* Cordova and Ionic (`sudo npm -g install cordova ionic`)


### Prepare to run the app
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

For deploying on mobile device (the app is not in Play Store, but we can deploy
it in debug mode), we need [Android SDK][1] and execute the following commands:

```sh
ionic platform add android
ionic build android
adb -d install platforms/android/build/outputs/apk/android-debug.apk
```

[1]: https://developer.android.com/studio/index.html
