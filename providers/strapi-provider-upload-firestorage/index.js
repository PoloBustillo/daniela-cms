"use strict";

/**
 * Module dependencies
 */

const admin = require("firebase-admin");
const path = require("path");
const os = require("os");
const fs = require("fs");
let bucket = undefined;

module.exports = {
  provider: "storage",
  name: "Firestore",
  auth: {
    serviceAccount: {
      label: "firebaseConfig JSON",
      type: "textarea",
    },
    bucket: {
      label: "Bucketname",
      type: "text",
    },
  },
  init: (config) => {
    if (!bucket) {
      admin.initializeApp({
        credential: admin.credential.cert(config.serviceAccount),
        storageBucket: config.bucket,
      });
      bucket = admin.storage().bucket();
    }

    return {
      upload: async (file) => {
        try {
          const tempFilePath = path.join(os.tmpdir(), file.name);
          fs.writeFileSync(tempFilePath, file.buffer);
          const [firestoreFile] = await bucket.upload(tempFilePath, {
            destination: `${file.name}`,
            contentType: file.mime,
          });
          const [url] = await firestoreFile.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });
          await firestoreFile.makePublic();

          fs.unlinkSync(tempFilePath);
          file.url = url.split("?")[0];
          console.log(file);
        } catch (error) {
          console.log(`Upload failed, try again: ${error}`);
        }
      },
      delete: async (file) => {
        const filename = `${file.name}`;
        try {
          await bucket.file(filename).delete();
        } catch (error) {
          console.log(`Could not delete: ${error}`);
        }
      },
    };
  },
};
