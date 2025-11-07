import { useEffect } from 'react'

const useScrollModifier = (ref: React.RefObject<HTMLDivElement>, inView: boolean, config: {landingPosition: "start" | "end" | "center" | "nearest"} = {landingPosition: "start"}) => {

    useEffect(() => {
        const element = ref.current
        if(!element)
            return
        const scrollToSection = () => {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: config.landingPosition
            });
        }
        inView === true ? scrollToSection() : null
    }, [inView])
}

export default useScrollModifier
