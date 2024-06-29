import React, { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label'
import { LineChart } from 'lucide-react'

export default function Switcher() {
    return (
        <div className="flex items-center space-x-2 border rounded-xl py-2 px-4 bg-white">
            <Label htmlFor="line-chart">
                <LineChart className='w-5 h-5' />
            </Label>
            <Switch id="line-chart" />
        </div>
    )
}
