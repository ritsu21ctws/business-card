import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, Center, Link, Spinner, Stack } from '@chakra-ui/react';
import { DataListItem, DataListRoot } from '@/components/ui/data-list';
import { Prose } from '@/components/ui/prose';
import { FaGithub } from 'react-icons/fa';
import { SiQiita } from 'react-icons/si';
import { FaXTwitter } from 'react-icons/fa6';
import { User } from '@/domain/user';
import { fetchUser } from '@/utils/supabaseFunctions';
import { useMessage } from '@/hooks/useMessage';

export const BusinessCard: React.FC = memo(() => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { showMessage } = useMessage();

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
        showMessage({ title: 'データの取得に失敗しました', type: 'error' });
      });
  }, []);

  const onClickGoBackHome = () => {
    navigate('/');
  };

  return (
    <>
      {isLoading ? (
        <Center h="100vh">
          <Spinner data-testid="loading" />
        </Center>
      ) : (
        <div>
          <Center my="5">
            <Stack gap="5">
              <Card.Root width="340px" variant="elevated">
                <Card.Header>
                  <Card.Title fontSize={32} data-testid="name">
                    {user?.name}
                  </Card.Title>
                </Card.Header>
                <Card.Body gap="4">
                  <DataListRoot size="lg" variant="bold">
                    <DataListItem label="自己紹介" value={<Prose dangerouslySetInnerHTML={{ __html: user?.description ?? '' }}></Prose>} />
                  </DataListRoot>
                  <DataListRoot size="lg" variant="bold">
                    <DataListItem label="好きな技術" value={user?.skills.map((skill) => skill.name).join(', ')} />
                  </DataListRoot>
                </Card.Body>
                <Card.Footer justifyContent="space-between">
                  {user?.github_url && (
                    <Link href={user?.github_url} outline="none" target="_blank" fontSize="30px">
                      <FaGithub />
                    </Link>
                  )}
                  {user?.qiita_url && (
                    <Link href={user?.qiita_url} outline="none" target="_blank" fontSize="30px">
                      <SiQiita />
                    </Link>
                  )}
                  {user?.x_url && (
                    <Link href={user?.x_url} outline="none" target="_blank" fontSize="30px">
                      <FaXTwitter />
                    </Link>
                  )}
                </Card.Footer>
              </Card.Root>
              <Button variant="solid" type="submit" colorPalette="cyan" w="full" onClick={onClickGoBackHome}>
                戻る
              </Button>
            </Stack>
          </Center>
        </div>
      )}
    </>
  );
});
