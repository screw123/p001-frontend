import React from 'react';
import styled from 'styled-components';
import {
    CTAButton
} from '../component/BasicComponents.js'


const Modal = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left:0 ; 
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;

    .overlay {
        position: absolute;
        background: rgba(0,0,0,0.4);
        height: 100vh;
        width: 100%;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1;
    }
    .modal-wrapper {
        background: white;
        border: 1px solid #d0cccc;
        box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);
        transition: all .8s;
        width: 85%;
        position: absolute;
        top: 50%;  
        left: 50%; 
        transform: translate(-50%, -50%) !important;
        border-radius: 25px;
        z-index: 2;

        @media screen and (min-width: 768px) {
            width: 60%;
        }
    }

    .modal-datepicker {
        width: 95%;
        @media screen and (min-width: 768px) {
            max-width: 60%
        }

        @media screen and (min-width: 1024px) {
            max-width: 40%
        }
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
            <div className={"modal-wrapper " + props.className}
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