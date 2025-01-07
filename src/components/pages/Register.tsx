import React, { memo } from 'react';
import { Button, Card, Center, createListCollection, Heading, Textarea, Input, Stack } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { Controller, useForm } from 'react-hook-form';
import { FormData } from '@/domain/formData';

export const Register: React.FC = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const technologies = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'GitHub', value: 'github' },
    ],
  });

  const onSubmit = handleSubmit((data: FormData) => {
    console.log(data);
  });

  return (
    <>
      <Center my="5">
        <Stack>
          <Heading as="h1" mb="2" textAlign="center">
            名刺新規登録
          </Heading>
          <Card.Root width="340px" variant="elevated">
            <form onSubmit={onSubmit}>
              <Card.Body>
                <Stack gap="4" w="full">
                  <Field label="好きな英単語 *" invalid={!!errors.user_id} errorText={errors.user_id?.message}>
                    <Controller
                      name="user_id"
                      control={control}
                      rules={{
                        required: '好きな英単語の入力は必須です',
                        pattern: { value: /^[a-zA-Z]+$/, message: '好きな英単語は半角英字で入力してください。' },
                      }}
                      render={({ field }) => <Input {...field} placeholder="coffee" />}
                    />
                  </Field>
                  <Field label="名前 *" invalid={!!errors.name} errorText={errors.name?.message}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: '名前の入力は必須です',
                      }}
                      render={({ field }) => <Input {...field} />}
                    />
                  </Field>
                  <Field label="自己紹介 *" invalid={!!errors.description} errorText={errors.description?.message}>
                    <Controller
                      name="description"
                      control={control}
                      rules={{
                        required: '自己紹介の入力は必須です',
                      }}
                      render={({ field }) => <Textarea {...field} placeholder="<h1>HTMLタグも使えます</h1>" />}
                    />
                  </Field>
                  <Field label="好きな技術" invalid={!!errors.skills} errorText={errors.skills?.message}>
                    <Controller
                      name="skills"
                      control={control}
                      rules={{
                        required: '好きな技術の入力は必須です',
                      }}
                      render={({ field }) => (
                        <SelectRoot
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => field.onChange(value)}
                          onInteractOutside={() => field.onBlur()}
                          multiple
                          collection={technologies}
                        >
                          <SelectTrigger>
                            <SelectValueText placeholder="Select Option" />
                          </SelectTrigger>
                          <SelectContent>
                            {technologies.items.map((technology) => (
                              <SelectItem item={technology} key={technology.value}>
                                {technology.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectRoot>
                      )}
                    />
                  </Field>
                  <Field label="GitHub ID">
                    <Controller name="github_id" control={control} render={({ field }) => <Input {...field} />} />
                  </Field>
                  <Field label="Qiita ID">
                    <Controller name="qiita_id" control={control} render={({ field }) => <Input {...field} />} />
                  </Field>
                  <Field label="X ID">
                    <Controller name="x_id" control={control} render={({ field }) => <Input {...field} />} />
                  </Field>
                  *は必須項目です
                </Stack>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button variant="solid" type="submit" aria-label="Submit" colorPalette="cyan" w="full">
                  登録
                </Button>
              </Card.Footer>
            </form>
          </Card.Root>
        </Stack>
      </Center>
    </>
  );
});
