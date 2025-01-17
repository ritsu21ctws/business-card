import React, { memo } from 'react';
import { Button, Card, Center, Heading, Input, Stack } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';

export const Home: React.FC = memo(() => {
  return (
    <Center my="5">
      <Stack>
        <Heading as="h1" mb="2" textAlign="center" data-testid="title">
          デジタル名詞アプリ
        </Heading>
        <Card.Root width="340px" variant="elevated">
          <Card.Body>
            <Field label="ID">
              <Input />
            </Field>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="solid" type="submit" aria-label="Submit" colorPalette="cyan" w="full">
              名刺をみる
            </Button>
          </Card.Footer>
        </Card.Root>
      </Stack>
    </Center>
  );
});
