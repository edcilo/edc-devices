'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Group, Space, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import config from '../config';
import { Device } from './DevicesList';

type DeviceFormProps = {
    device: Device | null;
    method: "POST" | "PUT";
}

type DeviceFormData = {
    name: string;
    ip: string;
};

type DeviceResponse = {
    id: number;
    name: string;
    ip: string;
    created_at: string;
    updated_at: string;
}

const IPRegex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

const deviceSchema = yup.object({
    name: yup.string().max(30).required(),
    ip: yup.string().max(15).matches(IPRegex, "Invalid IP format").required(),
}).required();

async function createDevice(token: string, data: DeviceFormData) {
    const response = await fetch(`${config.api.url}/api/v1/devices`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const body: DeviceResponse = await response.json()

    if (response.status === 201) {
        return true;
    } else if (response.status === 401) {
        console.log(">>> error", body);
        return false;
    }
}

async function updateDevice(token: string, id: number, data: DeviceFormData) {
    const response = await fetch(`${config.api.url}/api/v1/devices/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const body: DeviceResponse = await response.json()

    if (response.status === 200) {
        return true;
    } else if (response.status === 401) {
        console.log(">>> error", body);
        return false;
    }
}

export function DeviceForm({ device, method }: DeviceFormProps) {
    const [message, setMessage] = useState<string>("Device created successfully");
    const [success, setSuccess] = useState(false)
    const [cookies] = useCookies(["token"])
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<DeviceFormData>({
        defaultValues: {
            name: device?.name || '',
            ip: device?.ip || '',
        },
        resolver: yupResolver(deviceSchema),
    });

    const onSubmit = async (data: DeviceFormData) => {
        if (method === "POST") {
            const created = await createDevice(cookies.token, data);
            if (created) {
                setMessage("Device created successfully");
                setSuccess(true);
                reset();
            }
        } else if (method === "PUT") {
            const updated = await updateDevice(cookies.token, device!.id, data);
            if (updated) {
                setMessage("Device updated successfully");
                setSuccess(true);
            }
        }
    }

    return (
        <>
            {success && (
                <>
                    <Alert withCloseButton onClose={() => setSuccess(false)} color="green" title={message} />
                    <Space h="lg" />
                </>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder=""
                    error={errors.name?.message}
                    {...register("name")} />

                <Space h="lg" />

                <TextInput
                    withAsterisk
                    label="IP"
                    placeholder="0.0.0.0"
                    error={errors.ip?.message}
                    {...register("ip")} />

                <Space h="lg" />

                <Group justify="center">
                    <Button fullWidth type="submit" disabled={isSubmitting} loading={isSubmitting}>
                        Save
                    </Button>
                </Group>
            </form>
        </>
    )
}