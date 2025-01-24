import App from '../App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router';

const mockNavigator = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigator,
}));

describe('Top', () => {
  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = false;

    render(
      <MemoryRouter initialEntries={['/']}>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    mockNavigator.mockClear();
  });

  test('タイトルが表示されていること', () => {
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
  });

  test('IDを入力してボタンを押すと/cards/:idに遷移すること', async () => {
    await userEvent.type(screen.getByTestId('input-id'), 'tea');
    const submitButton = await screen.findByTestId('submit-button');
    await userEvent.click(submitButton);

    expect(mockNavigator).toHaveBeenCalledWith('/cards/tea');
  });
});
