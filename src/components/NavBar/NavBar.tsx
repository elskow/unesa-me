'use client';

import React, { useState, useEffect } from 'react';

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
        ? 'border-b-2 border-gray-200 shadow-sm border-opacity-50'
        : '';

    return (
        <nav className={`bg-gray-50 fixed top-0 w-full z-10 ${addBorder}`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="container mx-auto px-12">
                    <a href="/">
                        <img
                            src="/logo.png"
                            className="h-10 m-auto"
                            alt="unesa-link-logo"
                        />
                    </a>
                </div>
            </div>
        </nav>
    );
}
