import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index';


function SignUpFormModal({showSignUp, setShowSignUp}) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showSignUp && (
        <Modal className='login-modal' onClose={() => setShowSignUp(false)}>
          <SignupFormPage setSignUpFormModal={setShowSignUp}/>
        </Modal>
      )}
    </>
  );
}


export default SignUpFormModal;
