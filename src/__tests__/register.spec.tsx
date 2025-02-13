import App from '../App';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router';
import { Skill } from '@/domain/skill';

const mockFetchSkills = jest.fn();
const mockInsertUser = jest.fn();
const mockShowMessage = jest.fn();
const mockNavigator = jest.fn();

jest.mock('@/utils/supabaseFunctions', () => ({
  fetchSkills: () => mockFetchSkills(),
  insertUser: () => mockInsertUser(),
}));

jest.mock('@/hooks/useMessage', () => ({
  useMessage: () => ({
    showMessage: mockShowMessage,
  }),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigator,
}));

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

Element.prototype.scrollTo = jest.fn();

describe('Register', () => {
  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = false;

    mockFetchSkills.mockResolvedValue([new Skill(1, 'React'), new Skill(2, 'TypeScript'), new Skill(3, 'GitHub')]);

    mockInsertUser.mockResolvedValue(Promise.resolve());

    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    mockInsertUser.mockClear();
  });

  test('タイトルが表示されていること', () => {
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
  });

  test('全項目入力して登録ボタンを押すとトップページに遷移すること', async () => {
    // 必須項目の入力
    await userEvent.type(screen.getByTestId('input-id'), 'tanaka');
    await userEvent.type(screen.getByTestId('input-name'), '田中太郎');
    await userEvent.type(screen.getByTestId('input-description'), '30歳のエンジニアです。');
    // スキル選択
    await userEvent.click(
      screen.getByRole('combobox', {
        name: '好きな技術 *',
      })
    );
    await userEvent.click(screen.getByText('React'));
    await userEvent.click(screen.getByText('TypeScript'));
    // オプション項目の入力
    await userEvent.type(screen.getByTestId('input-github-id'), 'tanaka_github');
    await userEvent.type(screen.getByTestId('input-qiita-id'), 'tanaka_qiita');
    await userEvent.type(screen.getByTestId('input-x-id'), 'tanaka_x');
    // フォーム送信
    const registerButton = screen.getByTestId('register-button');
    await userEvent.click(registerButton);

    // 登録成功の確認
    await waitFor(() => {
      expect(mockInsertUser).toHaveBeenCalledTimes(1);
    });

    // TOP画面への遷移を確認
    await waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith('/');
    });

    // トーストの確認
    await waitFor(() => {
      expect(mockShowMessage).toHaveBeenCalledWith({
        title: '登録が完了しました',
        type: 'success',
      });
    });
  });

  test('IDが未入力状態で登録された場合に、エラーメッセージが表示されること', async () => {
    // 必須項目の入力
    await userEvent.type(screen.getByTestId('input-name'), '田中太郎');
    await userEvent.type(screen.getByTestId('input-description'), '30歳のエンジニアです。');
    // スキル選択
    await userEvent.click(
      screen.getByRole('combobox', {
        name: '好きな技術 *',
      })
    );
    await userEvent.click(screen.getByText('React'));
    await userEvent.click(screen.getByText('TypeScript'));
    // オプション項目の入力
    await userEvent.type(screen.getByTestId('input-github-id'), 'tanaka_github');
    await userEvent.type(screen.getByTestId('input-qiita-id'), 'tanaka_qiita');
    await userEvent.type(screen.getByTestId('input-x-id'), 'tanaka_x');
    // フォーム送信
    const registerButton = screen.getByTestId('register-button');
    await userEvent.click(registerButton);

    // ID未入力のエラーメッセージが表示されていることを確認
    await waitFor(() => {
      const errorMessage = screen.getByText('好きな英単語の入力は必須です');
      expect(errorMessage).toBeInTheDocument();
    });

    // 登録処理が呼び出されていないことを確認
    await waitFor(() => {
      expect(mockInsertUser).toHaveBeenCalledTimes(0);
    });
  });

  test('名前が未入力状態で登録された場合に、エラーメッセージが表示されること', async () => {
    // 必須項目の入力
    await userEvent.type(screen.getByTestId('input-id'), 'tanaka');
    await userEvent.type(screen.getByTestId('input-description'), '30歳のエンジニアです。');
    // スキル選択
    await userEvent.click(
      screen.getByRole('combobox', {
        name: '好きな技術 *',
      })
    );
    await userEvent.click(screen.getByText('React'));
    await userEvent.click(screen.getByText('TypeScript'));
    // オプション項目の入力
    await userEvent.type(screen.getByTestId('input-github-id'), 'tanaka_github');
    await userEvent.type(screen.getByTestId('input-qiita-id'), 'tanaka_qiita');
    await userEvent.type(screen.getByTestId('input-x-id'), 'tanaka_x');
    // フォーム送信
    const registerButton = screen.getByTestId('register-button');
    await userEvent.click(registerButton);

    // 名前未入力のエラーメッセージが表示されていることを確認
    await waitFor(() => {
      const errorMessage = screen.getByText('名前の入力は必須です');
      expect(errorMessage).toBeInTheDocument();
    });

    // 登録処理が呼び出されていないことを確認
    await waitFor(() => {
      expect(mockInsertUser).toHaveBeenCalledTimes(0);
    });
  });

  test('自己紹介が未入力状態で登録された場合に、エラーメッセージが表示されること', async () => {
    // 必須項目の入力
    await userEvent.type(screen.getByTestId('input-id'), 'tanaka');
    await userEvent.type(screen.getByTestId('input-name'), '田中太郎');
    // スキル選択
    await userEvent.click(
      screen.getByRole('combobox', {
        name: '好きな技術 *',
      })
    );
    await userEvent.click(screen.getByText('React'));
    await userEvent.click(screen.getByText('TypeScript'));
    // オプション項目の入力
    await userEvent.type(screen.getByTestId('input-github-id'), 'tanaka_github');
    await userEvent.type(screen.getByTestId('input-qiita-id'), 'tanaka_qiita');
    await userEvent.type(screen.getByTestId('input-x-id'), 'tanaka_x');
    // フォーム送信
    const registerButton = screen.getByTestId('register-button');
    await userEvent.click(registerButton);

    // 名前未入力のエラーメッセージが表示されていることを確認
    await waitFor(() => {
      const errorMessage = screen.getByText('自己紹介の入力は必須です');
      expect(errorMessage).toBeInTheDocument();
    });

    // 登録処理が呼び出されていないことを確認
    await waitFor(() => {
      expect(mockInsertUser).toHaveBeenCalledTimes(0);
    });
  });

  test('好きな技術が未入力状態で登録された場合に、エラーメッセージが表示されること', async () => {
    // 必須項目の入力
    await userEvent.type(screen.getByTestId('input-id'), 'tanaka');
    await userEvent.type(screen.getByTestId('input-name'), '田中太郎');
    await userEvent.type(screen.getByTestId('input-description'), '30歳のエンジニアです。');
    // オプション項目の入力
    await userEvent.type(screen.getByTestId('input-github-id'), 'tanaka_github');
    await userEvent.type(screen.getByTestId('input-qiita-id'), 'tanaka_qiita');
    await userEvent.type(screen.getByTestId('input-x-id'), 'tanaka_x');
    // フォーム送信
    const registerButton = screen.getByTestId('register-button');
    await userEvent.click(registerButton);

    // 名前未入力のエラーメッセージが表示されていることを確認
    await waitFor(() => {
      const errorMessage = screen.getByText('好きな技術の入力は必須です');
      expect(errorMessage).toBeInTheDocument();
    });

    // 登録処理が呼び出されていないことを確認
    await waitFor(() => {
      expect(mockInsertUser).toHaveBeenCalledTimes(0);
    });
  });

  test('必須項目のみ入力して登録ボタンを押すとトップページに遷移すること', async () => {
    // 必須項目の入力
    await userEvent.type(screen.getByTestId('input-id'), 'tanaka');
    await userEvent.type(screen.getByTestId('input-name'), '田中太郎');
    await userEvent.type(screen.getByTestId('input-description'), '30歳のエンジニアです。');
    // スキル選択
    await userEvent.click(
      screen.getByRole('combobox', {
        name: '好きな技術 *',
      })
    );
    await userEvent.click(screen.getByText('React'));
    await userEvent.click(screen.getByText('TypeScript'));
    // フォーム送信
    const registerButton = screen.getByTestId('register-button');
    await userEvent.click(registerButton);

    // 登録成功の確認
    await waitFor(() => {
      expect(mockInsertUser).toHaveBeenCalledTimes(1);
    });

    // TOP画面への遷移を確認
    await waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith('/');
    });

    // トーストの確認
    await waitFor(() => {
      expect(mockShowMessage).toHaveBeenCalledWith({
        title: '登録が完了しました',
        type: 'success',
      });
    });
  });
});
