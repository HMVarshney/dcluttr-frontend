"use client";
import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { setHideBanner } from "@/lib/store/features/userSlice";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";

export default function OrbitingCirclesDemo() {
    const dispatch = useDispatch();
    const hideBanner = useSelector((state) => state.user.hideBanner);

    return (
        <div
            className={cn("transition-all py-3 px-6 relative max-h-96 overflow-hidden opacity-100", {
                "max-h-0 py-0 opacity-0": hideBanner
            })}
        >
            <X
                size={50}
                className="absolute top-4 right-8 cursor-pointer p-4 bg-primary"
                color="#ffffff"
                onClick={() => dispatch(setHideBanner(true))}
            />
            <Image
                src="/temp/header_banner.png"
                alt="header"
                className="w-full  object-contain"
                width={2000}
                height={400}
                priority
            />
        </div>
    );
    // return (
    //     <div className="my-3 mx-6 flex h-[120px] flex-col items-center justify-center overflow-hidden rounded-lg border shadow-sm bg-primary relative">
    //         <X
    //             size={18}
    //             className="absolute top-4 right-4 cursor-pointer"
    //             color="#ffffff"
    //             onClick={() => dispatch(setHideBanner(true))}
    //         />

    //         <div className="pointer-events-none whitespace-pre-wrap text-white text-center text-2xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
    //             Overview
    //             <br />
    //             <span className="text-center text-xs font-normal">Get all the important metrics at one place</span>
    //         </div>

    //         {/* Inner Circles */}
    //         {[
    //             <Image key={0} src="/band-logo/google.png" alt="Overview" width={100} height={100} className="w-6" />,
    //             <Image key={1} src="/band-logo/meta.png" alt="Overview" width={100} height={100} className="w-6" />,
    //             <Image key={2} src="/band-logo/shopify.png" alt="Overview" width={100} height={100} className="w-6" />,
    //             <Image
    //                 key={4}
    //                 src="/band-logo/instagram.svg"
    //                 alt="Overview"
    //                 width={100}
    //                 height={100}
    //                 className="w-6"
    //             />,
    //             <Image key={5} src="/band-logo/youtube.svg" alt="Overview" width={100} height={100} className="w-6" />
    //         ].map((Icon, i) => (
    //             <OrbitingCircles
    //                 key={i}
    //                 className="size-[36px] border-none bg-white"
    //                 radius={180}
    //                 duration={60}
    //                 delay={i * 10}
    //             >
    //                 {Icon}
    //             </OrbitingCircles>
    //         ))}

    //         {/* Outer Circles (reverse) */}
    //         {[
    //             <Image key={0} src="/band-logo/google.png" alt="Overview" width={100} height={100} className="w-6" />,
    //             <Image key={1} src="/band-logo/meta.png" alt="Overview" width={100} height={100} className="w-6" />,
    //             <Image key={2} src="/band-logo/shopify.png" alt="Overview" width={100} height={100} className="w-6" />,
    //             <Image
    //                 key={4}
    //                 src="/band-logo/instagram.svg"
    //                 alt="Overview"
    //                 width={100}
    //                 height={100}
    //                 className="w-6"
    //             />,
    //             <Image key={5} src="/band-logo/youtube.svg" alt="Overview" width={100} height={100} className="w-6" />
    //         ].map((Icon, i) => (
    //             <OrbitingCircles
    //                 key={i}
    //                 className="size-[36px] border-none bg-white"
    //                 radius={260}
    //                 duration={60}
    //                 delay={i * 10}
    //                 reverse
    //             >
    //                 {Icon}
    //             </OrbitingCircles>
    //         ))}
    //     </div>
    // );
}
