import App from '../App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router';
import { User } from '@/domain/user';

const mockFetchUser = jest.fn();
const mockNavigator = jest.fn();

jest.mock('@/utils/supabaseFunctions', () => ({
  fetchUser: () => mockFetchUser(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigator,
}));

describe('BusinessCard', () => {
  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = false;
    mockFetchUser.mockResolvedValue(
      User.createUser(
        'tea',
        'John Doe',
        'A passionate software developer.',
        [
          { id: 1, name: 'React' },
          { id: 3, name: 'GitHub' },
        ],
        'johndoe_x',
        'johndoe_qiita',
        'johndoe_x',
        '2025-01-02T12:17:25.278697+00:00'
      )
    );

    render(
      <MemoryRouter initialEntries={['/cards/tea']}>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </MemoryRouter>
    );
  });

  test('ローディング画面が表示されること', () => {
    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
  });

  test('名前が表示されていること', async () => {
    const name = await screen.findByTestId('name');
    expect(name).toHaveTextContent('John Doe');
  });

  test('自己紹介が表示されていること', async () => {
    const description = await screen.findByTestId('description');
    expect(description).toHaveTextContent('A passionate software developer.');
  });

  test('好きな技術が表示されていること', async () => {
    const skills = await screen.findByTestId('skills');
    expect(skills).toHaveTextContent('React, GitHub');
  });

  test('GitHubのアイコンが表示されていること', async () => {
    const githubIcon = await screen.findByTestId('github-icon');
    expect(githubIcon).toBeInTheDocument();
  });

  test('Qiitaのアイコンが表示されていること', async () => {
    const qiitaIcon = await screen.findByTestId('qiita-icon');
    expect(qiitaIcon).toBeInTheDocument();
  });

  test('Xのアイコンが表示されていること', async () => {
    const xIcon = await screen.findByTestId('x-icon');
    expect(xIcon).toBeInTheDocument();
  });

  test('戻るボタンをクリックするとトップページに遷移する', async () => {
    const backButton = await screen.findByTestId('back-button');
    await userEvent.click(backButton);
    expect(mockNavigator).toHaveBeenCalledWith('/');
  });
});
