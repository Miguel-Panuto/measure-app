import styled from 'styled-components';

interface ButtonProps {
    isActivated: boolean;
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    a {
        margin: 10px 10px 0 10px;
        color: #ccc;
        text-decoration: none;
        transition: 0.2s
    }

    a:hover {
        color: #bbb;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 15vh;
`;

export const Button = styled.button`
    margin: 20px 20px;
    padding: 10px;
    border: none;
    width: 100px;
    text-align: center;
    background-color: ${(props: ButtonProps) => props.isActivated? '#292' : '#922'};
    font-weight: bold;
    border-radius: 20px;
    box-shadow: #1119 4px 4px 4px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: ${(props: ButtonProps) => props.isActivated? '#272' : '#722'};
    }

    &:focus {
        outline: none;
    }
`;

export const UsagesContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 75vh;
    padding: 0 10%;
`;

export const Usage = styled.div`
    width: 30%;
    display: flex;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    background-color: #777;
    border-radius: 20px;
    padding: 30px;

    h2 {
        font-size: 1.2rem;
        margin-bottom: 10px;
    }
    h3 {
        margin-bottom: 20px;
    }

    span {
        margin-bottom: 15px;

    }
`;