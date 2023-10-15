'use client';

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    const [scroll, setScroll] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    const addBorder = scroll
        ? 'border-b-3 border-gray-200 shadow-lg border-opacity-20 transition duration-500 ease-in-out'
        : '';

    return (
        <nav className={`bg-blue-900 fixed top-0 w-full z-10 ${addBorder}`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="container mx-auto md:flex md:flex-wrap md:items-center justify-between">
                    <a href="/">
                        <Image
                            src="/logo-white.png"
                            className="h-8 m-auto hover:opacity-90"
                            alt="unesa-link-logo"
                            height={32}
                            width={98}
                        />
                    </a>
                    <div className="justify-between items-center gap-4 my-3 hidden md:flex">
                        <Link href="https://unesa.ac.id/" className={"text-white font-bold text-sm hover:text-gray-200"}>
                            UNESA
                        </Link>
                        <Link href="https://sso.unesa.ac.id/" className={"text-white font-bold text-sm hover:text-gray-200"}>
                            SSO
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
