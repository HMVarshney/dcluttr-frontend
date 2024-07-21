"use client"

import React, { useEffect } from 'react'
import { notFound } from 'next/navigation';

export default function Page() {
    useEffect(() => {
        notFound()
    }, [])
    return (
        <></>
    )
}
