import {auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signOut = () => {
    return auth.signOut();
}