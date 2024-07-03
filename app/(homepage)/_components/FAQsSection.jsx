import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'


const faqList = [
    {
        question: "How does Dcluttr’s first-party pixel “Bolt” work and how is it unaffected by apple privacy restrictions?",
        answer: "Bolt integrates with all parts of your business, syncing your traffic sources, ad platforms, website traffic, and more. It tracks your users across 15+ data points, providing detailed analytical data. Additionally, Bolt uses a first-party tracking setup and complies with all privacy laws, ensuring it remains unaffected by any privacy restrictions."
    },
    {
        question: "How much time will it take for me to setup Dcluttr? Will it take a lot of coding effort?",
        answer: "Dcluttr can be setup in a few minutes with a few button clicks. No coding effort is required. Also, once you sign up for the tool, a dedicated customer success manager will help you setup the tool - at no extra cost."
    },
    {
        question: "Can the tool be customised according to my company’s needs?",
        answer: "Yes, the platform can be customised according to your needs. If you think a certain feature would add value for your company, our product and tech team can take it up and deploy as soon as possible."
    },
    {
        question: "How is Dcluttr better than ad platform or google analytics tracking?",
        answer: "GA4 and Ad platforms are significantly impacted by privacy restrictions by Safari, Firefox. Chrome will soon ban third-party cookies which will further impact the tracking accuracy. These platforms are heavily dependent on “predictive data modelling” and “AI” to display the tracking data - fancy names for guessing. Dcluttr tracks everything in a deterministic way. Every single order is mapped to a source and an ad."
    },
    {
        question: "Is my data secure with Dcluttr?",
        answer: "Dcluttr follows a multi-tenant structure to store brand data, ensuring each brand’s information is kept separate. We never share one brand’s data with another. These details will be included in the legal agreement, which will be provided once you sign up for the platform."
    },
    {
        question: "Can I try Dcluttr for free?",
        answer: "Yes, Dcluttr offers a free trial. Reach out to the support team and they will activate the trial for you."
    },
    {
        question: "Does Dcluttr offer an agency partnership plan?",
        answer: "Yes, we do offer an agency partnership plan. You can also get a customised dashboard for your agency. Reach out to support for more details."
    }
];


export default function FAQsSection() {
    return (
        <section className='max-w-5xl mx-auto my-24 lg:my-52 px-4'>
            <div className='font-extrabold text-3xl lg:text-5xl'>
                Questions & answers
            </div>
            <div className=' text-xl lg:text-xl mt-6'>
                Can’t find the answer here? <Link href={"/#"} className='underline'>Contact our support team.</Link>
            </div>
            {faqList?.map((accordion, index) => (
                <Accordion type="multiple" collapsible={"true"} key={index}>
                    <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="text-left text-lg lg:text-xl font-semibold pt-8">
                            {accordion.question}
                        </AccordionTrigger>
                        <AccordionContent className=" text-lg lg:text-xl pb-8">
                            {accordion.answer}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}

        </section>
    )
}
