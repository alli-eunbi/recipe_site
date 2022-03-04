import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Cafe24SsurroundAir';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24SsurroundAir.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
  * {
    outline:0;
    box-sizing: border-box;
    font-family: 'Cafe24SsurroundAir';
    margin: 0;
  }

  body {
    background-color: #fcfceb;
  }
`;

export default GlobalStyles;
