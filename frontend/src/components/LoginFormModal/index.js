// frontend/src/components/LoginFormModal/index.js
//Updates from Bonus
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm'

function LoginFormModal({showLoginModal, setShowLoginModal}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showLoginModal && (
        <Modal className='login-modal' onClose={() => setShowLoginModal(false)}>
          <LoginForm setShowLoginModal={setShowLoginModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
