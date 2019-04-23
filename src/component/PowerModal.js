import React from 'react';
import styled from 'styled-components';
import {
  CTAButton
} from '../component/BasicComponents.js'


const Modal = styled.div`
  .modal-wrapper {
      background: white;
      border: 1px solid #d0cccc;
      box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);
      margin: 100px auto 0;
      transition: all .8s;
      width: 60%;
  }

  .modal-header {
      background: #fff;
      height: 40px;
      line-height: 40px;
      padding: 5px 20px;
      text-align: center;
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

  .modal-footer {
      background: #263238;
      height: 35px;
      padding: 15px;
  }

  .close-modal-btn {
      color: white;
      cursor: pointer;
      float: right;
      font-size: 30px;
      margin: 0;
  }

  .close-modal-btn:hover {
      color: black;
  }

  .btn-cancel, .btn-continue {
      background: coral;
      border: none;
      color: white;
      cursor: pointer;
      font-weight: bold;
      outline: none;
      padding: 10px;
  }

  .btn-cancel {
      background-color: #b71c1c;
      float: left;
  }

  .btn-continue {
      background-color: #1b5e20;
      float: right;
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
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>{props.header}</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                  {props.children}
                </div>
                <div className="modal-footer">
                    <CTAButton >CONTINUE</CTAButton>
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                </div>
            </div>
        </Modal>
    )
}

export default PowerModal;