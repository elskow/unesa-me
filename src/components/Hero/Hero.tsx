export default function Hero() {
    return (
        <section className="bg-gray-50 pt-12">
            <div className="container mx-auto px-16">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-12 lg:pt-14">
                    <h1 className="mb-4 text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-4xl">
                        The <span className="text-blue-500">easiest </span>
                        customizeable <br /> Url Shortener {''}
                        <span className="text-blue-500">ever.</span>
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-24 xl:px-68">
                        unesa.me is a free tool for shortening URLs and making
                        them easier to share.
                    </p>
                </div>
            </div>
        </section>
    );
}