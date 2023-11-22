import * as functions from "firebase-functions";
import axios from "axios";

export const sendUserToServer = functions.auth.user().onCreate(async (user) => {
  // Retrieve your sync secret from Firebase configuration
  const syncSecret = functions.config().fsync.secret;

  // User data that Firebase provides
  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };

  const IURL = "https://www.phantomphood.ai";
  const serverEndpoint = IURL + "/api/v1/auth/firebaseSync";

  try {
    // Send a POST request to your server with the secret in the Authorization header
    const response = await axios.post(serverEndpoint, userData, {
      headers: {Authorization: syncSecret},
    });
    console.log("Successfully sent user data to server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending user data to server:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to send user data"
    );
  }
});

export const sendUserToLocalServer = functions.auth
  .user()
  .onCreate(async (user) => {
    // Retrieve your sync secret from Firebase configuration
    const syncSecret = functions.config().fsync.secret;

    // User data that Firebase provides
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    const IURL = " https://f166-198-90-85-161.ngrok.io";
    const serverEndpoint = IURL + "/api/v1/auth/firebaseSync";

    try {
      // Send a POST request to your server with the secret in the Authorization header
      const response = await axios.post(serverEndpoint, userData, {
        headers: {Authorization: syncSecret},
      });
      console.log("Successfully sent user data to server:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending user data to server:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Unable to send user data"
      );
    }
  });
