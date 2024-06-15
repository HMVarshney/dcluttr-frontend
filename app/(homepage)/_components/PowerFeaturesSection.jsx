


import React from 'react'
const features = [
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="6" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M19 19l-3.5-3.5" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Magic search",
        detail: "Search by topic, ask questions, and get summarized answers"
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6h9m-9 6h9m-9 6h9M5 5.5h1v1H5v-1zm0 6h1v1H5v-1zm0 6h1v1H5v-1z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Magic summarize",
        detail: "Accurate, instant, timestamped summaries of video calls"
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path clipRule="evenodd" d="M13.5 14L11 15.5v-3l2.5 1.5z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5 9h14M7 5l2 4M11 5l2 4M15 5l2 4" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Magic reels",
        detail: "Customer calls shortened to the best moments and highlights"
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M19.293 12.293a1 1 0 010 1.414L14 19h-2v-2l5.293-5.293a1 1 0 011.414 0l.586.586z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 12l1 1M8 19H7a2 2 0 01-2-2V7a2 2 0 012-2h8a2 2 0 012 2v.5M9 9h4M9 12h2" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Flexible editor",
        detail: "Tell a compelling narrative with multi-column layouts, videos, images, and sticky notes."
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M14 5H8C7 5 6 6 6 7v10c0 1 1 2 2 2h8c1 0 2-1 2-2V9l-4-4z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10 15h4M10 12h1" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path clipRule="evenodd" d="M13 5v4a1 1 0 001 1h4" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M13.5 7.5l2 2 1-1-2-2-1 1z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Document analysis",
        detail: "Import, analyze, and store your files, presentations, images, videos, and other documents."
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 8L8 5m0 0L5 8m3-3v10M19 16l-3 3m0 0l-3-3m3 3V9" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Integrations",
        detail: "Import content from Google Drive and Zoom, and embed Figma, Miro, and more."
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 19v-4M12 19V5M17 19v-8" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Analytics",
        detail: "Measure engagement and demonstrate the impact of insights in your team."
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="6" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M19 19l-3.5-3.5" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Evidence",
        detail: "Maintain traceability with references to evidence collected during analysis."
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M5 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path clipRule="evenodd" d="M14 12l-3 2v-4l3 2z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Presentation mode",
        detail: "Present insights on the big screen with a beautiful presentation mode and public sharing."
    },
    {
        icon: <svg className='w-8' viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="14" r="4" stroke="#027056" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></circle><circle cx="14" cy="24" r="4" stroke="#027056" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></circle><circle cx="34" cy="34" r="4" stroke="#027056" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M18 26l12 6M30 16l-12 6" stroke="#027056" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Public sharing",
        detail: "Share insights with stakeholders who don’t yet have a Dovetail account."
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M18.3 14.567a6.611 6.611 0 01-5.911 3.655 6.516 6.516 0 01-2.956-.7L5 19l1.478-4.433a6.518 6.518 0 01-.7-2.956A6.611 6.611 0 019.433 5.7 6.518 6.518 0 0112.39 5h.389A6.596 6.596 0 0119 11.222v.39a6.518 6.518 0 01-.7 2.955z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Comments and mentions",
        detail: "Discuss customer data and insights, and agree on the next steps as a team."
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l7 3 7-3-7-3-7 3z" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5 12l7 3 7-3M5 16l7 3 7-3" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Customize projects",
        detail: "Use projects how you like—disable and reorder notes, tags, insights, highlights, and charts."
    },
    {
        icon: <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.586 13.414c1.414 1.414 4.242 1.414 5.657 0L17.657 12A4 4 0 1012 6.343" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M13.414 10.586c-1.414-1.414-4.242-1.414-5.657 0L6.343 12A4 4 0 1012 17.657" stroke="#027056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
        title: "Embed links",
        detail: "Preview links from the tools you use including Figma, Google Docs, Vimeo and more."
    }
];


export default function PowerFeaturesSection() {
    return (
        <section className='my-24 lg:my-52 mx-auto max-w-5xl px-4'>
            <div className='font-extrabold text-center text-3xl lg:text-5xl'>
                Power features
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 grid-flow-row overflow-y-auto gap-12 pt-8 lg:pt-14'>
                {features.map((ele, i) =>
                    <div className=''>
                        {ele.icon}
                        <div className='font-bold text-base my-3'>{ele.title}</div>
                        <div>{ele.detail}</div>
                    </div>
                )}
            </div>
        </section>
    )
}
