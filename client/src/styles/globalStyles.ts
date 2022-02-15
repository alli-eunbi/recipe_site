import { createGlobalStyle, css } from 'styled-components';

const font = css`
  @import url(//font.elice.io/EliceDigitalBaeum.css);

  font-family: 'Elice Digital Baeum', sans-serif;
`;
const GlobalStyles = createGlobalStyle`
  * {
    outline:0;
    box-sizing: border-box;
    ${font}
    margin: 0;
  }
`;

export default GlobalStyles;
