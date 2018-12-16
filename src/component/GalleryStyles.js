import styled, { keyframes } from "styled-components";

export const SectionHeader = styled.div`
    font-weight: 600;
    font-size: 1.5em;
    padding: 1em;
    display: inline-block;
`;

export const HeaderText = styled.span`
    padding: 1em;
`;

////////////
// Modal
///////////
export const Cell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Name = styled.div`
    width: ${props => props.width + "px"};
    text-align: center;
    font-weight: bold;
    background: darkslategrey;
    color: white;
`;

export const Image = styled.span`
    cursor: pointer;
    position: relative;
`;
const anime = keyframes`
  from { transform:scale(0); } 
  to { transform:scale(1); }
`;

export const Modal = styled.div`
    position: fixed;
    z-index: 999;
    padding-top: 10vh;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.85);
`;

export const Close = styled.div`
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
    &:hover {
        color: #bbb;
        text-decoration: none;
        cursor: pointer;
    }
`;
export const Content = styled.span`
    width: 100%;
    display: flex;
    justify-content: center;
    animation: ${anime} 0.7s;
`;
export const Caption = styled.div`
    margin: auto;
    display: block;
    width: 100%;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
    animation: ${anime} 0.7s;
`;

////////////
// Overlay
///////////
export const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: 0.3s ease-out;
    opacity: ${props => (props.overlay ? 1 : 0)};
    background-color: ${props => (props.overlay ? "#ff4477" : "none")};
    ${Image}:hover & {
        opacity: 1;
    }
`;
export const Icon = styled.div`
    color: white;
    font-size: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    transition: 0.3s ease-out;
`;
