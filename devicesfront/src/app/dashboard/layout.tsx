import { LogoutButton } from "@/components";
import { Container, Group } from "@mantine/core";
import Image from "next/image";
import styles from './layout.module.css';

type DashboardProps = {
    children?: React.ReactNode
}

export default function Dashboard({children}: DashboardProps) {
    return (
        <div>
            <header className={styles.header}>
                <Container>
                    <Group justify="space-between">
                        <Image src="/assets/logo.svg" alt="Logo" width={100} height={30} />
                        <LogoutButton />
                    </Group>
                </Container>
            </header>

            {children}
        </div>
    )
}
