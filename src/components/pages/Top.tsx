import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, Center, Heading, Input, Link, Stack } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';

export const Top: React.FC = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: '',
    },
  });
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    navigate(`/cards/${data.id}`);
  });

  return (
    <Center my="5">
      <Stack gap="4">
        <Heading as="h1" textAlign="center" data-testid="title">
          デジタル名詞アプリ
        </Heading>
        <Card.Root width="340px" variant="elevated">
          <form onSubmit={onSubmit}>
            <Card.Body>
              <Field label="ID" invalid={!!errors.id} errorText={errors.id?.message}>
                <Controller
                  name="id"
                  control={control}
                  rules={{
                    required: 'IDの入力は必須です',
                  }}
                  render={({ field }) => <Input {...field} data-testid="input-id" />}
                />
              </Field>
            </Card.Body>
            <Card.Footer>
              <Button variant="solid" type="submit" colorPalette="cyan" w="full" data-testid="submit-button">
                名刺をみる
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
        <Link justifyContent="center" href="cards/register" outline="none">
          新規登録はこちら
        </Link>
      </Stack>
    </Center>
  );
});
