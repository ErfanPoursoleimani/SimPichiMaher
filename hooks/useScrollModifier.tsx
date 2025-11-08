import { useEffect } from 'react'

const useScrollModifier = (
    ref: React.RefObject<HTMLDivElement>, 
    inView: boolean, 
    config: {landingPosition: "start" | "end" | "center" | "nearest"} = {landingPosition: "start"}
) => {
    const { landingPosition } = config

    useEffect(() => {
        const element = ref.current
        if(!element || !inView) return
        
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: landingPosition
        })
    }, [inView, landingPosition, ref])
}

export default useScrollModifier