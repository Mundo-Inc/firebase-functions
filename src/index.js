"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserToServer = void 0;
const functions = __importStar(require("firebase-functions"));
const axios_1 = __importDefault(require("axios"));
exports.sendUserToServer = functions.auth.user().onCreate(async (user) => {
    // Retrieve your sync secret from Firebase configuration
    const syncSecret = functions.config().fsync.secret;
    // User data that Firebase provides
    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
    };
    // URL of your server endpoint
    const serverEndpoint = "http://your-server.com/api/users";
    try {
        // Send a POST request to your server with the secret in the Authorization header
        const response = await axios_1.default.post(serverEndpoint, userData, {
            headers: { Authorization: syncSecret },
        });
        console.log("Successfully sent user data to server:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error sending user data to server:", error);
        throw new functions.https.HttpsError("internal", "Unable to send user data");
    }
});
//# sourceMappingURL=index.js.map