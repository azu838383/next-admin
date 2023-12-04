import React from 'react'
import Layout from '@/components/Layout'
import { Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import classes from './Authentication.module.css'
import Link from 'next/link'
import Router from 'next/router'
import appConfig from '../app.json'
import Head from 'next/head'

export default function Home() {
  return (
    <>
    <Head>
      <title>Login | {appConfig.name}</title>
    </Head>
    <main className='relative min-h-screen'>
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
              <Link href={'#'}>
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Link>
            </Group>
            <Button
            onClick={()=>{
              Router.push('/dashboard')
            }}
            fullWidth
            mt="xl">
              Sign in
            </Button>
          </Paper>
        </Container>
      </div>
    </main>
    </>
  )
}
