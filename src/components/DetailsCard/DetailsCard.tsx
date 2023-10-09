import Swal from 'sweetalert2';
import QRCode from 'qrcode.react';

// @ts-ignore
export default function DetailsCard({ longURL, unique }) {
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
        <section className="bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md md:w-4/6 mb-12">
                <div className="alert alert-success p-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Your URL has been shortened!</span>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-l text-gray-700 text-sm font-bold mb-2"
                        htmlFor="longURL"
                    >
                        Long URL
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="longURL"
                        type="text"
                        value={longURL}
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-l text-gray-700 text-sm font-bold mb-2"
                        htmlFor="shortURL"
                    >
                        Shortened URL
                    </label>
                    <div className="flex items-center">
                        <input
                            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="shortURL"
                            type="text"
                            value={shortenedURL}
                            readOnly
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-3 ml-2"
                            onClick={copyToClipboard}
                        >
                            Copy
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-l text-gray-700 text-sm font-bold mb-2"
                        htmlFor="longURL"
                    >
                        QR Code
                    </label>
                    <QRCode
                        id="qr-gen"
                        value={shortenedURL}
                        size={182}
                        level={'H'}
                        includeMargin={true}
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <a
                        href="../../"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Short another URL
                    </a>
                </div>
            </div>
        </section>
    );
}
