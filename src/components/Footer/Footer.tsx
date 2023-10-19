import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer bg-gray-50 w-full position-absolute bottom-0">
            <div className="mx-auto w-full max-w-screen-xl px-6 py-6 lg:py-8">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <span className="text-sm lg:text-base text-gray-500 sm:text-center dark:text-gray-400">
                        © 2023{' '}
                        <Link
                            href={'https://unesa.ac.id'}
                            className={'hover:underline'}
                        >
                            Universitas Negeri Surabaya
                        </Link>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}
