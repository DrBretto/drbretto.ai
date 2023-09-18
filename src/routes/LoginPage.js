import React from 'react';
import LoginForm from '../components/LoginForm';
import '../css/LoginPage.css';
import SlideTransitionWrapper from '../tools/SlideTransitionWrapper';

function LoginPage() {
  return (
    <div className="loginpage-background d-flex justify-content-center align-items-center">
      <SlideTransitionWrapper key="loginform">
        <LoginForm />
      </SlideTransitionWrapper>
    </div>
  );
}

export default LoginPage;
