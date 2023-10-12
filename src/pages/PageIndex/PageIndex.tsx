import NavBar from '@/components/NavBar/NavBar';
import Hero from '@/components/Hero/Hero';
import Form from '@/components/Form/Form';
import Footer from '@/components/Footer/Footer';

export default function PageIndex() {
    return (
        <div className="min-h-screen justify-between flex flex-col max-w-screen bg-gray-50">
            <NavBar/>
            <div className="flex flex-col max-w-screen my-1 md:my-3">
                <Hero/>
                <Form/>
            </div>
            <Footer/>
        </div>
    );
}
