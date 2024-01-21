'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Group, PasswordInput, Space, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import config from '../config';

type LoginFormData = {
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
}

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
}).required();

export function LoginForm() {
    const router = useRouter();
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [_cookies, setCookie] = useCookies(["token"]);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        defaultValues: {
            email: 'admin@edcilo.com',
            password: 'secret',
        },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const response = await fetch(`${config.api.url}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.status === 200) {
            setInvalidCredentials(false)
            const data: LoginResponse = await response.json()
            setCookie("token", data.token, { path: "*" });
            router.push('/dashboard')
        } else if (response.status === 401) {
            setInvalidCredentials(true)
            console.log('unauthorized')
        }
    }

    return (
        <>
            {invalidCredentials && (
                <>
                    <Alert color="red" title="Invalid credentials!">
                        Please try again or contact your administrator.
                    </Alert>
                    <Space h="lg" />
                </>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="admin@edcilo.com"
                    error={errors.email?.message}
                    {...register("email")} />

                <Space h="lg" />

                <PasswordInput
                    withAsterisk
                    label="Password"
                    placeholder="******"
                    error={errors.password?.message}
                    {...register("password")} />

                <Space h="lg" />

                <Group justify="center">
                    <Button fullWidth type="submit" disabled={isSubmitting} loading={isSubmitting}>
                        Login
                    </Button>
                </Group>
            </form>
        </>
    )
}