import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Center, Icon, Link, Spinner } from '@chakra-ui/react';
import { DataListItem, DataListRoot } from '@/components/ui/data-list';
import { Prose } from '@/components/ui/prose';
import { FaGithub } from 'react-icons/fa';
import { SiQiita } from 'react-icons/si';
import { FaXTwitter } from 'react-icons/fa6';
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
        <Center h="100vh">
          <Spinner data-testid="loading" />
        </Center>
      ) : (
        <div>
          <Center mt="10">
            <Card.Root width="320px" variant="elevated">
              <Card.Header>
                <Card.Title>{user?.name}</Card.Title>
              </Card.Header>
              <Card.Body gap="4">
                <DataListRoot size="lg" variant="bold">
                  <DataListItem label="自己紹介" value={<Prose dangerouslySetInnerHTML={{ __html: user?.description ?? '' }}></Prose>} />
                </DataListRoot>
                <DataListRoot size="lg" variant="bold">
                  <DataListItem label="好きな技術" value={user?.user_skill.map((value: Skills) => value.skills.name).join(', ')} />
                </DataListRoot>
              </Card.Body>
              <Card.Footer justifyContent="space-between">
                <p>
                  {user?.github_url && (
                    <Link href={user?.github_url} outline="none" target="_blank">
                      <Icon fontSize="30px">
                        <FaGithub />
                      </Icon>
                    </Link>
                  )}
                </p>
                <p>
                  {user?.qiita_url && (
                    <Link href={user?.qiita_url} outline="none" target="_blank">
                      <Icon fontSize="30px">
                        <SiQiita />
                      </Icon>
                    </Link>
                  )}
                </p>
                <p>
                  {user?.x_url && (
                    <Link href={user?.x_url} outline="none" target="_blank">
                      <Icon fontSize="30px">
                        <FaXTwitter />
                      </Icon>
                    </Link>
                  )}
                </p>
              </Card.Footer>
            </Card.Root>
          </Center>
        </div>
      )}
    </>
  );
});
