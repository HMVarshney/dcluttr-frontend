import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

export default function Navbar({ isOpen }) {
    const dispatch = useDispatch();
    const { brandsList, selectedBrand, isLoadingBrandsList } = useSelector((state) => state.brand);

    const handleBrandChange = (brandId) => {
        const selected = brandsList.find((brand) => brand.id === brandId);
        dispatch(setBrand(selected));
    };

    return (
        <div className='w-full py-4 border-b flex gap-4'>
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
                        {brandsList.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
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
        </div>
    );
}
