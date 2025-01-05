import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { User } from '@/domain/user';
import { Skills } from '@/domain/skills';
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
          <p>
            {user?.github_url && (
              <a href={`${user?.github_url}`} target="_blank">
                GitHub
              </a>
            )}
          </p>
          <p>
            {user?.qiita_url && (
              <a href={`${user?.qiita_url}`} target="_blank">
                Qiita
              </a>
            )}
          </p>
          <p>
            {user?.x_url && (
              <a href={`${user?.x_url}`} target="_blank">
                X
              </a>
            )}
          </p>
        </div>
      )}
    </>
  );
});
