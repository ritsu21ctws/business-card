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
    public created_at: string
  ) {}
}
