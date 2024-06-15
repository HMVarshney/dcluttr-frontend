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
        question: "How many users do I need?",
        answer: "Users contribute data to—and do analysis within—your insights hub. Most customers buy enough users for their product management, research, and design teams. Some also buy users for their sales, customer success, support, and marketing teams to also contribute data to the insights hub."
    },
    {
        question: "So, what’s a viewer in Dovetail?",
        answer: "Like users, viewers also have a user account, but they can’t upload, create, or edit. Viewers can instead only search, view, and comment on data and insights in your insights hub. Unlimited viewers are included for free to help you get customer insights in front of as many people as possible in your organization."
    },
    {
        question: "How do we control who sees what in Dovetail?",
        answer: "Access is controlled by changing a user’s role—Manager, Contributor, or Viewer—or by restricting a project or a folder to a specific user. Admins can set up user groups to make this easier on our Enterprise plans."
    },
    {
        question: "Is there a discount for paying yearly?",
        answer: "There’s a yearly discount available on the Professional plan. Enterprise can only be paid yearly."
    },
    {
        question: "Do you have a discount for students, academics, or non-profits?",
        answer: "No. We don’t offer discounts at this time. However, anyone is welcome to use our Free plan with its generous offerings."
    },
    {
        question: "Can I start a free trial of paid plans?",
        answer: "Yes, you can try our Professional plan for 7 days. If you would like to try our Enterprise plan please contact sales. Once your free trial ends your workspace will be set to read-only until you choose a paid plan or downgrade back to Free."
    },
    {
        question: "Can we pause our subscription?",
        answer: "No, unfortunately at the moment there is no way to pause your subscription. However, you can downgrade to a Free plan."
    },
    {
        question: "What happens if we cancel our subscription?",
        answer: "You’ll be able to use Dovetail for the remainder of your billing period. At the end of the billing period, we’ll keep your workspace in a read-only state for a further 30 days so you can export your data. After this 30-day download period, your data will be deleted in accordance with your data retention policy. We don’t offer refunds."
    },
    {
        question: "Can you send me an invoice?",
        answer: "Yes. You can choose to pay via invoice for payments over $5,000 USD."
    },
    {
        question: "Can we pay in other currencies?",
        answer: "No. We only accept USD at the moment."
    },
    {
        question: "How is tax calculated?",
        answer: "All prices are tax exclusive, and additional taxes (GST, VAT, US Sales Tax, etc.) may be applied to your invoice."
    },
    {
        question: "Can I have a proposal I can share with my team?",
        answer: "Yes! Let us help you get your team on board with Dovetail. Answer a few simple questions, and we’ll generate a presentation that you can download and share with your stakeholders."
    }
];


export default function FAQsSection() {
    return (
        <section className='max-w-5xl mx-auto my-14 px-4'>
            <div className='font-extrabold text-3xl lg:text-5xl'>
                Questions & answers
            </div>
            <div className=' text-xl lg:text-xl mt-6'>
                Can’t find the answer here? <Link href={"/#"} className='underline'>Contact our support team.</Link>
            </div>
            {faqList?.map((accordion, index) => (
                <Accordion type="multiple" collapsible={"true"} key={index}>
                    <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="text-left text-lg lg:text-xl font-extrabold pt-8">
                            {accordion.question}
                        </AccordionTrigger>
                        <AccordionContent className=" text-lg lg:text-xl font-medium pb-8">
                            {accordion.answer}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}

        </section>
    )
}
