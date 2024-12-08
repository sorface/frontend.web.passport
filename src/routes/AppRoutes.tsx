import React, {FunctionComponent, useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {pathnames} from '../constants';
import {NotFound} from '../pages/NotFound/NotFound';
import {SignIn} from '../pages/SignIn/SignIn';
import {SignUp} from '../pages/SignUp/SignUp';
import {SignUpConfirm} from '../pages/SignUpConfirm/SignUpConfirm';
import {Activate} from '../pages/Activate/Activate';
import {ProtectedRoute} from './ProtectedRoute';
import {Failure} from "../pages/Failure/Failure";
import {REDIRECT_PROFILE_PAGE} from "../config";

export const AppRoutes: FunctionComponent = () => {
    const {account} = useContext(AuthContext);
    const authenticated = !!account;

    const authenticatedRouteProps = {
        allowed: authenticated,
        redirect: pathnames.signIn,
    };

    const notAuthenticatedRouteProps = {
        allowed: !authenticated,
        redirect: REDIRECT_PROFILE_PAGE,
    };

    return (
        <Routes>
            <Route path={pathnames.signUp} element={
                <ProtectedRoute {...notAuthenticatedRouteProps}>
                    <SignUp/>
                </ProtectedRoute>
            }/>
            <Route path={pathnames.signUpConfirm} element={
                <ProtectedRoute {...notAuthenticatedRouteProps}>
                    <SignUpConfirm/>
                </ProtectedRoute>
            }/>
            <Route path={pathnames.signIn} element={
                <ProtectedRoute {...notAuthenticatedRouteProps}>
                    <SignIn/>
                </ProtectedRoute>
            }/>
        </Routes>
    );
};
