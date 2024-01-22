'use client'

import { Flex, Space, Text, Title } from '@mantine/core';
import { Device } from './DevicesList';

type DeviceTestProps = {
    device: Device | null;
    online: boolean;
}


export function DeviceTest({ device, online }: DeviceTestProps) {
    return (
        <Flex direction="column" align="center">
            <Title order={4}>
                Device {device?.name} ({device?.ip})
            </Title>
            <Space h="xl" />
            <Text size="lg">
                {online ? "🟢 Device is online" : "🔴 Device is offline"}
            </Text>
        </Flex>
    )
}
