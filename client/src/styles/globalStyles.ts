import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Cafe24Ohsquareair';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/Cafe24Ohsquareair.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
  * {
    outline:0;
    box-sizing: border-box;
    font-family: 'Cafe24Ohsquareair';
    margin: 0;
  }
`;

export default GlobalStyles;
