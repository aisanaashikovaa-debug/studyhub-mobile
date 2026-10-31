# StudyHub Mobile — React Native Final Project

An educational Expo React Native demo that showcases a login/registration flow, API-fed home page, detail pages, favorites stored locally, settings menu, saved preferences and a local test notification.

## Run

1. Install Node.js and npm.
2. Run `npm install` and `npx expo start` (or import the repository into Expo Snack, then add dependencies if Snack prompts).
3. Sign up using any **demo** email and a password of 6+ characters, then log in.
4. Explore the home screen; select a product, save favorites, open Settings and test notifications.

**Security limitation:** authentication is a local demonstration only. The password is stored unencrypted in local AsyncStorage. Do not use real credentials; production authentication requires a secure backend.

**Evidence:** screenshots need to be captured from the actually running application. Figma screenshots must be captured from Figma, not from this repository. For real local notification alerts test on a compatible physical device; remote push notifications require a separate development build and credentials.

**Limitations:** This project has not been runtime-tested in Expo Snack. API data requires network connectivity. Exact library versions may need adjustment to the Expo SDK selected by Snack. Evidence screenshots are not bundled because they must show real tested results.
