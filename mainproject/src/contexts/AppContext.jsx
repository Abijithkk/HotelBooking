// AppContext.js

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Toast from '../components/Toast';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { loadStripe } from '@stripe/stripe-js';


const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

const AppContext = React.createContext();

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);

  const { isError } = useQuery('validateToken', apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Add prop type validation for children
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
