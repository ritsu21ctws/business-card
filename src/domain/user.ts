import { Skills } from './skills';

export class User {
  constructor(
    public user_id: string,
    public name: string,
    public description: string,
    public user_skill: Array<Skills>,
    public github_id: string,
    public qiita_id: string,
    public x_id: string,
    public created_at: string,
    public github_url?: string | null,
    public qiita_url?: string | null,
    public x_url?: string | null
  ) {}

  public static createUser(
    user_id: string,
    name: string,
    description: string,
    user_skill: Array<Skills>,
    github_id: string,
    qiita_id: string,
    x_id: string,
    created_at: string
  ): User {
    return new User(
      user_id,
      name,
      description,
      user_skill,
      github_id,
      qiita_id,
      x_id,
      created_at,
      formatGitHubUrl(github_id),
      formatQiitaUrl(qiita_id),
      formatXUrl(x_id)
    );
  }
}

function formatGitHubUrl(github_id: string): string | null {
  return github_id ? `https://github.com/${github_id}` : null;
}

function formatQiitaUrl(qiita_id: string): string | null {
  return qiita_id ? `https://qiita.com/${qiita_id}` : null;
}

function formatXUrl(x_id: string): string | null {
  return x_id ? `https://x.com/${x_id}` : null;
}
