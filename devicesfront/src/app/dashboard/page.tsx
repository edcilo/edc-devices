'use client'

import { Device, DeviceDeleteForm, DeviceForm, DevicesList, DeviceStats, DeviceTest } from '@/components';
import { Container, Modal, Space } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export const revalidate = 1000;


export default function Dashboard() {
    const [device, setDevice] = useState<Device | null>(null);
    const [method, setMethod] = useState<"POST" | "PUT" | "DELETE">("POST");
    const [testing, setTesting] = useState<boolean>(false);
    const [online, setOnline] = useState<boolean>(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [modalTitle, setModalTitle] = useState<string>("Add new device");

    const addDeviceHandler = () => {
        setTesting(false);
        setModalTitle("Add new device");
        setDevice(null);
        setMethod("POST");
        open();
    }

    const editDeviceHandler = (device: Device) => {
        setTesting(false);
        setModalTitle("Edit device");
        setDevice(device);
        setMethod("PUT");
        open();
    }

    const deleteHandler = (device: Device) => {
        setTesting(false);
        setModalTitle("Delete device");
        setDevice(device);
        setMethod("DELETE");
        open();
    }

    const deleteSuccessHandler = () => {
        close();
        setDevice(null);
    }

    const testHandler = (device: Device, online: boolean) => {
        setModalTitle("Test device");
        setDevice(device);
        setOnline(online);
        setTesting(true);
        open();
    }

    return (
        <>
            <Container>
                <Space h="xl" />

                <DeviceStats />

                <Space h="xl" />

                <DevicesList
                    onAddDevice={addDeviceHandler}
                    onEditDevice={editDeviceHandler}
                    onDeleteDevice={deleteHandler}
                    onTest={testHandler} />
            </Container>

            <Modal opened={opened} onClose={close} title={modalTitle}>
                {
                    testing
                        ? (<DeviceTest device={device} online={online} />)
                        : method !== "DELETE"
                        ? (<DeviceForm device={device} method={method} />)
                        : (<DeviceDeleteForm device={device} onSuccess={deleteSuccessHandler} />)
                }
            </Modal>
        </>
    )
}
