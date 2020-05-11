import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        src: url('./assets/fonts/Roboto-Regular.ttf');
        font-weight: normal;
    }
    @font-face {
        font-family: 'Roboto';
        src: url('./assets/fonts/Roboto-Bold.ttf');
        font-weight: bold;
    }
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
    }

    body {
        background-color: #222;
        font-family: 'Roboto', sans-serif;
        color: #fff;
    }
`;

export const Page = styled.div``;
