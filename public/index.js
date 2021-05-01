try {

    // Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    let config = {
        apiKey: "AIzaSyDMnPu03ytght2slOsivK4J4MpbeNCm-8E",
        authDomain: "bearforcedata.firebaseapp.com",
        databaseURL: "https://bearforcedata-default-rtdb.firebaseio.com",
        projectId: "bearforcedata",
        storageBucket: "bearforcedata.appspot.com",
        messagingSenderId: "24452847724",
        appId: "1:24452847724:web:2b5ad9a8e095e013b8a049",
        measurementId: "G-W6632Q9H80"
    };
    // Initialize Firebase if not already initialized
    if (firebase.apps.length === 0) {
        firebase.initializeApp({});
    }
    let app = firebase.app();
    let features = [
        'auth',
        //   'database', 
        'firestore',
        //   'functions',
        //   'messaging', 
        'storage',
        'analytics',
        //   'remoteConfig',
        //   'performance',
    ].filter(feature => typeof app[feature] === 'function');

    firebase.auth().languageCode = 'en';

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.   
            const phoneSection = document.createElement('section')
            const phoneInput = document.createElement('input');
            phoneSection.appendChild(phoneInput);
            const phoneSubmit = document.createElement('button');
            phoneSubmit.textContent = 'submit';
            phoneSubmit.addEventListener('click', () => {
                if (phoneInput.value && phoneInput.value == "+1 971-678-6247") {
                    console.log(phoneInput.value);
                    const phoneNumber = phoneInput.value;
                    const appVerifier = window.recaptchaVerifier;
                    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                        .then((confirmationResult) => {
                            // SMS sent. Prompt user to type the code from the message, then sign the
                            // user in with confirmationResult.confirm(code).
                            window.confirmationResult = confirmationResult;
                            console.log(confirmationResult);
                            // ...
                        }).catch((error) => {
                            // Error; SMS not sent
                            console.log(error);
                        });
                }
            });
            phoneSection.appendChild(phoneSubmit);
            document.body.appendChild(phoneSection);
        },
        'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            console.log("reCAPTCHA expired");
        }
    });
    window.recaptchaVerifier.render()


} catch (e) {
    console.error(e);
}