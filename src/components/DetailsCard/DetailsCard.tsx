import Swal from 'sweetalert2';
import QRCode from 'qrcode.react';
import {AnimatePresence, motion} from 'framer-motion';

// @ts-ignore
export default function DetailsCard({longURL, unique}) {
    const shortenedURL = `${
        typeof window !== 'undefined' ? window.location.origin : ''
    }/${unique}`;

    function copyToClipboard() {
        const inputField = document.getElementById(
            'shortURL',
        ) as HTMLInputElement;

        inputField.select();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(inputField.value).then((r) => r);
        } else {
            // for old browsers
            document.execCommand('copy');
        }
        inputField.setSelectionRange(0, 0);

        Swal.fire({
            icon: 'success',
            title: 'Copied to clipboard',
            showConfirmButton: false,
            timer: 1500,
        }).then((r) => r);
    }

    return (
        <AnimatePresence initial={true}
                         mode={"sync"}>
            <motion.div
                initial={{opacity: 0, filter: 'blur(10px)'}}
                animate={{opacity: 1, filter: 'blur(0px)', transition: {delay: 0.2, ease: 'easeInOut'}}}
                exit={{opacity: 0, filter: 'blur(10px)', transition: {delay: 0.2, ease: 'easeInOut'}}}
            >
                <section className="bg-gray-50 flex items-center justify-center mx-2">
                    <div className="card lg:card-side bg-base-100 shadow-xl mb-12">
                        <figure className="p-2">
                            <QRCode
                                id="qr-gen"
                                value={shortenedURL}
                                size={232}
                                level={'H'}
                                includeMargin={true}
                            />
                        </figure>
                        <div className="card-body flex flex-col items-center justify-center">
                            <h2 className="card-title pt-4 pb-2 text-m font-bold text-center text-gray-900">
                                Your URL has been shortened!
                            </h2>
                            <input
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="longURL"
                                type="text"
                                value={longURL}
                                readOnly
                            />
                            <div className="flex items-center">
                                <input
                                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="shortURL"
                                    type="text"
                                    value={shortenedURL}
                                    readOnly
                                />
                                <button
                                    className="btn ml-2 py-3 px-3"
                                    onClick={copyToClipboard}
                                >
                                    Copy
                                </button>
                            </div>
                            <div className="card-actions">
                                <a
                                    href="../../"
                                    className="btn btn-primary mt-4 border-cyan-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Create Another
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </motion.div>
        </AnimatePresence>
    );
}
