import React, { memo } from 'react';
import { Center, Heading } from '@chakra-ui/react';

export const Home: React.FC = memo(() => {
  return (
    <Center my="5">
      <Heading as="h1" data-testid="title">
        デジタル名詞アプリ
      </Heading>
    </Center>
  );
});
