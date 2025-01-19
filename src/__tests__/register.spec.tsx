import App from '../App';
import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router';
import { User } from '@/domain/user';
import { Skill } from '@/domain/skill';

const mockFetchUser = jest.fn();
const mockFetchSkills = jest.fn();
const mockNavigator = jest.fn();

jest.mock('@/utils/supabaseFunctions', () => {
  return {
    fetchUser: () => mockFetchUser(),
    fetchSkills: () => mockFetchSkills(),
  };
});

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigator,
}));

describe('Register', () => {
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

    mockFetchSkills.mockResolvedValue([new Skill(1, 'React'), new Skill(2, 'TypeScript'), new Skill(3, 'GitHub')]);

    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </MemoryRouter>
    );
  });

  test('タイトルが表示されていること', () => {
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
  });
});
