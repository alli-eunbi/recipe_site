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

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(5%);
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @keyframes fadeIn-short {
    0% {
      opacity: 0;
      transform: translateY(1%);
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;
