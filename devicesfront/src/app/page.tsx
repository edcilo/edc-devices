import { LoginForm } from "@/components";
import { Card, Flex, Space, Title } from "@mantine/core";
import Image from "next/image";
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <Card miw="380px" shadow="sm" withBorder>
        <Flex direction="column" align="center" justify="center" gap="sm">
          <Image src="/assets/logo.svg" width="100" height="30" alt="edcilo logo" />
          <Title order={4}>DEVICES</Title>
        </Flex>

        <Space h="xl" />
        <LoginForm />
      </Card>
    </main>
  );
}
