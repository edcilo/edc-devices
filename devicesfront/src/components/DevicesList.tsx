'use client';

import config from "@/config";
import { Button, Card, Flex, Group, Loader, Pagination, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type DeviceListProps = {
    onAddDevice: () => void;
    onEditDevice: (device: Device) => void;
    onDeleteDevice: (device: Device) => void;
    onTest: (device: Device, online: boolean) => void;
}

export type Device = {
    id: number;
    status: number;
    ip: string;
    name: string;
    created_at: string;
    updated_at: string;
}

type Meta = {
    total: number;
    pages: number;
}

function parseDate(date: string) {
    return new Date(date).toLocaleString()
}

async function getDevices(token: string, page: number = 1, size: number = 10) {
    const response = await fetch(`${config.api.url}/api/v1/devices?page=${page}&size=${size}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return await response.json()
}

async function testDevice(id: number, token: string) {
    const response = await fetch(`${config.api.url}/api/v1/devices/${id}/ping`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status === 200) {
        const data = await response.json()
        return data.status === 1;
    }

    return false;
}

export function DevicesList({ onAddDevice, onEditDevice, onDeleteDevice, onTest }: DeviceListProps) {
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)
    const [testing, setTesting] = useState<boolean>(false)
    const [data, setData] = useState<Device[]>([])
    const [meta, setMeta] = useState<Meta>({ total: 0, pages: 0 })
    const [cookies] = useCookies(["token"])

    function updateList() {
        setLoading(true)
        getDevices(cookies.token, page).then(res => {
            setData(res.data)
            setMeta(res.meta)
            setLoading(false)
        })
    }

    useEffect(() => {
        updateList();
    }, [page])

    async function testHandler(device: Device) {
        setTesting(true);
        setLoading(true);
        const online = await testDevice(device.id, cookies.token)
        setTesting(false);
        setLoading(false);
        onTest(device, online);
    }

    return (
        <Card shadow="sm" padding="lg" radius="md">
            <Card.Section withBorder inheritPadding py="md" mb="md">
                <Group justify="space-between">
                    <Text fw="500">Devices</Text>

                    <Flex gap="sm">
                        <Button variant="light" size="xs" onClick={updateList}>Reload</Button>
                        <Button variant="light" size="xs" color="green" onClick={onAddDevice}>Add device</Button>
                    </Flex>
                </Group>
            </Card.Section>

            <Table striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>IP</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Created At</Table.Th>
                        <Table.Th>Updated At</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    { loading && (
                        <Table.Tr>
                            <Table.Td colSpan={6} align="center">
                                <Loader type="dots" />
                            </Table.Td>
                        </Table.Tr>
                    )}
                    {
                        data.length === 0 && !loading && (
                            <Table.Tr>
                                <Table.Td colSpan={5} align="center">
                                    <Text size="sm">No devices found</Text>
                                </Table.Td>
                            </Table.Tr>
                        )
                    }
                    {
                        data.map(device => (
                            <Table.Tr  key={device.id}>
                                <Table.Td align="center">{device.status === 1 ? "🟢" : "🔴"}</Table.Td>
                                <Table.Td>{device.ip}</Table.Td>
                                <Table.Td>{device.name}</Table.Td>
                                <Table.Td>{parseDate(device.created_at)}</Table.Td>
                                <Table.Td>{parseDate(device.updated_at)}</Table.Td>
                                <Table.Td align="center">
                                    <Flex gap="xs">
                                        <Button variant="light" color="grape" size="xs" onClick={() => testHandler(device)} disabled={testing}>
                                            ▶
                                        </Button>
                                        <Button variant="light" color="yellow" size="xs" onClick={() => onEditDevice(device)} disabled={testing}>
                                            ✏️
                                        </Button>
                                        <Button variant="light" color="red" size="xs" onClick={() => onDeleteDevice(device)} disabled={testing}>
                                            🗑️
                                        </Button>
                                    </Flex>
                                </Table.Td>
                            </Table.Tr>
                        ))
                    }
                </Table.Tbody>
            </Table>

            <Flex justify="center" mt="md">
                <Pagination total={meta.pages} onChange={setPage} />
            </Flex>
        </Card>
    )
}