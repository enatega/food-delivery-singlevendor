# Enatega Restaurant Solution

![Project thumbnail](./contributingGuides/thumbnail.png)
<br/>
This is a white label restaurant solution for any kind of restaurant application or delivery solution that can be used by any restaurant owner to manage their restaurant and delivery business. The solution provides managing orders with a seperate rider application for delivery management.

## Getting Started

The solution contain 3 projects, the admin panel, the restaurant panel and the rider panel. The admin panel is used to manage the restaurant and rider accounts. The Customer App is used to place orders which is then received by the admin panel. The admin panel accepts the order and rider app can accept the order and deliver it to the customer.

- To run the project, you need to have nodejs installed on your machine and go to the directory and run the following commands
  For example:
  `cd Customer\ App`
  `npm install`
  `npm start`

- The project has already been set with the required credentials and keys using `.env` and `environment.js` files you can also set your own keys and credentials in the same files.

- The project needs `expo-cli` and `nodejs` to run the project. The version of `nodejs` should be `>=14.00 and <=16.00`.

### High Level Architecture

![High Level Architecture](https://3875726860-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-LfOcDTetx0vXD_N4Zpk%2F-LmsvWhbsgLiqJ_MFIRd%2F-LmsvfAi5Dqcs8MHjkfC%2Farchitecture.png?alt=media&token=0a27057b-ac2b-490a-9745-4ee69372929e)

- User Mobile App communicates with both API Server and [Amplitudes](https://amplitude.com/) analytics dashboard
- Web dashboard communicates with only API Server
- Rider App communicates with API Server

### Prerequisites

##### App Ids for Mobile App in app.json

- Facebook Scheme
- Facebook App Id
- Facebook Display Name
- iOS Client Id Google
- Android Id Google
- Amplitude Api Key
- server url

##### Set credentials in API in file helpers/config.js and helpers/credentials.js

- Email User Name
- Password For Email
- Mongo User
- Mongo Password
- Mongo DB Name
- Reset Password Link
- Admin User name
- Admin Password
- User Id
- Name

##### Set credentials in Admin Dashboard in file src/index.js

- Firebase Api Key
- Auth Domain
- Database Url
- Project Id
- Storage Buck
- Messaging Sender Id
- App Id

##### NOTE: Email provider has been only been tested for gmail accounts

## Built With

- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [ReactJS](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Firebase](https://firebase.google.com/)
- [Amplitude](https://amplitude.com/)
- [React Native](https://reactnative.dev/)
- [React Router](https://reactrouter.com/)
- [GraphQL](https://graphql.org/)
- [ExpressJS](https://expressjs.com/)
- [React Strap](https://reactstrap.github.io/)

## Contributing

Enatega Restuarant Solution is an open source project. We welcome contributions of all kinds including documentation, bug fixes, feature requests, and code. Please read our [contributing guide](./contributingGuides/CONTRIBUTING.md) for more information on how you can contribute.

## Demos

- [Customer App Android](https://play.google.com/store/apps/details?id=com.enatega.vendor)
  [![Customer App Android](https://user-images.githubusercontent.com/551004/29770692-a20975c6-8bc6-11e7-8ab0-1cde275496e0.png)](https://play.google.com/store/apps/details?id=com.enatega.vendor)

- [Customer App iOS](https://apps.apple.com/pk/app/enatega/id1493209281)
  [![Customer App iOS](https://user-images.githubusercontent.com/551004/29770691-a2082ff4-8bc6-11e7-89a6-964cd405ea8e.png)](https://apps.apple.com/pk/app/enatega/id1493209281)

- [Rider App Android](https://play.google.com/store/apps/details?id=com.enatega.rider)
  [![Rider App Android](https://user-images.githubusercontent.com/551004/29770692-a20975c6-8bc6-11e7-8ab0-1cde275496e0.png)](https://play.google.com/store/apps/details?id=com.enatega.rider)

- [Rider App iOS](https://apps.apple.com/pk/app/enatega-rider-app/id1493291047)
  [![Rider App iOS](https://user-images.githubusercontent.com/551004/29770691-a2082ff4-8bc6-11e7-89a6-964cd405ea8e.png)](https://apps.apple.com/pk/app/enatega-rider-app/id1493291047)

- [Admin Dashboard](https://enatega.ninjascode.com/admin/dashboard)

## Get the Latest News

- [Facebook](https://www.facebook.com/enatega)
- [Twitter](https://twitter.com/EnategaA)
- [Instagram](https://www.instagram.com/enatega.nb/)
- [LinkedIn](https://www.linkedin.com/company/14583783/)

Any other questions, please contact us at [our website](https://enatega.com/) or you can email us directly at sharan@ninjascode.com. We'd love to hear from you!
