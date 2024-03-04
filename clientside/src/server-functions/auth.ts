import { JwtPayload } from "@/lib/types";
import { serverUrl } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

type TRegister = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

type TLogin = {
    value: string;
    password: string;
}

export const handleRegister = async ({ values, navigate }: { values: TRegister, navigate: (to: string) => void}) => {
    try {
        const response = await fetch(`${serverUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            const { token, message } = await response.json();
            localStorage.setItem('accessToken', token);
            const userData = jwtDecode<JwtPayload>(token);
            toast(message);
            navigate(`/workspace/${userData?.userId}`);
        } else {
            const errorData = await response.json();
            console.error(errorData);
            toast(`${errorData.message}`);
        }
    } catch (err) {
        console.error(err);
        toast("Something went wrong.");
    }
};

export const handleLogin = async ({ values, navigate }: { values: TLogin, navigate: (to: string) => void }) => {
    try {
        const response = await fetch(`${serverUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            const { token, message } = await response.json();
            localStorage.setItem('accessToken', token);
            const userData = jwtDecode<JwtPayload>(token);
            toast(message);
            navigate(`/workspace/${userData?.userId}`);
        } else {
            const errorData = await response.json();
            console.error(errorData);
            toast(` Something went wrong ${errorData.message}`);
        }
    } catch (err) {
        console.error(err);
        toast("Something went wrong.");
    }
};