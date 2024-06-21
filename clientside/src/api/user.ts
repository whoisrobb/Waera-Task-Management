import { type UserInputProps } from "@/components/forms/user-workspace";
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

export const handleRegister = async ({ values }: { values: TRegister }) => {
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
            return userData;
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

export const handleLogin = async ({ values }: { values: TLogin }) => {
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
            return userData;
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

// UPDATE USER DATA
export const updateUserData = async (userData: UserInputProps) => {
    try {
        const { userId } = userData;
        const response = await fetch(`${serverUrl}/user/save/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return 'Something went wrong!'
        }
    } catch (err) {
        console.error(err)
    }
}