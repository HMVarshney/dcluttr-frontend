

import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'

export default function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}) {
    const ref = useRef(null)

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={cn("min-w-4 h-4 accent-primary hover:accent-primary/80 rounded", className + ' cursor-pointer')}
            {...rest}
        />
    )
}
