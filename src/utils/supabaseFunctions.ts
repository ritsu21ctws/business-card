import { supabase } from './supabase';
import { User } from '@/domain/user';

export const fetchUser = async (id: string): Promise<User> => {
  const { data, error } = await supabase.from('users').select('*,skills(id, name)').eq('user_id', id).limit(1).single();

  if (error) throw new Error(error.message);

  const userData = User.createUser(data.user_id, data.name, data.description, data.skills, data.github_id, data.qiita_id, data.x_id, data.created_at);

  return userData;
};
