import App from '../App';
import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router';

describe('App', () => {
  test('タイトルがあること', async () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    );
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
  });
});
