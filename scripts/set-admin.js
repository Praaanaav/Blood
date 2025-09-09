
// This script is used to set a custom claim on a Firebase user, designating them as an admin.
// Usage: node scripts/set-admin.js <user_email>

const admin = require('firebase-admin');

// IMPORTANT: You must download your service account key from the Firebase console
// and save it as 'service-account-key.json' in your project's root directory.
// Make sure this file is added to your .gitignore to keep it secure.
const serviceAccount = require('../service-account-key.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = process.argv[2];

if (!email) {
  console.error('Error: Please provide the user\'s email as an argument.');
  console.log('Usage: node scripts/set-admin.js <user_email>');
  process.exit(1);
}

(async () => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Success! Custom claim { admin: true } has been set for user: ${email}`);
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`Error: No user found with the email: ${email}`);
    } else {
      console.error('Error setting custom claim:', error.message);
    }
    process.exit(1);
  }
})();
