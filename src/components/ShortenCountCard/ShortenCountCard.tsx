'use client';

import {useState} from "react";
import CountUp from "react-countup";

export default function ShortenCountCard() {
    const [count, setCount] = useState(0);
    const [isCounting, setIsCounting] = useState(false);

    try {
        const response = fetch('/api/shorten/count');
        response.then(res => res.json()).then(data => {
            setCount(2659);
        });
    } catch (e) {
        console.log(e);
    }

    return (
        <section className="bg-gray-50 flex items-center justify-center mx-2">
            <div className="card lg:card-side bg-base-100 shadow-md mb-12">
                <div className="card-body flex flex-col items-center justify-center">
                    <h2 className="card-title pt-4 pb-2 text-m font-bold text-center text-gray-900">
                        Total URL has been shortened
                    </h2>
                    <h1 className="text-5xl font-bold text-center text-gray-900">
                        <CountUp start={0} end={count} duration={2.75} separator="," />
                    </h1>
                </div>
            </div>
        </section>
    );
}