declare module '*.svg' {
    import React from 'react'
    import { SVGProps } from 'react'

    // For direct imports
    const content: string
    export default content

    // For component imports
    export const ReactComponent: React.FC<SVGProps<SVGSVGElement>>
}