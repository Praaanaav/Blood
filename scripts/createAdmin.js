// scripts/createAdmin.js
const admin = require('firebase-admin');
const fs = require('fs');
const inquirer = require('inquirer');

// --- Configuration ---
const SERVICE_ACCOUNT_PATH = './serviceAccountKey.json';
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
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'email',
                message: 'Enter the email for the new admin user:',
                validate: function (value) {
                    const pass = value.match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                    if (pass) {
                        return true;
                    }
                    return 'Please enter a valid email address.';
                },
            },
            {
                type: 'password',
                name: 'password',
                message: 'Enter a password for the new admin user (must be at least 6 characters):',
                mask: '*',
                validate: function (value) {
                    if (value.length >= 6) {
                        return true;
                    }
                    return 'Password must be at least 6 characters long.';
                }
            },
        ]);

        const { email, password } = answers;

        console.log(`Checking if admin user '${email}' exists...`);
        try {
            await admin.auth().getUserByEmail(email);
            console.log('\x1b[33m%s\x1b[0m', `Admin user '${email}' already exists. No action taken.`);
            return;
        } catch (error) {
            if (error.code !== 'auth/user-not-found') {
                throw error;
            }
        }
        
        console.log(`Creating admin user '${email}'...`);
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: 'Administrator',
        });

        console.log('\x1b[32m%s\x1b[0m', 'Successfully created new admin user:');
        console.log(`- UID: ${userRecord.uid}`);
        console.log(`- Email: ${userRecord.email}`);

    } catch (error) {
        if (error.isTtyError) {
             console.error('\x1b[31m%s\x1b[0m', 'Error: Prompt could not be rendered in the current environment.');
        } else {
            console.error('\x1b[31m%s\x1b[0m', 'Error creating admin user:');
            console.error(error.message);
        }
    } finally {
        // The script will exit automatically, but we ensure the db connection is closed if we were using it.
        // For auth, this is not strictly necessary but good practice for other DB types.
    }
};

createAdminUser();
