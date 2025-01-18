import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, Center, Heading, Input, Stack } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';

export const Home: React.FC = memo(() => {
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
      <Stack>
        <Heading as="h1" mb="2" textAlign="center" data-testid="title">
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
                  render={({ field }) => <Input {...field} />}
                />
              </Field>
            </Card.Body>
            <Card.Footer>
              <Button variant="solid" type="submit" aria-label="Submit" colorPalette="cyan" w="full">
                名刺をみる
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
      </Stack>
    </Center>
  );
});
