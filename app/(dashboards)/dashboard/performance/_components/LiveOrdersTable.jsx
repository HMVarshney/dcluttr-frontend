"use client"

import React from 'react';

export default function LiveOrdersTable() {
    return (
        <div className='w-full'>
            <div className='text-xl font-bold mb-4'>
                Live Orders
            </div>
            <div className="shadow rounded-lg bg-white overflow-hidden h-[calc(100%-44px)]">
                <div className='flex gap-2.5 items-center p-4 border-b border-[#F1F1F1]'>
                    <div className='text-base font-bold'>
                        Attribution model: Linear
                    </div>
                    <div className='flex-1'></div>

                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="text-base text-left font-semibold px-3 py-4 border-b col-span-2">
                                Name
                            </th>
                            <th scope="col" className="text-base text-left font-semibold px-3 py-4 border-b">
                                Order
                            </th>
                            <th scope="col" className="text-base text-left font-semibold px-3 py-4 border-b">
                                Time
                            </th>
                            <th scope="col" className="text-base text-left font-semibold px-3 py-4 border-b">
                                Channel
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(6)].map((_, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="text-base font-medium px-3 py-4 border-b col-span-2 text-[#0F5AFF]">
                                    Karthikeyan Karthikeyan
                                </td>
                                <td className="text-base font-medium px-3 py-4 border-b text-[#4E5E5A]">
                                    ₹8,526.32
                                </td>
                                <td className="text-base font-medium px-3 py-4 border-b text-[#4E5E5A]">
                                    12:09 PM
                                </td>
                                <td className="text-base font-medium px-3 py-4 border-b text-[#4E5E5A]">
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
