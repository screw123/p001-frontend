import React from 'react';
import styled from 'styled-components';
import {
    CTAButton
} from '../component/BasicComponents.js'


const Modal = styled.div`
  .overlay {
      position: fixed;
      background: rgba(0,0,0,0.4);
      height: 100vh;
      width: 100%;
      top: 0;
      left: 0;
  }
  .modal-wrapper {
      background: white;
      border: 1px solid #d0cccc;
      box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);
      transition: all .8s;
      width: 60%;
      position: fixed;
      top: 25%;  
      left: 20%; 
      transform: translate(-50%, -50%);
      border-radius: 25px;
  }

  .modal-datepicker {
    width: 40%;
    left: 30%;
    top: 15%
  } 

  .modal-header {
      background: #fff;
      height: 40px;
      line-height: 40px;
      padding: 5px 20px;
      text-align: center;
      border-radius: 25px;
  }

  .modal-header h3 {
      color: white;
      float: left;
      margin: 0;
      padding: 0;
  }

  .modal-body {
      padding: 10px 15px;
      text-align: center;
  }

  .close-modal-btn {
      color: black;
      cursor: pointer;
      float: right;
      font-size: 30px;
      margin: 0;
  }

  .btn-cancel {
    display: block;
    background: transparent;
    border: none;
    color: #E61D6E; 
    font-size: 24px;
    margin: 0 auto;
    padding-bottom: 1rem;
  }


  .back-drop {
      background-color: rgba(48, 49, 48, 0.42);
      height: 100%;
      position: fixed;
      transition: all 1.3s;
      width: 100%;
  }

  .open-modal-btn {
      margin: 15px;
      padding: 10px;
  }
`




const PowerModal = (props) => {
    return (
        <Modal>
            <div className="overlay"
                style={{
                    display: props.show ? 'block' : 'none'
                }}>
            </div>
            <div className={"modal-wrapper " + props.className }
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                    display: props.show ? 'block' : 'none'
                }}>
                <div className="modal-header">
                    <h3>{props.header}</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    {props.children}

                    <div style={{
                      display: props.Btn ? 'block' : 'none'
                    }}>
                        <CTAButton onClick={props.Action}>{props.BtnConfirm}</CTAButton>
                        <button className="btn-cancel" onClick={props.close}>{props.BtnClose}</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PowerModal;