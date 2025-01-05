import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { User } from '@/domain/User';
import { Skills } from '@/domain/Skills';
import { fetchUser } from '@/utils/supabaseFunctions';

export const BusinessCard: React.FC = memo(() => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (!id) return;

    fetchUser(id)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => {
        return;
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <p>ローディング中</p>
      ) : (
        <div>
          <p>{`名前：${user?.name}`}</p>
          <p>{`自己紹介：${user?.description}`}</p>
          <p>
            {`スキル：`}
            {user?.user_skill.map((value: Skills) => value.skills.name).join(', ')}
          </p>
          <p>{`GitHub：${user?.github_id ?? ''}`}</p>
          <p>{`Qiita：${user?.qiita_id ?? ''}`}</p>
          <p>{`X：${user?.x_id ?? ''}`}</p>
        </div>
      )}
    </>
  );
});
