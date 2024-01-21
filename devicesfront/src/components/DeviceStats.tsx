'use client';

import config from "@/config";
import { Button, Card, Flex, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type Stats = {
    total: number,
    online: number,
    offline: number,
}

async function getStats(token: string): Promise<Stats> {
    const response = await fetch(`${config.api.url}/api/v1/devices/stats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }

    return {
        total: 0,
        online: 0,
        offline: 0
    }
}


export function DeviceStats() {
    const [stats, setStats] = useState<Stats>({ total: 0, online: 0, offline: 0 });
    const [cookies] = useCookies(["token"]);

    useEffect(() => {
        updateStats();
    }, []);

    function updateStats() {
        getStats(cookies.token).then((data) => setStats(data));
    }

    return (
        <>
            <Group justify="end">
                <Button variant="light" size="xs" onClick={updateStats}>Reload</Button>
            </Group>
            <Group>
                <Card shadow="sm" withBorder miw="100">
                    <Flex direction="column" align="center">
                        <div>Devices</div>
                        <Text size="xl" fw="900" c="blue">{ stats.total }</Text>
                    </Flex>
                </Card>

                <Card shadow="sm" withBorder miw="100">
                    <Flex direction="column" align="center">
                        <div>Online</div>
                        <Text size="xl" fw="900" c="green">{ stats.online }</Text>
                    </Flex>
                </Card>

                <Card shadow="sm" withBorder miw="100">
                    <Flex direction="column" align="center">
                        <div>Offline</div>
                        <Text size="xl" fw="900" c="red">{ stats.offline }</Text>
                    </Flex>
                </Card>
            </Group>
        </>
    )
}