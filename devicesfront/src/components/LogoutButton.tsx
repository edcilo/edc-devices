'use client';

import { Button } from "@mantine/core";
import { useCookies } from "react-cookie";

export function LogoutButton() {
    const [_cookie, setCookie] = useCookies(["token"]);

    function logoutHandler() {
        setCookie("token", "", { path: "*" });
        window.location.reload();
    }

    return (
        <Button variant="outline" color="red" onClick={logoutHandler}>
            Logout
        </Button>
    )
}