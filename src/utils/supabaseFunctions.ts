import { FormData } from '@/domain/formData';
import { supabase } from './supabase';
import { User } from '@/domain/user';
import { Skill } from '@/domain/skill';

export const fetchUser = async (id: string): Promise<User> => {
  const { data, error } = await supabase.from('users').select('*,skills(id, name)').eq('user_id', id).limit(1).single();

  if (error) throw new Error(error.message);

  const userData = User.createUser(data.user_id, data.name, data.description, data.skills, data.github_id, data.qiita_id, data.x_id, data.created_at);

  return userData;
};

export const fetchSkills = async (): Promise<Array<Skill>> => {
  const { data, error } = await supabase.from('skills').select('*');
  if (error) throw new Error(error.message);

  return data;
};

export const insertUser = async (formData: FormData): Promise<User> => {
  const { user_id, name, description, skills, github_id, qiita_id, x_id } = formData;
  const { data, error } = await supabase.rpc('insert_user', {
    user_id,
    name,
    description,
    github_id,
    qiita_id,
    x_id,
    skills: skills.map(Number),
  });

  if (error) throw new Error(error.message);

  return data;
};
