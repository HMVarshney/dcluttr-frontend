import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import necessary hooks
import { setSideBarClose } from '@/lib/store/features/userSlice';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { setBrand } from '@/lib/store/features/brandSlice';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { CaretDoubleRight } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


export default function Navbar({ isOpen }) {
    const dispatch = useDispatch();
    const { brandsList, selectedBrand, isLoadingBrandsList } = useSelector((state) => state.brand);

    const handleBrandChange = (brandId) => {
        const selected = brandsList.find((brand) => brand.id === brandId);
        dispatch(setBrand(selected));
    };

    const handleToggle = () => {
        dispatch(setSideBarClose(!isOpen));
    };
    return (
        <div className={cn('w-full py-4 flex gap-4 transition-all', { 'max-w-[78px] w-[78px] -ml-2 gap-2': isOpen })}>
            {isLoadingBrandsList ?
                <Skeleton className='w-full h-9 border' /> :
                <Select
                    value={selectedBrand?.id}
                    onValueChange={handleBrandChange}
                >
                    <SelectTrigger className="w-full p-1.5 h-9">
                        <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                        {brandsList.map((option, i) => (
                            <SelectItem key={i} value={option.id}>
                                <div className='flex items-center gap-3'>
                                    <Image
                                        src={option.brandLogo}
                                        alt={option.brandName}
                                        width={24}
                                        height={24}
                                        className="aspect-square rounded-md"
                                    />
                                    {option.brandName}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>}
            <Button variant="icon" className={cn('min-w-4 h-9 transition-all p-0', !isOpen ? 'rotate-180' : 'rotate-0')} onClick={handleToggle}>
                <CaretDoubleRight size={16} weight="bold" color='#027056' />
            </Button>
        </div>
    );
}
