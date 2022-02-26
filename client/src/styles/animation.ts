import { css } from 'styled-components';

export const animation = css`
  @keyframes appearText {
    0% {
      opacity: 0;
      transform: translateY(-10%);
    }

    50% {
      opacity: 0.5;
      transform: translateY(0%);
    }

    100% {
      opacity: 1;
      transform: translateY(-20%);
    }
  }
`;
