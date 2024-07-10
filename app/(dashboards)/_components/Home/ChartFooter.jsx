

export default function ChartFooter({ data }) {
    return (
        <div className='p-3 text-xs font-semibold text-[#515153] border-t border-[#F1F1F1] flex items-center gap-4'>
            {data?.series?.map(ele =>
                <div key={ele.name} className='flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: ele.color }} />
                    <div className='text-xs text-[#7D7D7E]'>{ele.name}</div>
                </div>)}
        </div>
    )
}