import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
    }
  
  .modal-main {
    position:fixed;
    background: white;
    width: 80%;
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding: 20px;
  }
  
  .display-block {
    display: block;
  }
  
  .display-none {
    display: none;
  }
`;

export default function Modal({ handleClose, show, children }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <ModalWrapper>
            <div className={showHideClassName}>
                <section className="modal-main">
                    {children}
                    <button type="button" onClick={handleClose}>
                        Close
                    </button>
                </section>
            </div>
        </ModalWrapper>
    );
};