import {
  getAuth,
  signInWithPopup,
  // GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';

import { auth, provider } from '@/config/firebase';
import { paths } from '@/config/paths';
import { User } from '@/types/api';

import { api } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features
const getUser = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    console.log('Checking Firebase auth state...');

    const authInstance = getAuth();
    const unsubscribe = authInstance.onAuthStateChanged(async (user) => {
      console.log('onAuthStateChanged triggered. User:', user);

      if (!user) {
        localStorage.removeItem('userToken');
        resolve(null);
        unsubscribe();
        return;
      }

      try {
        const userToken = await user.getIdToken();
        console.log('User token retrieved:', userToken);

        localStorage.setItem('userToken', `Bearer ${userToken}`);

        const userData = {
          name: user.displayName || '',
          email: user.email || '',
          avatar: user.photoURL || '',
          createdAt: user.metadata.creationTime || '',
        };
        console.log('Sending user data to backend:', userData);

        const response = (await api.post('/user', userData, {
          headers: { Authorization: `Bearer ${userToken}` },
        })) as User;
        console.log('User data from backend:', response);

        resolve({
          id: response.id,
          name: response.name || '',
          email: response.email || '',
          avatar: userData.avatar || '',
          createdAt: response.createdAt || '',
        });
      } catch (error) {
        console.error('Error creating user:', error);
        resolve(null);
      } finally {
        unsubscribe();
      }
    });
  });
};

// Sign in with Google OAuth
const loginWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken();
    localStorage.setItem('userToken', idToken);

    return {
      id: user.uid,
      email: user.email || '',
      name: user.displayName || '',
      createdAt: user.metadata.creationTime || '',
    };
  } catch (error) {
    console.error('Google Login Failed:', error);
    throw error;
  }
};

const logout = async () => {
  await signOut(getAuth());
  localStorage.removeItem('userToken');
};

const authConfig = {
  userFn: getUser,
  loginFn: loginWithGoogle, // Replaces email/password login
  registerFn: loginWithGoogle, // Google OAuth acts as both login and registration
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useUser();
  const location = useLocation();

  console.log('User data:', user);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator instead of redirecting too soon
  }

  if (!user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
