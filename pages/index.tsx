import React from 'react'
import Layout from '@/components/Layout'
import { Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import classes from './Authentication.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout onlyWrapper>
      <div className="h-screen flex flex-col justify-center">
        <Container
        className='w-full'
        size={420}
        >
          <Title ta="center" className={classes.title}>
            Welcome back!
          </Title>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="app@admin.dev" required />
            <PasswordInput label="Password" placeholder="Your password" required mt="md" />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Link href={'/dashboard'}>
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Link>
            </Group>
            <Button fullWidth mt="xl">
              Sign in
            </Button>
          </Paper>
        </Container>
      </div>
    </Layout>
  )
}
