import React, { memo } from 'react';
import { Button, Card, Center, createListCollection, Heading, Textarea, Input, Stack } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';

export const Register: React.FC = memo(() => {
  const technologies = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'GitHub', value: 'github' },
    ],
  });
  return (
    <>
      <Center my="5">
        <Stack>
          <Heading as="h1" mb="2" textAlign="center">
            名刺新規登録
          </Heading>
          <Card.Root width="340px" variant="elevated">
            <Card.Body>
              <Stack gap="4" w="full">
                <Field label="好きな英単語" required>
                  <Input placeholder="coffee" />
                </Field>
                <Field label="名前" required>
                  <Input />
                </Field>
                <Field label="自己紹介" required>
                  <Textarea placeholder="<h1>HTMLタグも使えます</h1>" />
                </Field>
                <Field label="好きな技術" required>
                  <SelectRoot multiple collection={technologies} size="sm">
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
                </Field>
                <Field label="GitHub ID">
                  <Input />
                </Field>
                <Field label="Qiita ID">
                  <Input />
                </Field>
                <Field label="X ID">
                  <Input placeholder="@は不要" />
                </Field>
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">キャンセル</Button>
              <Button variant="solid">登録</Button>
            </Card.Footer>
          </Card.Root>
        </Stack>
      </Center>
    </>
  );
});
