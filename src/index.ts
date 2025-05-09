import * as functions from "firebase-functions";
import axios from "axios";

export const sendUserToServer = functions.auth.user().onCreate(async (user) => {
  const syncSecret = functions.config().sync.secret;

  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };

  const serverEndpoint = "https://www.getmundo.ai/api/v1/auth/firebaseSync";

  try {
    const response = await axios.post(serverEndpoint, userData, {
      headers: {
        Authorization: syncSecret as string,
      },
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

// export const sendUserToLocalServer = functions.auth
//   .user()
//   .onCreate(async (user) => {
//     // Retrieve your sync secret from Firebase configuration
//     const syncSecret = functions.config().fsync.secret;

//     // User data that Firebase provides
//     const userData = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//     };

//     const serverEndpoint =
//       "https://8d86-88-230-76-79.ngrok-free.app/api/v1/auth/firebaseSync";

//     try {
//       // Send a POST request to your server with the secret in the Authorization header
//       const response = await axios.post(serverEndpoint, userData, {
//         headers: {
//           Authorization: syncSecret as string,
//         },
//       });
//       console.log("Successfully sent user data to server:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error sending user data to server:", error);
//       throw new functions.https.HttpsError(
//         "internal",
//         "Unable to send user data"
//       );
//     }
//   });
