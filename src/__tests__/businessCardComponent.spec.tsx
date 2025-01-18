import App from '../App';
import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router';
import { User } from '@/domain/user';

const mockFetchUser = jest.fn();

jest.mock('@/utils/supabaseFunctions', () => {
  return {
    fetchUser: () => mockFetchUser(),
  };
});

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
});
