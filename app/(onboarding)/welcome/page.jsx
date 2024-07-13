"use client"

import React, { useState } from 'react'
import WelcomeToDcluttr from '../_components/WelcomeToDcluttr'
import BrandDetails from '../_components/BrandDetails'
import PendingApproval from '../_components/PendingApproval'
import ConnectYourData from '../_components/ConnectYourData'
import InstallDcluttrPixel from '../_components/InstallDcluttrPixel'
import AllDoneStartUsingDcluttr from '../_components/AllDoneStartUsingDcluttr'
import DecluttrNotWorksInPhone from "@/components/DecluttrNotWorksInPhone";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";


export default function Page() {
    const [step, setStep] = useState(5)

    return (
        <main className="w-full h-full ">
            <DecluttrNotWorksInPhone />
            <div className="lg:grid grid-cols-12 h-full hidden">
                <div className="col-span-5 bg-[#F5F5F5] h-full flex flex-col items-stretch justify-center px-8">
                    <div className=" flex justify-between items-center">
                        <Link href='/' className='w-[240px] flex gap-1 items-center'>
                            <Image
                                src="/logoIcon.svg"
                                alt="logo"
                                width={100}
                                height={100}
                                className="w-8 object-contain"
                            />
                            <span className='font-extrabold text-xl text-black'>
                                Decluttr
                            </span>
                        </Link>
                        <div className='text-primary text-sm'>
                            Return to All Stores
                        </div>
                    </div>
                    <div className="border border-[#0000001F] bg-white rounded-lg p-4 mt-4">
                        <div className='font-medium text-sm text-black mb-2'>
                            {(step / 7 * 100)?.toFixed(0)}% Completed
                        </div>
                        <Progress value={(step / 7 * 100)?.toFixed(0)} className="bg-[#0000001F]" />
                    </div>

                    <div className='border border-[#0000001F] bg-white rounded-lg p-4 flex flex-col gap-2.5 mt-12'>
                        <div className='font-bold text-lg text-black mb-2.5'>
                            Steps involved for Onboarding
                        </div>
                        {[{
                            title: 'Welcome',
                            disc: 'Avg. time to complete: 3 mins',
                            btnText: 'Let’s go!',
                            status: "DONE"
                        }, {
                            title: 'Brand Details',
                            disc: 'Avg. time to complete: 3 mins',
                            btnText: 'Completed',
                            status: "DONE"
                        }, {
                            title: 'Pending Approval',
                            disc: 'Avg. time to complete: 3 mins',
                            btnText: 'Approved',
                            status: "DONE"
                        }, {
                            title: 'Connect your Data',
                            disc: 'Avg. time to complete: 3 mins',
                            btnText: 'None Added',
                            status: "DONE"
                        }, {
                            title: 'Install Dcluttr Pixel',
                            disc: 'Avg. time to complete: 3 mins',
                            btnText: 'None Added',
                            status: true
                        }, {
                            title: 'All Set',
                            disc: 'Avg. time to complete: 3 mins',
                            btnText: 'None Added',
                            status: true
                        }]?.map((ele, i) =>
                            <div className='flex gap-2 border rounded-md px-4 py-3' key={ele.title}>
                                {step > i ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className="fill-primary mt-1">
                                    <path d="M9 0.875C7.39303 0.875 5.82214 1.35152 4.486 2.24431C3.14985 3.1371 2.10844 4.40605 1.49348 5.8907C0.87852 7.37535 0.717618 9.00901 1.03112 10.5851C1.34463 12.1612 2.11846 13.6089 3.25476 14.7452C4.39106 15.8815 5.8388 16.6554 7.4149 16.9689C8.99099 17.2824 10.6247 17.1215 12.1093 16.5065C13.594 15.8916 14.8629 14.8502 15.7557 13.514C16.6485 12.1779 17.125 10.607 17.125 9C17.1227 6.84581 16.266 4.78051 14.7427 3.25727C13.2195 1.73403 11.1542 0.877275 9 0.875ZM12.5672 7.56719L8.19219 11.9422C8.13415 12.0003 8.06522 12.0464 7.98934 12.0779C7.91347 12.1093 7.83214 12.1255 7.75 12.1255C7.66787 12.1255 7.58654 12.1093 7.51067 12.0779C7.43479 12.0464 7.36586 12.0003 7.30782 11.9422L5.43282 10.0672C5.31554 9.94991 5.24966 9.79085 5.24966 9.625C5.24966 9.45915 5.31554 9.30009 5.43282 9.18281C5.55009 9.06554 5.70915 8.99965 5.875 8.99965C6.04086 8.99965 6.19992 9.06554 6.31719 9.18281L7.75 10.6164L11.6828 6.68281C11.7409 6.62474 11.8098 6.57868 11.8857 6.54725C11.9616 6.51583 12.0429 6.49965 12.125 6.49965C12.2071 6.49965 12.2884 6.51583 12.3643 6.54725C12.4402 6.57868 12.5091 6.62474 12.5672 6.68281C12.6253 6.74088 12.6713 6.80982 12.7027 6.88569C12.7342 6.96156 12.7504 7.04288 12.7504 7.125C12.7504 7.20712 12.7342 7.28844 12.7027 7.36431C12.6713 7.44018 12.6253 7.50912 12.5672 7.56719Z" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" className=" mt-1">
                                        <path d="M8.125 0C6.51803 0 4.94714 0.476523 3.611 1.36931C2.27485 2.2621 1.23344 3.53105 0.618482 5.0157C0.00352044 6.50035 -0.157382 8.13401 0.156123 9.71011C0.469628 11.2862 1.24346 12.7339 2.37976 13.8702C3.51606 15.0065 4.9638 15.7804 6.53989 16.0939C8.11599 16.4074 9.74966 16.2465 11.2343 15.6315C12.719 15.0166 13.9879 13.9752 14.8807 12.639C15.7735 11.3029 16.25 9.73197 16.25 8.125C16.2477 5.97081 15.391 3.90551 13.8677 2.38227C12.3445 0.85903 10.2792 0.00227486 8.125 0ZM8.125 15C6.76526 15 5.43605 14.5968 4.30546 13.8414C3.17487 13.0859 2.29368 12.0122 1.77333 10.7559C1.25298 9.49971 1.11683 8.11737 1.3821 6.78375C1.64738 5.45013 2.30216 4.22513 3.26364 3.26364C4.22513 2.30215 5.45014 1.64737 6.78376 1.3821C8.11738 1.11683 9.49971 1.25298 10.756 1.77333C12.0122 2.29368 13.0859 3.17487 13.8414 4.30545C14.5968 5.43604 15 6.76525 15 8.125C14.9979 9.94773 14.2729 11.6952 12.9841 12.9841C11.6952 14.2729 9.94773 14.9979 8.125 15Z" fill="#D9D7D7" />
                                    </svg>
                                }
                                <div className="">
                                    <div className='text-base font-medium'>
                                        {ele.title}
                                    </div>
                                    <div className='text-xs font-light text-[#031B15B2]'>
                                        {ele.disc}
                                    </div>
                                </div>
                                <div className='text-sm font-medium text-primary ml-auto mt-2.5'>
                                    {ele.btnText}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-7">
                    <main className="w-full h-full " onClick={() => setStep(pre => pre < 6 ? pre + 1 : 1)}>
                        {step === 1 && <WelcomeToDcluttr />}
                        {step === 2 && <BrandDetails />}
                        {step === 3 && <PendingApproval />}
                        {step === 4 && <ConnectYourData />}
                        {step === 5 && <InstallDcluttrPixel />}
                        {step === 6 && <AllDoneStartUsingDcluttr />}
                    </main>
                </div>
            </div>
        </main>

    )
}
