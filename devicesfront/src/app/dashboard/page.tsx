'use client'

import { Device, DeviceDeleteForm, DeviceForm, DevicesList, DeviceStats } from '@/components';
import { Container, Modal, Space } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export const revalidate = 1000;


export default function Dashboard() {
    const [device, setDevice] = useState<Device | null>(null);
    const [method, setMethod] = useState<"POST" | "PUT" | "DELETE">("POST");
    const [opened, { open, close }] = useDisclosure(false);
    const [modalTitle, setModalTitle] = useState<string>("Add new device");

    const addDeviceHandler = () => {
        setModalTitle("Add new device");
        setDevice(null);
        setMethod("POST");
        open();
    }

    const editDeviceHandler = (device: Device) => {
        setModalTitle("Edit device");
        setDevice(device);
        setMethod("PUT");
        open();
    }

    const deleteHandler = (device: Device) => {
        setModalTitle("Delete device");
        setDevice(device);
        setMethod("DELETE");
        open();
    }

    const deleteSuccessHandler = () => {
        close();
        setDevice(null);
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
                    onDeleteDevice={deleteHandler} />
            </Container>

            <Modal opened={opened} onClose={close} title={modalTitle}>
                {
                    method !== "DELETE"
                        ? (<DeviceForm device={device} method={method} />)
                        : (<DeviceDeleteForm device={device} onSuccess={deleteSuccessHandler} />)
                }
            </Modal>
        </>
    )
}
