import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  form {
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 300px;
    background-color: #333;
    padding: 20px 30px;
    justify-content: center;
    border-radius: 20px;
    box-shadow: #1115 2px 2px 5px;
  }

  form label {
    margin-bottom: 10px;
  }

  form input {
    margin-bottom: 40px;
    background-color: #222;
    border: none;
    border-radius: 5px;
    height: 30px;
    color: #fff;
    padding: 5px 10px;
  }

  form input:focus {
    outline: none;
  }

  form button {
    background: #b36525;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    height: 30px;
    color: #fff;
    padding: 5px 10px;
    transition: 0.2s;
  }

  form button:hover {
    background: #9a571f;
  }

  form button:focus {
    outline: none;
  }
`;
