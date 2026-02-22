import { Info, Settings, Shield, Zap } from 'lucide-react'

interface MockAdProps {
    variant?: 'banner' | 'sidebar' | 'inline'
    className?: string
}

const ACCESSORY_ADS = [
    {
        title: "FORGED ALLOY WHEELS",
        highlight: "ULTRA LIGHTWEIGHT",
        description: "Enhance performance and aesthetics with our limited edition V-Series rims.",
        cta: "Shop Collection",
        icon: Settings,
        color: "text-blue-500"
    },
    {
        title: "CERAMIC COATING PRO",
        highlight: "9H HARDNESS",
        description: "Permanent mirror-finish shine and ultimate protection against the elements.",
        cta: "Book Detail",
        icon: Shield,
        color: "text-emerald-500"
    },
    {
        title: "PERFORMANCE EXHAUST",
        highlight: "TITANIUM SERIES",
        description: "Unlock up to 25HP extra and achieve that signature aggressive acoustic profile.",
        cta: "View Specs",
        icon: Zap,
        color: "text-amber-500"
    }
]

export default function MockAd({ variant = 'banner', className = '' }: MockAdProps) {
    const isBanner = variant === 'banner'
    const isSidebar = variant === 'sidebar'

    // Pick an ad based on length or just fixed for demo
    const ad = isBanner ? ACCESSORY_ADS[0] : isSidebar ? ACCESSORY_ADS[1] : ACCESSORY_ADS[2]

    return (
        <div className={`relative bg-white border border-slate-200 rounded-3xl overflow-hidden flex transition-all hover:border-amber-500 shadow-sm hover:shadow-xl group ${isBanner ? 'h-[140px] w-full flex-row items-center' : isSidebar ? 'h-[400px] w-full flex-col justify-center' : 'h-[250px] w-full flex-col justify-center'
            } ${className}`}>

            {/* Ad Label */}
            <div className="absolute top-3 left-4 z-20 flex items-center gap-1.5 px-2 py-1 bg-slate-900/5 backdrop-blur-sm text-[10px] font-black tracking-widest text-slate-500 rounded-lg uppercase">
                <span>Sponsored</span>
                <Info size={12} />
            </div>

            {/* Visual Icon (Only for Banner) */}
            {isBanner && (
                <div className="hidden md:flex ml-12 w-20 h-20 bg-slate-50 rounded-2xl items-center justify-center shrink-0">
                    <ad.icon size={40} className={ad.color} />
                </div>
            )}

            {/* Mock Content */}
            <div className={`px-8 ${isBanner ? 'text-left flex-1' : 'text-center'}`}>
                <div className="mb-2">
                    <span className={`${ad.color} font-black uppercase tracking-[0.2em] text-[10px]`}>{ad.highlight}</span>
                </div>
                <h4 className={`text-slate-900 font-black tracking-tighter leading-tight mb-2 ${isBanner ? 'text-2xl' : 'text-3xl'}`}>
                    {ad.title}
                </h4>
                <p className={`text-slate-500 font-medium max-w-lg ${isBanner ? 'line-clamp-1 text-sm' : 'mx-auto text-base mb-6'}`}>
                    {ad.description}
                </p>
                {isBanner ? (
                    <button className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 px-6 py-3 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-amber-500 transition-colors uppercase tracking-widest">
                        {ad.cta}
                    </button>
                ) : (
                    <button className="mt-4 px-8 py-4 bg-slate-900 text-white text-xs font-black rounded-2xl hover:bg-amber-500 transition-all uppercase tracking-widest shadow-lg hover:shadow-amber-500/20">
                        {ad.cta}
                    </button>
                )}
            </div>

            {/* Visual Decoration */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none group-hover:bg-amber-500/10 transition-all`} />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900/5 blur-[60px] rounded-full -ml-10 -mb-10 pointer-events-none" />
        </div>
    )
}
