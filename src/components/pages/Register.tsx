import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, Center, createListCollection, Heading, Textarea, Input, Stack, ListCollection } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { FormData } from '@/domain/formData';
import { useMessage } from '@/hooks/useMessage';
import { fetchSkills, insertUser } from '@/utils/supabaseFunctions';

export const Register: React.FC = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      user_id: '',
      name: '',
      description: '',
      github_id: '',
      qiita_id: '',
      x_id: '',
    },
  });
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const [skills, setSkills] = useState<ListCollection<{ label: string; value: string }> | null>(null);

  useEffect(() => {
    fetchSkills()
      .then((data) => {
        setSkills(createListCollection({ items: data.map((skill) => ({ label: skill.name, value: skill.id.toString() })) }));
      })
      .catch(() => {
        showMessage({ title: 'データの取得に失敗しました', type: 'error' });
      });
  }, []);

  const onSubmit = handleSubmit((data: FormData) => {
    const transformedData = {
      ...data,
      github_id: data.github_id || null,
      qiita_id: data.qiita_id || null,
      x_id: data.x_id || null,
    };
    insertUser(transformedData)
      .then(() => {
        showMessage({ title: '登録が完了しました', type: 'success' });
        navigate('/');
      })
      .catch(() => {
        showMessage({ title: '登録に失敗しました', type: 'error' });
      });
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
                          collection={skills || createListCollection({ items: [] })}
                        >
                          <SelectTrigger>
                            <SelectValueText placeholder="Select Option" />
                          </SelectTrigger>
                          <SelectContent>
                            {skills?.items.map((skill) => (
                              <SelectItem item={skill} key={skill.value}>
                                {skill.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectRoot>
                      )}
                    />
                  </Field>
                  <Field label="GitHub ID">
                    <Controller name="github_id" control={control} render={({ field }) => <Input {...field} value={field.value || ''} />} />
                  </Field>
                  <Field label="Qiita ID">
                    <Controller name="qiita_id" control={control} render={({ field }) => <Input {...field} value={field.value || ''} />} />
                  </Field>
                  <Field label="X ID">
                    <Controller
                      name="x_id"
                      control={control}
                      render={({ field }) => <Input {...field} value={field.value || ''} placeholder="@は不要" />}
                    />
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
