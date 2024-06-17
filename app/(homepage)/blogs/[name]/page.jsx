


import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ScaleItSection from '../../_components/ScaleItSection';

let data = [
    {
        "id": "b3c7be6d-e99b-56bd-9f66-02967ce96fee",
        "slug": "the-qualitative-research-process-end-to-end",
        "title": "The qualitative research process, end-to-end",
        "categories": "Best practice",
        "publishedAt": "2023-06-30T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/2rfWgthAXeQidsGXJqcfVs/8cdfbc2ce4e19286efc33bfed2facf50/Blog-The-qualitative-research-process.jpg",
    },
    {
        "id": "d057b308-60a2-5950-97fe-b67daf5d3c57",
        "slug": "repository-strategy",
        "title": "How we developed our repository strategy ",
        "categories": "Best practice",
        "publishedAt": "2022-11-11T00:00+11:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/4tgWPd1E179P2qc29E66sx/70d9661a451f2242337e7cc32340f96f/22.06.16-MM-Lessons-from-Lightricks-Set-up-repository.jpg",
    },
    {
        "id": "10b13d19-3aee-592d-9b25-b7aeb1d04ca5",
        "slug": "job-atlas-share-jtbd-research",
        "title": "Use a job atlas to share your JTBD Research",
        "categories": "Best practice",
        "publishedAt": "2022-10-28T00:00+11:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/59DH82iNieBQ1z7XXSI3mM/3ca3d3203bed71326b41251739cc5064/22.10.26_Jobs-to-be-done-part2.jpg",
    },
    {
        "id": "d408c0b6-9a3d-5eb8-aa91-a7865e0e3a5c",
        "slug": "framework-jobs-to-be-done",
        "title": "Getting started with Jobs to be Done",
        "categories": "Best practice",
        "publishedAt": "2022-10-07T00:00+11:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/3dCLPE2Km3Ppq7F6COdiNB/a79bddf0c677b1255c6611f652871598/blog-22.10.05-Jobs-to-be-done__1_.jpg",
    },
    {
        "id": "89515739-ee21-57df-bb29-bc81ed721cd6",
        "slug": "research-method-discovery-product-management",
        "title": "How to choose the right research methods for your discovery process",
        "categories": "Best practice",
        "publishedAt": "2022-10-07T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/67tStFOhf8GgEgAP4qWXNn/12a4611baed48a5f28453c54cc79d0cf/22.06.09-MM-How-to-know-what-types-of-research-you-need-in-your-discovery-process.jpg",
    },
    {
        "id": "505bf445-51b8-5217-9f77-45d600b603ed",
        "slug": "unmoderated-user-testing",
        "title": "How to conduct unmoderated user testing",
        "categories": "Best practice",
        "publishedAt": "2022-10-07T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/3DKGCz00lpiut1uqO7l7ZY/25bd8644ccec2a87500a05e9dbca2f04/blog_22.08.26_Unmoderated_User_Testing.gif",
    },
    {
        "id": "04a610ad-f2c2-5005-b5c1-8205142b17fb",
        "slug": "framework-research-prioritization",
        "title": "A three-step framework for research prioritization ",
        "categories": "Best practice",
        "publishedAt": "2022-08-25T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/2lU1W5LoSXdWnH9Jtg8vaA/1f2ed791c2bbc77589ecde170f897acb/22.07.14-MM-Lessons-from-Lightricks-prioritize-your-research-work.jpg",
    },
    {
        "id": "75f7ab49-24f1-52d2-92bd-02bf1cf97220",
        "slug": "diving-into-research-design",
        "title": "Diving into research design 101",
        "categories": "Best practice",
        "publishedAt": "2022-08-10T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/1KouBVO1oSz7pnu7sPkMde/1dc98c740f94e564fe1939991b7062a8/22.08.05_MM_Diving_into_research_design__1_.png",
    },
    {
        "id": "30d2d1fb-29ee-5b9b-b6b9-e0fd8aa62dfa",
        "slug": "improve-stakeholder-meetings",
        "title": "Five questions to improve your pre-project stakeholder meetings",
        "categories": "Best practice",
        "publishedAt": "2022-08-05T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/1R1sRfAfRFhdc0ksfkPC1L/8fddf171a99d38d12654d4b9cd0679d5/22.07.06-MM-Lessons-from-Lightricks-5-Questions.jpg",
    },
    {
        "id": "bc785a50-c965-5a28-bc84-43ed6ee2457e",
        "slug": "six-step-framework-product-strategy",
        "title": "Six-step framework for a high-performing product strategy",
        "categories": "Best practice",
        "publishedAt": "2022-08-01T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/7Gn0v6xymPeX3qx5TlI5QY/433c6fee576fb8d244ac92e34f86e180/22.07.30_MM_Six-step_framework_for_a_high-performing_product_strategy.jpg",
    },
    {
        "id": "270ca01e-5ad3-569a-820e-a18b72b7baea",
        "slug": "making-insights-actionable",
        "title": "The Baton Handover: making insights actionable  ",
        "categories": "Best practice",
        "publishedAt": "2022-07-15T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/1iSTGq7y2ftO0fMWIsmBkd/609c423499fe4831432ec61690e03356/22.07.12_MM_Passing_the_baton.jpg",
    },
    {
        "id": "d5af6624-c60c-5966-8d22-b7f6fac81f02",
        "slug": "research-low-ux-maturity-organization",
        "title": "How UXR leaders approach research in a low UX maturity organization",
        "categories": "Best practice",
        "publishedAt": "2022-07-14T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/5xxk3PfY4RPw60ctKwoUXN/ff6eba5aa2db6191190c3b79411e55f8/22.07.04_MM_Stakeholder_perspectives_towards_research_Pt.3.jpg",
    },
    {
        "id": "a49128c4-96e3-545d-a301-7f15355f7794",
        "slug": "building-uxr-practice",
        "title": "Building a UXR practice in a thriving organization: how to achieve quick wins",
        "categories": "Best practice",
        "publishedAt": "2022-07-05T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/248oOypBJXcSRHKHHom6zo/ae682b38635ce189a259a7ab5cce0d8f/22.06.16_MM_Lessons-from-Lightricks-Quick-Wins.jpg",
    },
    {
        "id": "16cb341a-86c4-5433-b5ce-f7e8cfcba8ce",
        "slug": "management-strategy-how-to-uncover-stakeholder",
        "title": "How to uncover stakeholder perspectives on research: Part two",
        "categories": "Best practice",
        "publishedAt": "2022-06-22T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/5YyEaL2H7i1Dmc9HsVgF74/9e0414e15f8986825dcf8725d1f4729e/22.06.16_MM_Stakeholder_perspectives_towards_research_Pt.2__1_.jpg",
    },
    {
        "id": "d948173e-58cb-5e82-a292-e977d1624a4d",
        "slug": "uncover-stakeholder-perspectives-toward-research",
        "title": "How to uncover stakeholder perspectives on research: Part one",
        "categories": "Best practice",
        "publishedAt": "2022-06-21T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/1pYgLpk5xndXLTrw3rLMUN/717695461f76c202b5ee0b71438daf22/22.06.16_MM_Stakeholder_perspectives_towards_research_Pt.1.jpg",
    },
    {
        "id": "a913527c-0aa3-56a8-b015-51a0fca3b395",
        "slug": "triangulate-data",
        "title": "How to triangulate data from multiple sources in user research",
        "categories": "Best practice",
        "publishedAt": "2022-05-06T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/YaqE31oMuS3S0Byq5JlW1/1587e5a0dbd6d412bb5313b0b594c438/22.04.28_Triangulating_data_in_research.jpg",
    },
    {
        "id": "bb31f75d-dee4-5f0c-9e31-81b01c06eecf",
        "slug": "how-to-write-discussion-guide",
        "title": "How to write an unbiased and conversation-starting discussion guide",
        "categories": "Best practice",
        "publishedAt": "2022-04-28T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/0HYgmIMxM6Y9HVLvT9Y0X/46704461c6667606f6f0e54972ac89e2/22.04.28_Write_an_unbiased_and_conversation-starting_discussion_guide_-_bodyimages.png",
    },
    {
        "id": "a050e872-0761-5869-ac76-d291404ac07b",
        "slug": "remote-mobile-usability-test",
        "title": "How to plan a successful remote mobile usability test (and avoid nightmares)",
        "categories": "Best practice",
        "publishedAt": "2022-04-14T00:00+10:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/1JlbsBG0u4fDnPyLvg5kSj/bc83f6bd4347d9e930de83573dd7f564/22.03.30_How_to_Plan_a_Successful_Remote_Mobile_Usability_Test____avoid_nightmares_.png",
    },
    {
        "id": "34bfeb53-ebbd-5ad1-b92b-058d390f3c46",
        "slug": "human-centered-approaches-for-repository-planning",
        "title": "Two pivotal human-centered approaches for repository planning",
        "categories": "Best practice",
        "publishedAt": "2022-03-24T00:00+11:00",
        "images": "https://images.ctfassets.net/mmu68mmhtb17/6ASCcapWZQNWdnWq7mqx5t/24b86b8b5282040461e7c550c8356073/22.03.08_Conversations_with_stakeholders_about_a_research_repository.png",
    },
]


export default function page({ params }) {
    const { name } = params;
    const details = data.filter(ele => ele.slug === name)[0]
    return (
        <section className='my-12 lg:my-16 mx-auto max-w-5xl px-4'>
            <div className='w-fit border border-primary px-2 py-1 rounded-md font-bold bg-accent text-sm text-primary'>
                {details.categories}
            </div>
            <h1 className='font-extrabold text-3xl lg:text-6xl mt-2 lg:mt-4'>
                {details?.title}
            </h1>
            <Image
                className=' mt-6 lg:mt-12 w-full aspect-[320/160] rounded-lg '
                width={2000}
                height={1000}
                src={details.images}
                alt={details?.title} />

            <p className='my-6'>Most people think that creative teams love freedom—and hate structure.</p>
            <p className='my-6'>But creativity without structure can lead to low output, stretched timelines, and unclear goals.</p>
            <p className='my-6'>In a recent live series with Motion, Dara Denney revealed how to turn creative teams into performance powerhouses. With a track record of managing over $100M in ad spend, Dara is a true expert in the performance creative field.</p>
            <p className='my-6'>According to Dara, the key lies in one simple truth: creative freedom is a myth.</p>
            <p className='my-6'>“You need to attack the sources of ambiguity within the creative process. This is the secret to building high-performing creative teams,” says Dara.</p>
            <p className='my-6'>Keep reading for Dara’s strategy on how to remove these sources of ambiguity and the processes you need to increase your team's output. </p>

            <ScaleItSection />
        </section>
    )
}
