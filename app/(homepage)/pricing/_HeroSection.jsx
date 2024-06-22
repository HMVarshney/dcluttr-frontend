

import { Button } from '@/components/ui/button'
import React from 'react'

export default function HeroSection() {
    return (
        <section className='flex flex-col justify-center my-16 mx-auto max-w-5xl px-4'>
            <h1 className='flex items-center justify-start gap-2 lg:gap-3 font-extrabold text-center text-3xl lg:text-7xl'>
                Take better decisions
                <svg className='w-10 lg:w-24' viewBox="0 0 118 102" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M71.401 40.36c-.555-2.429-1.099-4.712-1.593-7-1.165-5.396-2.05-10.84-1.902-16.368.076-2.863.38-5.769 1.03-8.552.44-1.895 1.423-3.78 2.584-5.367C73.695.105 77.012-.56 80.423.832c1.194.488 2.5.73 3.666 1.266 1.096.5 2.178 1.125 3.097 1.897 4.459 3.763 7.895 8.397 10.924 13.325 10.101 16.444 16.794 34.164 19.293 53.332.548 4.206.399 8.545.118 12.797-.149 2.281-.969 4.645-2.003 6.716-2.124 4.245-6.189 5.85-10.602 4.091-2.383-.947-4.671-2.417-6.64-4.075-5.14-4.327-8.86-9.853-12.285-15.567-1.253-2.088-2.434-4.216-3.791-6.568l-2.73 1.07c-6.9 2.744-13.793 5.525-20.719 8.206-1.283.498-1.993 1.113-2.195 2.536-.348 2.448-1.671 4.45-3.65 5.863-2.627 1.873-5.23 3.897-8.13 5.242-7.45 3.455-15.058 6.558-22.594 9.819-1.95.843-3.832.801-5.844.101-2.82-.983-3.673-2.417-2.878-5.386.082-.306.126-.628.232-1.187-.954.152-1.698.31-2.455.384-1.04.103-2.096.284-3.125.192-2.948-.266-4.025-2.656-2.316-5.048.492-.684 1.078-1.297 1.898-2.264-1.469-.029-2.56-.03-3.645-.08-1.294-.056-2.42-.436-2.918-1.797-.487-1.335-.022-2.494.97-3.302 1.48-1.206 3.1-2.245 4.684-3.321.76-.515 1.571-.963 2.2-1.825-.946.04-1.898.145-2.836.099-1.125-.06-2.3-.08-3.358-.415-2.044-.65-2.711-2.72-1.36-4.378a11.71 11.71 0 013.173-2.677c2.189-1.262 4.489-2.345 6.783-3.416 3.17-1.476 6.38-2.86 9.559-4.313.608-.28 1.154-.696 2.07-1.261-.994-.712-1.758-1.224-2.492-1.79-1.863-1.44-3.88-2.733-5.533-4.39-3.432-3.426-2.42-7.25 2.285-8.45 1.787-.453 3.856-.386 5.68.006a486.502 486.502 0 0120.142 4.796c1.814.473 3.316.452 5.021-.315 7.02-3.141 14.094-6.17 21.139-9.259.697-.305 1.352-.717 2.151-1.144l-.008.019zM25.38 73.626c-1.69.766-3.253 1.54-4.866 2.198-3.398 1.395-6.827 2.71-10.227 4.1-1.047.426-2.061.953-3.053 1.508-.951.528-1.863 1.222-1.348 2.483.51 1.232 1.596 1.194 2.679.857.834-.26 1.663-.544 2.47-.871 4.215-1.7 8.426-3.419 12.638-5.123.648-.26 1.302-.531 1.98-.688.99-.229 1.74.221 2.1 1.135.367.937.074 1.719-.877 2.17-.867.412-1.74.821-2.62 1.203-3.128 1.356-6.28 2.654-9.377 4.076a42.965 42.965 0 00-5.062 2.74c-.442.283-.528 1.133-.777 1.722.597.231 1.217.691 1.792.642.936-.078 1.882-.408 2.76-.778 4.502-1.916 8.978-3.884 13.474-5.813.792-.342 1.626-.798 2.44-.792.663.004 1.58.456 1.924 1.003.55.875-.325 1.384-1.012 1.783-2.19 1.272-4.453 2.434-6.57 3.824-2.11 1.385-4.115 2.942-6.074 4.538-.431.35-.776 1.25-.643 1.762.234.911 1.154.938 1.972.716 1.01-.272 2.058-.487 3.002-.914 5.81-2.626 11.63-5.225 17.374-7.995 3.296-1.588 6.496-3.396 9.656-5.25 2.211-1.297 3.858-3.174 3.577-5.949-.21-2.063.728-3.072 2.476-3.742 1.713-.657 3.393-1.409 5.088-2.11 12.115-5.016 24.237-10.02 36.347-15.05 3.694-1.536 7.357-3.138 10.99-4.698-.384-3.469-5.568-16.646-7.625-19.37-.596.233-1.242.456-1.868.733-11.8 5.306-23.57 10.678-35.407 15.905-5.037 2.224-10.178 4.21-15.322 6.176-1.07.41-2.417.56-3.527.314-7.59-1.676-15.146-3.5-22.723-5.232-.784-.179-1.633-.089-2.414-.118-.043.42-.086.545-.05.583 3.08 3.068 6.394 5.81 10.438 7.553.566.244 1.3.783 1.376 1.28.084.516-.404 1.302-.875 1.683-.664.535-1.522.84-2.327 1.172-4.123 1.695-8.304 3.267-12.373 5.086-3.024 1.346-5.92 2.994-8.86 4.525-.708.37-1.387.802-1.071 1.883 1.47.56 2.896-.076 4.295-.371 4.443-.947 8.862-2.018 13.289-3.016 2.327-.525 2.616-.276 2.812 2.516l-.001.01z" fill="#027056">
                    </path>
                </svg>
            </h1>
            <h1 className='font-extrabold text-3xl lg:text-7xl'>
                using better data
            </h1>
            <div className='flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 mt-10 lg:mt-16'>
                {[{
                    title: 'Free',
                    description: 'Uncover insights fast in video calls, support tickets, docs, and more',
                    recommend: false,
                }, {
                    title: 'Professional',
                    description: 'Build your customer insights hub with powerful search, folders, and more',
                    recommend: true,
                }, {
                    title: 'Enterprise',
                    description: 'Scale customer insights org-wide with Enterprise-grade functionality',
                    recommend: false,
                }].map((ele, i) =>
                    <div className='border rounded-lg w-full p-8' key={i}>
                        <div className='text-xl font-extrabold mb-4'>
                            {ele.title}
                        </div>
                        <div className='text-base font-medium mb-8'>
                            {ele.description}
                        </div>
                        <hr />
                        <Button variant={ele.recommend ? "default" : "outline"} className="text-base font-bold my-8 w-full ">
                            Get Started
                        </Button>
                        <hr />
                        <div className='flex flex-col gap-4 mt-8'>
                            <div className='flex items-center gap-2'>
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 3s1 4 3 6 6 3 6 3-4 1-6 3-3 6-3 6-1-4-3-6-6-3-6-3 4-1 6-3 3-6 3-6z" fill="url(#shuriken-gradient_svg__paint0_linear_642_159)">
                                    </path>
                                    <defs>
                                        <linearGradient id="shuriken-gradient_svg__paint0_linear_642_159" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#027056"></stop><stop offset="1" stopColor="#01251c">
                                            </stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className='text-base font-medium'>
                                    No credit card required
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 9l-7 7-3-3" stroke="url(#check-gradient_svg__paint0_linear_642_168)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <defs>
                                        <linearGradient id="check-gradient_svg__paint0_linear_642_168" x1="12" y1="9" x2="12" y2="16" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#027056"></stop><stop offset="1" stopColor="#01251c"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className='text-base font-medium'>
                                    Automatic summarization
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 9l-7 7-3-3" stroke="url(#check-gradient_svg__paint0_linear_642_168)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <defs>
                                        <linearGradient id="check-gradient_svg__paint0_linear_642_168" x1="12" y1="9" x2="12" y2="16" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#027056"></stop><stop offset="1" stopColor="#01251c"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className='text-base font-medium'>
                                    Highlights key moments
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 9l-7 7-3-3" stroke="url(#check-gradient_svg__paint0_linear_642_168)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <defs>
                                        <linearGradient id="check-gradient_svg__paint0_linear_642_168" x1="12" y1="9" x2="12" y2="16" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#027056"></stop><stop offset="1" stopColor="#01251c"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className='text-base font-medium'>
                                    Identifies themes
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
