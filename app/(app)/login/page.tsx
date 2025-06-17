'use client';

import Input from "@/components/Input";
import Image from "next/image";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

function Page() {
    const { login, loading, error } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <section className="w-screen h-screen flex flex-col md:flex-row">
            <div className="bg-neutral-100 text-neutral-700 md:w-1/3 h-full flex flex-col justify-center items-center">
                <div className="md:hidden flex mb-6">
                    <Image src={"/img/wireless.webp"} alt="wireless" width={50} height={50} />
                    <div className="ml-1">
                        <h2 className="font-semibold">Wireless.Ar</h2>
                        <p className="text-sm">Administración</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-sm px-4 flex flex-col gap-4">
                    <Input
                        label="Email"
                        placeHolder="Ingrese email"
                        type="email"
                        value={email}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Contraseña"
                        placeHolder="Ingrese contraseña"
                        type="password"
                        value={password}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="mt-2 bg-neutral-800 px-4 py-2 rounded-md text-xs font-semibold text-white hover:bg-neutral-500 duration-300 cursor-pointer disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>

            <div className="hidden md:w-2/3 md:flex md:justify-center md:items-center">
                <Image src={"/img/wireless.webp"} alt="wireless" width={200} height={200} />
                <div className="flex flex-col">
                    <p className="pl-1 font-black text-3xl text-neutral-800">Wireless.Ar</p>
                    <p className="text-neutral-800 font-extrabold">PANEL DE ADMINISTRACIÓN</p>
                </div>
            </div>
        </section>
    );
}

export default Page;
