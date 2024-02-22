"use client"

import { useState } from "react";

const Faq = () => {
    const [isOpen, setIsOpen] = useState(null);
    const accordions = [{ title: "How do I create an account?", description: 'To create an account, click on the "Sign Up" button and fill out the required information. Once done, you can enjoy the benefits of being a registered member.', }, { title: "What is Streme?", description: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.", }, { title: "How much does Streme cost?", description: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from USD 9.99 to USD 2.99 a month. No extra costs, no contracts.", }, { title: "Are there any discounts for loyal customers?", description: "We appreciate our loyal customers! Stay tuned for exclusive discounts, promotions, and special offers available to members of our loyalty program.", },];
    const toggle = (idx) => {
        setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
    };
    return (
        <div className="bg-[#101010]">
            <div className="max-w-[1400px] px-2 mx-auto lg:flex  py-[50px] md:py-[150px] px-10 ">
                <div className="">
                    <h1 className="text-3xl md:text-5xl text-center md:text-left font-bold text-white pl-2 md:pl-16 lg:pl-0 lg:max-w-[400px] pb-10">Frequently Asked Questions</h1>
                </div>
                <div className="">


                    <div className=" rounded-lg font-sans mx-4 ">
                        {accordions.map((PerAccordion, idx) => (
                            <div key={idx} className="p-4 border-b bg-[#1D1D1D]">
                                <button onClick={() => toggle(idx)} className="flex justify-between items-center py-4 w-full h-full">
                                    <span className="text-xl text-white">{PerAccordion.title}</span>
                                    <svg className="fill-[#00B84B] shrink-0 ml-8" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><rect y="7" width="16" height="2" rx="1" className={`transform origin-center transition duration-200 ease-out ${isOpen === idx && "!rotate-180"}`} /><rect y="7" width="16" height="2" rx="1" className={`transform origin-center rotate-90 transition duration-200 ease-out ${isOpen === idx && "!rotate-180"}`} /></svg>
                                </button>
                                <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600  ${isOpen === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden text-white">{PerAccordion.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
            <div className="bg-[#1D1D1D] h-3"></div>
        </div>
    );
};

export default Faq;