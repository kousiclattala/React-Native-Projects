# React Native Projects

This repo consists of React Native projects, which developed while learning the framework.

## Need to Have

- Node.js (any version).
- jdk (Java Development Kit).
- Android Studio.
- Code Editor (preferably VScode).

## Setting Up Path

1. In Windows

   - After installing the above software, make sure you have added the path into environmental variables.

   - For jdk Path.

   ```path
   Name: JAVA_HOME
   Path: C:\Program Files\Java\jdk1.8.0_211
   ```

   - For Android Path.

   ```path
   Name: ANDROID_HOME
   Path: C:\Users\kousi\AppData\Local\Android\Sdk
   ```

   - Open Android studio, select configure>SDK Manager > SDK Tools. make sure you install `Google Play Licensing Library`.

## How to Start

- Clone the Repo into your system.
- After cloning, install the necessary dependencies

```node.js
npm install
```

- After installing the dependencies, start the metro server.

```react-native
npx react-native start
```

- Next, run the android app and before make sure you have started your andriod emulator.

```react-native
npx react-native run-android

or

// if ios

npx react-native run-ios
```
