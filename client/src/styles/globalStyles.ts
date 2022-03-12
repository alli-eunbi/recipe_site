import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'MapoFlowerIsland';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoFlowerIslandA.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
  * {
    outline:0;
    box-sizing: border-box;
    font-family: 'MapoFlowerIsland';
    margin: 0;
  }

  body {
    background-color: #f7faf7;
  }
`;

export default GlobalStyles;
