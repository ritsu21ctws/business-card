import { supabase } from './supabase';
import { User } from '@/domain/User';

export const fetchUser = async (id: string): Promise<User> => {
  const { data, error } = await supabase.from('users').select('*,user_skill(skills(name))').eq('user_id', id).limit(1).single();

  if (error) throw new Error(error.message);

  return data;
};
