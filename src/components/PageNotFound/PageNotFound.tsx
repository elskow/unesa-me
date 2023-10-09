import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

import Link from 'next/link';

export default function PageNotFound() {
    return (
        <div className="min-h-screen justify-between flex flex-col max-w-screen bg-gray-50">
            <NavBar />
            <div className="my-auto text-center">
                <h1 className="text-3xl font-bold text-gray-900">404</h1>
                <p className="text-gray-600">Page not found</p>
                <Link
                    href="/"
                    className={`mt-4 text-blue-600 hover:text-blue-700`}
                >
                    Return to homepage
                </Link>
            </div>
            <Footer />
        </div>
    );
}
