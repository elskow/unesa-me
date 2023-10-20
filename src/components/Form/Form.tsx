'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import Swal from 'sweetalert2';
import { AnimatePresence, motion } from 'framer-motion';

import DetailsCard from '@/components/DetailsCard/DetailsCard';
import randomUrlGenerator from '@/utils/randomUrlGenerator';

export default function Form() {
    const [longURL, setLongURL] = useState('');
    const [customAddress, setCustomAddress] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [token, setToken] = useState('');

    let currentURL = useRef('https://unesa.me');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            currentURL.current = window.location.origin;
        }
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsFetching(true);
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: longURL,
                    customAddress,
                    token,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                setCustomAddress(data.data.unique);

                await Swal.fire({
                    icon: 'success',
                    title: 'Shortened Successfully',
                    text: 'Your URL has been successfully shortened!',
                });

                setIsSubmitted(true);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message;
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `There was an error shortening the URL. ${errorMessage}`,
                });

                setIsSubmitted(false);
                setIsFetching(false);

                window.turnstile?.reset();
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'There was a network error. Please try again later.',
            });

            setIsSubmitted(false);
            setIsFetching(false);

            window.turnstile?.reset();
        }
    };

    const handleLongURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLongURL(e.target.value);
    };

    const handleCustomAddressChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (e.target.value === '' && isSubmitted) {
            setCustomAddress(randomUrlGenerator(6));
        } else {
            setCustomAddress(e.target.value);
        }
    };

    const handleCheckAvailability = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customAddress,
                }),
            });

            if (response.ok) {
                await response.json();
                await Swal.fire({
                    icon: 'success',
                    title: 'Available',
                    text: 'Your custom address is available!',
                });
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message;
                await Swal.fire({
                    icon: 'error',
                    title: 'Unavailable',
                    text: `${errorMessage}`,
                });
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'There was a network error. Please try again later.',
            });
        }
    };

    return (
        <>
            {isSubmitted ? (
                <DetailsCard longURL={longURL} unique={customAddress} />
            ) : (
                <AnimatePresence initial={true} mode={'sync'}>
                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{
                            opacity: 1,
                            filter: 'blur(0px)',
                            transition: { delay: 0.2, ease: 'easeInOut' },
                        }}
                        exit={{
                            opacity: 0,
                            filter: 'blur(10px)',
                            transition: { delay: 0.2, ease: 'easeInOut' },
                        }}
                    >
                        <section className="bg-gray-50 flex items-center justify-center mx-2 py-5">
                            <div className="card bg-white p-8 rounded-lg shadow-lg md:w-4/6 mb-12">
                                <h2 className="card-title text-xl lg:text-2xl font-bold mb-4 text-gray-800">
                                    Shorten Your URL
                                </h2>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-4">
                                        <label
                                            className="block text-sm lg:text-base text-gray-700 font-bold mb-2"
                                            htmlFor="longURL"
                                        >
                                            Your Long URL
                                        </label>
                                        <motion.input
                                            className="input text-sm lg:text-base input-bordered appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="longURL"
                                            type="url"
                                            placeholder="https://example.com"
                                            onChange={handleLongURLChange}
                                            required={true}
                                            style={{
                                                backgroundColor: '#fff',
                                            }}
                                            initial={{
                                                backgroundColor: '#fff',
                                            }}
                                            animate={{
                                                backgroundColor: '#fff',
                                            }}
                                            whileFocus={{
                                                backgroundColor: '#E8F9FD',
                                            }}
                                            transition={{
                                                duration: 0.2,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    </div>
                                    <div className="mb-4 flex flex-wrap">
                                        <div className="w-full">
                                            <label
                                                className="block text-sm lg:text-base text-gray-700 font-bold mb-2"
                                                htmlFor="customAddress2"
                                            >
                                                Custom Link{' '}
                                                <span className="text-xs text-gray-500">
                                                    (optional)
                                                </span>
                                            </label>
                                            <div className="input-group">
                                                <span className="text-sm lg:text-base w-2/6 whitespace-nowrap overflow-ellipsis overflow-hidden text-gray-600 bg-gray-100 rounded-l-lg px-3 py-3 flex items-center">
                                                    {currentURL.current}/
                                                </span>
                                                <motion.input
                                                    className="text-sm lg:text-base input input-bordered appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="customAddress2"
                                                    type="text"
                                                    value={customAddress}
                                                    pattern="^[a-zA-Z0-9]*$" // alphanumeric only
                                                    placeholder="your-custom-link (alphanumeric only)"
                                                    onChange={
                                                        handleCustomAddressChange
                                                    }
                                                    style={{
                                                        backgroundColor: '#fff',
                                                    }}
                                                    initial={{
                                                        backgroundColor: '#fff',
                                                    }}
                                                    animate={{
                                                        backgroundColor: '#fff',
                                                    }}
                                                    whileFocus={{
                                                        backgroundColor:
                                                            '#E8F9FD',
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                        ease: 'easeInOut',
                                                    }}
                                                />
                                                <button
                                                    className="text-sm lg:text-base btn glass ml-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/6 font-sans normal-case lg:w-auto"
                                                    onClick={
                                                        handleCheckAvailability
                                                    }
                                                >
                                                    Check
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="h-fit alert alert-info p-3 mb-4 text-sm text-green-800 rounded-lg bg-green-200 border border-green-300 flex items-center"
                                        role="alert"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="stroke-current shrink-0 w-4 h-4 inline"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                        <span className="text-sm lg:text-l ml-2">
                                            Your link will be saved for 30 days.
                                        </span>
                                    </div>
                                    <Turnstile
                                        siteKey={
                                            process.env
                                                .NEXT_PUBLIC_TURNSTILE_SITE_KEY as string
                                        }
                                        onSuccess={setToken}
                                        onError={() => {} /* do nothing */}
                                        options={{
                                            theme: 'light',
                                            size: 'normal',
                                            language: 'en',
                                        }}
                                        as="button"
                                    />
                                    {isFetching ? (
                                        <div className="flex items-center justify-between mt-4">
                                            <button
                                                disabled
                                                type="button"
                                                className="bg-blue-400 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline inline-flex items-center diss"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="status"
                                                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="#E5E7EB"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                Loading...
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between mt-4">
                                            <button
                                                className="text-base lg:text-l button bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline font-bold tracking-tighter"
                                                type="submit"
                                            >
                                                Shorten!
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </section>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    );
}
