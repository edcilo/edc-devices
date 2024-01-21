'use client';

import config from '@/config';
import { Button, Space, Text } from '@mantine/core';
import { useCookies } from "react-cookie";
import { Device } from './DevicesList';

type DeviceFormProps = {
    device: Device | null;
    onSuccess: () => void;
}

export function DeviceDeleteForm({ device, onSuccess }: DeviceFormProps) {
    const [cookies] = useCookies(["token"])

    async function deleteHandler() {
        await fetch(`${config.api.url}/api/v1/devices/${device?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            }
        })
        onSuccess();
    }

    return (
        <div>
            <Text fw={700}>Do you really want to delete the device {device?.name} ({device?.ip})?</Text>
            <Space h="md" />
            <Button fullWidth color="red" onClick={deleteHandler}>Yes, I am sure</Button>
        </div>
    )
}
