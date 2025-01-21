import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from './Firebase.js';
import { goto } from '$app/navigation';

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
// 	size: 'invisible',
// 	callback: (response) => {
// 		console.log('reCAPTCHA solved, allow signInWithPhoneNumber.');
// 		console.log(response);
// 		// reCAPTCHA solved, allow signInWithPhoneNumber.
// 		// onSignInSubmit();
// 	}
// });

const RecaptchaVerifier = firebase.auth.RecaptchaVerifier;

async function forgotPassword(email) {
    await firebase.auth().sendPasswordResetEmail(email);
}

async function createAccount(email, password) {
    console.log(email, password);
    try {
        await auth.createUserWithEmailAndPassword(email.trim(), password);
    } catch (error) {
        console.log(error.message);
    }
}
async function loginUserWithPassword(email, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
        console.log(error.message);
    }
}
async function loginWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    } catch (e) {
        console.error(e);
    }
}

async function signInWithPhoneNumber(phoneNumber, appVerifier) {
    try {
        const confirmationResult = await firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier);

        return confirmationResult;

        // const code = window.prompt(
        // 	'Please enter the verification code that was sent to your mobile device.'
        // );

        // confirmationResult
        // 	.confirm(code)
        // 	.then((result) => {
        // 		// User signed in successfully.
        // 		const user = result.user;
        // 		// ...
        // 		console.log(user);
        // 	})
        // 	.catch((error) => {
        // 		// User couldn't sign in (bad verification code?)
        // 		// ...
        // 		console.log(error);
        // 	});
    } catch (error) {
        console.log(error.message);
    }
}

// async function signUpwithPhone(phoneNumber) {
// 	try {
// 		const confirmationResult = await firebase.auth().console.log(confirmationResult);
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// }

// Where do i get the recaptchaVerifier?
// const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {

async function logout() {
    try {
        await auth.signOut();
        goto('/');
    } catch (e) {
        console.log(e.message);
    }
}

export {
    loginWithGoogle,
    logout,
    createAccount,
    loginUserWithPassword,
    forgotPassword,
    signInWithPhoneNumber,
    RecaptchaVerifier
};
