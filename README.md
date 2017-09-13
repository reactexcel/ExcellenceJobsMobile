# Excellence Jobs

# How to setup this project on system ?
* git clone https://github.com/reactexcel/HrRecruit.git.
* npm install.
* For Android run command react-native run-android inside the project folder.
* For IOS run command react-native run-ios inside the project folder.

# Configuration of Project !
* Firebase Push Notification used ```manish@excellencetechnologies.in```.
 * Used Libary react-native-fcm (^7.3.0).
 * Configure project for android.
 * [OpenURl](https://console.firebase.google.com/u/0/) Create a new project Excellence Jobs with (com.excellence.jobs) .
 * Download the google-services.json replaced with old one in the project.
 * update the SHA certificate fingerprints.
 * Configure project for IOS.
 * [OpenURl](https://console.firebase.google.com/u/0/) Create a new project Excellence Jobs with (com.excellence.jobs).
 * Download the GoogleServices-Info.plist replaced with old one in the project.
 * Upload production and development certificates can download from apple developer account.
 * Now For push notification need to change the ```Legacy server key``` on BACKEND.
 * Open this [Link](https://console.firebase.google.com/u/0/project/excellence-jobs-b45cc/settings/cloudmessaging/ios:com.excellence.jobs ) and copy Legacy server key from there .
* Universal Link Configuration from ```arun@excellencetechnologies.in```.
 * Configure on [this](https://branch.io/) (For Android Only).
 * Copy the Branch Key from [here](https://dashboard.branch.io/account-settings/app) have to change in android core files.
* Crashlytics Configuration from ```arun@excellencetechnologies.in```.
 * Login in [here](https://www.fabric.io/) (For Android & IOS) .
 * Open [this](https://fabric.io/kits/android/crashlytics/install).
 * Copy the API key from ```Add Your API Key``` for both (IOS & Android) need to change in the android and IOS files.
* Configuration for Map Key used in react-native-map from ```arun.etech2011@gmail.com```.
  * Open this [link](https://developers.google.com/maps/documentation/android-api/signup) click on ```GET A KEY``` select your project , copy that key and replaced with old one.
