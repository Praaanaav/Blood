// scripts/createAdmin.js
const admin = require('firebase-admin');
const fs = require('fs');

// --- Configuration ---
const SERVICE_ACCOUNT_PATH = './serviceAccountKey.json';
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password'; // Use a strong password in a real app
// ---------------------

// Check if service account key file exists
if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Service account key file not found!');
    console.error(`Please download your service account key from the Firebase console and save it as "serviceAccountKey.json" in the root of your project.`);
    process.exit(1);
}

const serviceAccount = require(`../${SERVICE_ACCOUNT_PATH}`);

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} catch (error) {
    if (error.code === 'app/duplicate-app') {
        // App is already initialized, which is fine.
        admin.app();
    } else {
        console.error('Firebase initialization error:', error);
        process.exit(1);
    }
}


const createAdminUser = async () => {
    try {
        console.log(`Checking if admin user '${ADMIN_EMAIL}' exists...`);
        try {
            await admin.auth().getUserByEmail(ADMIN_EMAIL);
            console.log('\x1b[33m%s\x1b[0m', `Admin user '${ADMIN_EMAIL}' already exists. No action taken.`);
            return;
        } catch (error) {
            if (error.code !== 'auth/user-not-found') {
                throw error;
            }
        }
        
        console.log(`Creating admin user '${ADMIN_EMAIL}'...`);
        const userRecord = await admin.auth().createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            displayName: 'Administrator',
        });

        console.log('\x1b[32m%s\x1b[0m', 'Successfully created new admin user:');
        console.log(`- UID: ${userRecord.uid}`);
        console.log(`- Email: ${userRecord.email}`);

    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', 'Error creating admin user:');
        console.error(error.message);
    } finally {
        // The script will exit automatically, but we ensure the db connection is closed if we were using it.
        // For auth, this is not strictly necessary but good practice for other DB types.
    }
};

createAdminUser();
