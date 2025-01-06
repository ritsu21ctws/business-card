import { createSystem, defaultConfig } from '@chakra-ui/react';

const theme = createSystem(defaultConfig, {
  globalCss: {
    'html, body': {
      backgroundColor: 'gray.50',
      letterSpacing: 'wider',
    },
  },
});

export default theme;
