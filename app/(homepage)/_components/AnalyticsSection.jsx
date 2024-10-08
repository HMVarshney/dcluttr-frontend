

import Image from 'next/image'
import React from 'react'

export default function AnalyticsSection() {
    return (
        <section className='my-24 lg:my-52 mx-auto max-w-5xl px-4'>
            <div className='flex items-center justify-center gap-2 lg:gap-3 font-extrabold text-center text-3xl lg:text-6xl'>
                Eye-opening insights<Image src={"/icons/sheets.svg"} alt="logo" width={100} height={100} className="w-6 lg:w-12 object-contain" />
            </div>
            <p className='text-center text-lg lg:text-xl my-6'>
                All your key marketing metrics, with pinpoint accuracy.
            </p>

            <div className='flex flex-col lg:flex-row gap-6 my-6 lg:gap-8 lg:my-10'>
                {/* card 1 */}
                <div className="w-full lg:w-7/12 border rounded-md bg-[#fafafb] hover:m-[-2px_2px_2px_-2px] transition-all duration-300 ease-in-out relative group hover:shadow-lg">
                    <span className='hidden lg:block transition-all duration-300 ease-in-out absolute opacity-0 -top-10 -left-10 group-hover:opacity-100 group-hover:-top-14 group-hover:-left-14 '>
                        <svg width="54" height="80" viewBox="0 0 54 80" fill="#027056" xmlns="http://www.w3.org/2000/svg" className='-rotate-[80deg]'>
                            <path d="M23.823 21.287c.322-1.262.429-2.137.768-2.918a1175.249 1175.249 0 016.61-15.132c.346-.774.864-1.524 1.483-2.09.411-.375 1.31-.703 1.686-.5.553.304 1.125 1.09 1.155 1.697.053.93-.232 1.936-.578 2.823-2.078 5.33-4.222 10.642-6.342 15.954-.12.297-.262.595-.435.87-.595.964-1.411 1.952-2.566 1.399-.804-.387-1.275-1.471-1.781-2.103zM5.492 13.456c.113 1.507.262 3.008.328 4.52.047 1.221-.578 2.09-1.751 2.406-1.18.316-2.138-.185-2.763-1.185-.334-.536-.65-1.173-.691-1.787C.365 13.653.192 9.895.008 6.137c-.018-.315-.018-.738.16-.94.596-.685 1.191-1.644 1.954-1.853 1.197-.321 2.036.655 2.292 1.78.358 1.573.554 3.187.757 4.789.149 1.173.19 2.364.286 3.55h.041l-.006-.007zM53.211 25.314c.435.31 1.328.643 1.668 1.274.274.506.035 1.441-.238 2.066-.245.548-.804 1-1.31 1.388-2.383 1.834-4.795 3.633-7.194 5.443-.257.19-.53.37-.816.518-1.269.667-2.59 1.268-3.883.179-.953-.798-.768-2.674.554-4.05 2.71-2.817 5.937-4.925 9.558-6.414.393-.16.834-.202 1.661-.399v-.005z" ></path>
                        </svg>
                    </span>
                    <div className='pt-16 pb-8 pl-8'>
                        <Image
                            src="https://images.ctfassets.net/mmu68mmhtb17/59SeNn0zqOcIhi7gFwvEbO/196ce7b64fbf3cedba5fc088e7ab4e01/Zotify.png"
                            alt="logo" width={800} height={500}
                            className="w-full object-contain shadow rounded-s-lg" />
                    </div>
                    <div className='pb-16 px-8 lg:w-2/3'>
                        <div className='text-black text-xl lg:text-3xl font-extrabold my-4'>
                            Ship more winning creatives
                        </div>
                        <div className='text-black text-base font-medium'>
                            Identify key drivers of creative performance. Plot and compare - in the palm of your hand. And it’s beautiful.
                        </div>
                    </div>
                </div>

                {/* card 2 */}
                <div className="w-full lg:w-5/12 border rounded-md bg-[#fafafb] hover:m-[-2px_2px_2px_-2px] transition-all duration-300 ease-in-out relative group hover:shadow-lg">
                    <span className='hidden lg:block transition-all duration-300 ease-in-out absolute opacity-0 -top-10 -right-10 group-hover:opacity-100 group-hover:-top-14 group-hover:-right-14 '>
                        <svg width="54" height="80" viewBox="0 0 54 80" fill="#027056" xmlns="http://www.w3.org/2000/svg" className='-rotate-[80deg]'>
                            <path fillRule="evenodd" clipRule="evenodd" d="M40.234 12.227C35.398 36.205 13.204 46.046 2.762 48c-.962.18-1.878-.428-2.048-1.36-.169-.93.474-1.832 1.436-2.012 9.724-1.819 30.178-11.015 34.614-33.005.188-.933 1.117-1.555 2.076-1.387.958.167 1.582 1.059 1.394 1.992zM28.096 2.32C26.668 21.192 10.918 30.464 3.275 32.765a1.743 1.743 0 11-1.005-3.337c6.955-2.095 21.077-10.542 22.35-27.371a1.743 1.743 0 013.476.263z"></path>
                        </svg>
                    </span>
                    <div className='pt-16 pb-8 pl-8'>
                        <Image
                            src="https://images.ctfassets.net/mmu68mmhtb17/69EzgGhhI2bamosQQVHYy8/4df507a1a093cb8a9645520cf05fc722/Frame_1699553948.png"
                            alt="logo" width={800} height={800}
                            className="w-full h-[320px] object-contain shadow rounded-s-lg" />
                    </div>
                    <div className='pb-16 px-8'>
                        <div className='text-black text-xl lg:text-3xl font-extrabold my-4'>
                            Identify your top performing products
                        </div>
                        <div className='text-black text-base font-medium'>
                            Analyse product performance data from all your marketing channels - scale hero products.
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex flex-col lg:flex-row gap-6 my-6 lg:gap-8 lg:my-10'>
                {/* card 3 */}
                <div className="flex flex-col lg:flex-row items-center w-full border rounded-md bg-[#fafafb] hover:m-[-2px_2px_2px_-2px] transition-all duration-300 ease-in-out relative group hover:shadow-lg">
                    <span className='hidden lg:block transition-all duration-300 ease-in-out absolute opacity-0 -bottom-10 -left-10 group-hover:opacity-100 group-hover:-bottom-14 group-hover:-left-14 '>
                        <svg width="54" height="80" viewBox="0 0 54 80" fill="#027056" xmlns="http://www.w3.org/2000/svg" className=''>
                            <path d="M25.82 16.034c-.474.021-.93.27-1.403.372-4.164.9-7.5-.712-8.833-4.74C14.8 9.295 14.66 6.701 14.29 4.2c-.145-.96.07-2.016-.236-2.9C13.848.716 13.016.004 12.457 0c-.559-.005-1.257.7-1.644 1.267-.296.431-.194 1.132-.269 1.714-.57 4.292-1.633 8.454-3.546 12.347-1.042 2.124-2.245 4.113-4.862 4.706-1.015.232-2.423 3.04-2.085 4.098.156.48.984 1.148 1.376 1.072 2.874-.566 4.336 1.337 5.7 3.235 1.736 2.42 2.628 5.23 3.01 8.173.22 1.742.28 3.51.466 5.257.172 1.59.92 2.367 2.225 2.286 1.461-.21 1.687-1.499 2.074-2.728 2.455-7.84 6.232-14.956 11.578-21.204.44-.512.924-1.046 1.166-1.66.553-1.402-.344-2.615-1.816-2.54l-.01.011zm-8.624 10.432c-1.166 1.979-2.22 4.027-3.59 6.54-1.54-4.556-3.153-8.524-6.892-10.794 1.746-3.024 3.39-5.87 5.06-8.766 1.124 1.386 2.171 3.17 3.676 4.394 1.456 1.191 3.38 1.806 5.383 2.82-1.123 1.784-2.428 3.763-3.632 5.8l-.005.006zM50.75 49.295c-.264.124-.522.27-.796.366-4.325 1.52-7.86-.21-9.075-4.604-.515-1.87-.725-3.838-.978-5.774-.327-2.49-.848-3.44-2.095-3.262-1.843.26-1.75 1.79-1.907 3.154-.5 4.4-1.413 8.69-3.433 12.675-.95 1.876-1.967 3.623-4.503 3.532-.838-.027-1.73.188-2.525.485-.564.21-1.332.668-1.424 1.137-.102.496.355 1.467.801 1.65 1.23.507 2.6.652 3.89 1.04 1.07.324 2.39.513 3.084 1.25 1.096 1.166 2.122 2.638 2.52 4.158.612 2.334.671 4.814.967 7.235-.06.01-.113.022-.172.027-.102 1.467-.269 2.928-.296 4.394-.02 1.499.726 2.486 1.86 2.54 1.256.064 1.97-.675 2.33-1.812.12-.372.221-.75.307-1.132 2.07-9.236 6.383-17.172 13.491-23.49.897-.798 1.386-1.742.752-2.841-.628-1.095-1.665-1.246-2.794-.718l-.005-.01zM39.025 63.549c-1.553-2.285-3.095-4.55-4.782-7.03l3.508-7.418c1.086 1.083 2.02 2.302 3.224 3.127 1.241.846 2.75 1.31 4.223 1.973l-6.173 9.348z"></path>
                        </svg>
                    </span>
                    <div className='p-8'>
                        <Image
                            src="https://images.ctfassets.net/mmu68mmhtb17/59SeNn0zqOcIhi7gFwvEbO/196ce7b64fbf3cedba5fc088e7ab4e01/Zotify.png"
                            alt="logo" width={800} height={800}
                            className="w-full h-[320px] object-contain shadow rounded-lg" />
                    </div>
                    <div className='pb-16 px-8'>
                        <div className='text-black text-xl lg:text-3xl font-extrabold my-4'>
                            Detailed customer journeys
                        </div>
                        <div className='text-black text-base font-medium'>
                            View exact user journeys, for every single purchase - exactly as it happened.
                        </div>
                    </div>
                </div>
                {/* card 4 */}
                {/* <div className="w-full lg:w-7/12 border rounded-md bg-[#fafafb] hover:m-[-2px_2px_2px_-2px] transition-all duration-300 ease-in-out relative group hover:shadow-lg">
                    <span className='hidden lg:block transition-all duration-300 ease-in-out absolute opacity-0 -bottom-10 -right-10 group-hover:opacity-100 group-hover:-bottom-14 group-hover:-right-14 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="101" height="78" viewBox="0 0 101 78" fill="#027056" className='-rotate-[60deg]' >
                            <path fillRule="evenodd" clipRule="evenodd" d="M51.219 56.848c10.913 3.376 22.96 4.053 33.976 1.061 4.01-1.088 7.538-3.01 11.168-4.944a.525.525 0 00-.494-.925c-3.56 1.896-7.017 3.789-10.948 4.856-10.86 2.95-22.737 2.261-33.488-1.08l.038-.169c.418-1.84-.54-4.212-2.288-6.554-2.505-3.358-3.589-4.688-6.987-6.3-1.527-.724-2.927-1.099-4.005-1.021-.84.06-1.506.385-1.952.983-.948 1.276-.553 3.052.777 4.938 2.778 3.946 6.543 6.523 9.96 7.742 1.068.38 2.15.748 3.243 1.098-.065.326-.13.644-.206.951-.222.874-.55 1.665-1.356 2.322-1.257 1.024-2.915 1.488-4.677 1.639-2.749.233-5.75-.306-7.987-.837-12.457-2.956-19.916-10.9-24.761-19.401C6.34 32.62 4.099 23.46 2.108 18.19a.524.524 0 10-.981.371c2.004 5.304 4.269 14.52 9.194 23.164 4.972 8.728 12.642 16.868 25.429 19.904 2.33.553 5.456 1.104 8.319.86 1.982-.169 3.837-.719 5.251-1.87 1.269-1.035 1.599-2.32 1.899-3.772zm-.79-1.35l.02-.084c.365-1.608-.578-3.645-2.107-5.693-2.408-3.226-3.329-4.43-6.596-5.98-1.12-.531-2.158-.867-3.023-.923-.713-.045-1.295.098-1.64.564-.329.438-.389.964-.268 1.539.142.674.521 1.406 1.058 2.168 2.67 3.79 6.172 6.186 9.456 7.358 1.02.363 2.054.715 3.1 1.051z" fill="#027056" stroke="#027056" strokeWidth="2"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M97.586 50.508c0 .23-.096.537-.202.867-.252.785-2.105 8.786-2.282 9.201a.526.526 0 00.968.409c.215-.51 2.202-8.798 2.436-9.71.125-.49.154-.926.07-1.218-.14-.497-.603-.733-1.392-.556-.933.21-9.637.58-11.207.305a.524.524 0 10-.18 1.034c1.497.261 10.123.127 11.192-.199a5.31 5.31 0 01.597-.133z" fill="#027056" stroke="#027056" strokeWidth="2"></path>
                        </svg>

                    </span>
                    <div className='pt-16 pb-8 pl-8'>
                        <Image
                            src="https://images.ctfassets.net/mmu68mmhtb17/59SeNn0zqOcIhi7gFwvEbO/196ce7b64fbf3cedba5fc088e7ab4e01/Zotify.png"
                            alt="logo" width={800} height={500}
                            className="w-full object-contain shadow rounded-s-lg" />
                    </div>
                    <div className='pb-16 px-8 lg:w-2/3'>
                        <div className='text-black text-xl lg:text-3xl font-extrabold my-4'>
                            Insights where your team works
                        </div>
                        <div className='text-black text-base font-medium'>
                            Surface research insights in the tools your stakeholders use with Slack, Atlassian, Notion, and Zapier integrations.
                        </div>
                    </div>
                </div> */}
            </div>

        </section>
    )
}
