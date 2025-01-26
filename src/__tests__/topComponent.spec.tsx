import App from '../App';
import { render, screen, waitFor } from '@testing-library/react';
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

  test('IDを入力しないでボタンを押すとエラーメッセージが表示されること', async () => {
    const submitButton = await screen.findByTestId('submit-button');
    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('IDの入力は必須です');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('新規登録はこちらを押すと/cards/registerに遷移すること', async () => {
    const registerLink = screen.getByTestId('register-link');
    await userEvent.click(registerLink);

    expect(mockNavigator).toHaveBeenCalledWith('/cards/register');
  });
});
