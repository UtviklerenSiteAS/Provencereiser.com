"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { courses, teamMembers } from "./data";

const ImageCarousel = ({ images }: { images: string[] }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (images.length === 0 || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        let animationFrameId: number;
        const scrollSpeed = 0.5; // pixels per frame (adjust for faster/slower)

        const smoothScroll = () => {
            if (!container) return;

            // Increment scroll position
            container.scrollLeft += scrollSpeed;

            // Reset to start when reaching the end
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                container.scrollLeft = 0;
            }

            animationFrameId = requestAnimationFrame(smoothScroll);
        };

        animationFrameId = requestAnimationFrame(smoothScroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [images.length]);

    if (images.length === 0) return null;

    return (
        <div className="relative -mx-8 md:-mx-20">
            <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 px-8 md:px-20 py-4 snap-x snap-mandatory">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="flex-none w-80 snap-center group cursor-pointer"
                        >
                            <div className="relative h-96 bg-stone-100 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                <Image
                                    src={src}
                                    alt={`Gallery image ${index + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#fdfaf6] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#fdfaf6] to-transparent pointer-events-none" />
        </div>
    );
};

export default function HomeClient({ carouselImages }: { carouselImages: string[] }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 15,
                y: (e.clientY / window.innerHeight - 0.5) * 15,
            });
        };
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className="relative min-h-screen bg-[#fcfaf7] text-[#2c2520] selection:bg-amber-100">
            {/* Dynamic Navigation */}
            <nav className={`fixed top-0 inset-x-0 z-[130] transition-all duration-500 px-8 py-6 md:px-20 flex items-center justify-between ${(scrolled && !isMenuOpen) ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent"}`}>
                <div className={`flex flex-col transition-opacity duration-300 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-amber-900/60 leading-none mb-1">Sissa Aabel</span>
                    <div className="text-xl md:text-2xl font-serif tracking-tighter uppercase font-medium text-amber-950">Provencereiser</div>
                </div>

                <div className="hidden lg:flex items-center space-x-10 text-[9px] font-bold uppercase tracking-[0.2em] text-stone-600">
                    <a href="#about" className="group relative py-1 hover:text-amber-950 transition-colors">
                        Historien
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </a>
                    <a href="#courses" className="group relative py-1 hover:text-amber-950 transition-colors">
                        Tematurer
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </a>
                    <a href="#team" className="group relative py-1 hover:text-amber-950 transition-colors">
                        Sissa & Provencereiser
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </a>
                </div>

                <div className="flex items-center space-x-4">
                    <a href="mailto:sissa3@hotmail.com" className="hidden sm:block px-6 py-2.5 border border-amber-950/20 rounded-full text-[9px] font-bold uppercase tracking-widest text-amber-950 hover:bg-amber-950 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md">
                        Kontakt Oss
                    </a>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none z-[110]"
                        aria-label="Toggle Menu"
                    >
                        <span className={`w-6 h-0.5 bg-amber-950 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`w-6 h-0.5 bg-amber-950 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
                        <span className={`w-6 h-0.5 bg-amber-950 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[120] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-white/95 backdrop-blur-xl"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu Content */}
                <div className="relative h-full flex flex-col items-center justify-center space-y-8 text-center p-8">
                    <div className="flex flex-col mb-12">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-900/40 leading-none mb-2">Sissa Aabel</span>
                        <div className="text-3xl font-serif tracking-tighter uppercase font-medium text-amber-950">Provencereiser</div>
                    </div>

                    <div className="flex flex-col space-y-8 text-sm font-bold uppercase tracking-[0.3em] text-stone-600">
                        <a
                            href="#about"
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:text-amber-900 transition-colors"
                        >
                            Historien
                        </a>
                        <a
                            href="#courses"
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:text-amber-900 transition-colors"
                        >
                            Tematurer
                        </a>
                        <a
                            href="#team"
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:text-amber-900 transition-colors"
                        >
                            Sissa & Provencereiser
                        </a>
                    </div>

                    <div className="pt-12">
                        <a
                            href="mailto:sissa3@hotmail.com"
                            className="inline-block px-10 py-4 bg-amber-950 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-amber-900 transition-all"
                        >
                            Kontakt Oss
                        </a>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col md:items-center md:justify-center overflow-hidden pt-32 md:pt-0">
                {/* Layered Images Background - Aligned to the top on mobile, left on desktop */}
                <div className="relative md:absolute inset-0 z-0 pointer-events-none flex items-center justify-center md:items-center md:justify-start flex-none md:flex-1 h-[45vh] md:h-full">
                    <div className="relative w-full h-full md:w-[70vw] lg:w-[60vw] opacity-60 md:-translate-x-10 lg:-translate-x-20">
                        {/* Base Layer: Grape Vine */}
                        <div className="absolute inset-0">
                            <Image
                                src="/images/Grape_vine.png"
                                alt="Grape Vine"
                                fill
                                className="object-contain object-center md:object-left"
                                priority
                            />
                        </div>

                        {/* Layer 2: Butterflies (Sommer_fugler) - Parallax effect */}
                        <div
                            className="absolute inset-0 transition-transform duration-500 ease-out"
                            style={{
                                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
                            }}
                        >
                            <Image
                                src="/images/Sommer_fugler.png"
                                alt="Butterflies"
                                fill
                                className="object-contain object-center md:object-left"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Content Overlay - Bottom on mobile, Center/Right on desktop */}
                <div className="relative z-10 text-center lg:text-right lg:ml-auto lg:mr-20 px-6 max-w-4xl flex-none md:flex-1 flex flex-col justify-end md:justify-center pb-12 md:pb-0">
                    <div className="mb-8 md:mb-12">
                        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-amber-800/70 font-bold block mb-3 md:mb-6 drop-shadow-sm">
                            En opplevelse for sansene
                        </span>
                        <h1 className="text-[3.8rem] md:text-[4.5rem] lg:text-[6.5rem] xl:text-[5.5rem] font-serif tracking-tight text-amber-950 leading-[1.1] drop-shadow-sm">
                            Provencereiser <br />
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center lg:justify-end">
                        <a href="#courses" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/50 backdrop-blur-sm border border-amber-950/10 text-amber-950 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all shadow-sm text-center">
                            Se Tematurer
                        </a>
                        <a href="#about" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/50 backdrop-blur-sm border border-amber-950/10 text-amber-950 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all shadow-sm text-center">
                            Utforsk Oppholdet
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                    <div className="w-[1px] h-10 bg-amber-950" />
                </div>
            </section>

            {/* The Experience (Image Carousel) */}
            <section id="about" className="py-32 bg-[#fdfaf6] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 md:px-20">
                    <h2 className="text-5xl md:text-6xl font-serif text-amber-950 text-center mb-12">Historien</h2>
                    <div className="text-center max-w-3xl mx-auto font-serif text-xl md:text-2xl italic text-amber-950/80 leading-relaxed mb-12">
                        <p className="mb-4">Historien begynte ytterst i skjærgården på Sørlandet. Som ung satt jeg og så mot horisonten, og visste at det fantes mer der ute.</p>
                        <p className="mb-4">Den dagen jeg valgte å følge drømmen og reise, åpnet verden seg. Menneskemøter, landskap og øyeblikk festet seg – og slapp aldri taket.</p>
                        <p>Reiser er min livshistorie. Å gå etter drømmene mine er ikke et valg, men en måte å leve på.</p>
                    </div>
                    <ImageCarousel images={carouselImages} />
                </div>
            </section>

            {/* Themed Journeys Section */}
            <section id="courses" className="py-32 px-8 md:px-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-amber-800/60 text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Våre spesialiteter</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-amber-950 mb-6 leading-tight">Tematurer</h2>
                            <p className="text-lg text-stone-600 font-light leading-relaxed">
                                Vi har lagt våre tematurer til Provence – et landskap som inviterer deg inn. Langs vinrutene ligger landsbyene som perler på en snor, omgitt av vinmarker og sølvgrønne olivenlunder. Luften er varm og klar, lyset mykt og levende. Her går skuldrene ned av seg selv.<br /><br />

                                I Provence samles livet rundt matmarkedene. Lukten av solmodne tomater, nybakt brød og urter som fortsatt bærer varmen fra jorden. Råvarene er enkle, ekte og kortreiste – og det er nettopp her våre mat- og vinkurs hører hjemme. Smaker deles, vin skjenkes, samtaler får tid. Det handler ikke om oppskrifter, men om glede.<br /><br />

                                Like naturlig var det å gi rom for malekurs her. Lyset i Provence er berømt av en grunn. Det lokker frem fargene – og kreativiteten. Med staffeli og pensel i hånden, og dyktige malelærere ved vår side, får dagene flyte i takt med blikket og øyeblikket.<br /><br />

                                Dette er glade dager i Provence. Dager som setter seg i kroppen. Og som vekker lysten til å bli med.<br /><br />
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                        {courses.map((course, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-6 shadow-sm">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-amber-950/0 group-hover:bg-amber-950/5 transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    {course.date && (
                                        <span className="text-[10px] uppercase tracking-[0.4em] text-amber-800/60 font-bold block mb-1">
                                            {course.date}
                                        </span>
                                    )}
                                    <h3 className="text-xl md:text-2xl font-serif text-amber-950 group-hover:text-amber-900 transition-colors">
                                        {course.title}
                                    </h3>
                                    <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold block">
                                        {course.norwegian}
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <p className="text-xs text-stone-500 leading-relaxed font-light">
                                        {course.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sissa & Team Section */}
            <section id="team" className="py-32 px-8 md:px-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <span className="text-amber-800/60 text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Menneskene bak</span>
                    <div className="mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-serif text-amber-950 mb-8">Sissa & Provencereiser</h2>
                                <div className="space-y-6">
                                    <p className="text-lg text-stone-600 font-light leading-relaxed">
                                        Sissa er eier og drivkraften bak Provencereiser. I 2008 fanget hun en drøm – og lot den få form. Provence, med sine vinranker, olivenlunder og sitt særegne lys, ble stedet der drømmen slo rot. Slik ble Provencereiser til. Opplevelser skapt for å deles.<br /><br />

                                        I dag deler Sissa tiden sin mellom dette vakre landskapet i Sør-Frankrike og Sørlandet. Hun beveger seg helst langs veiene i Europa i sin lille, kvikke to-seter – og turen må gjerne ta minst en uke. For hun har ikke hastverk. Europa rommer for mye skjønnhet til å forseres. Det er i bevegelsen, i omveiene og pausene, at opplevelsene får sette seg.<br /><br />

                                        Rundt de lange matbordene i Provence inviterer Sissa til rause måltider, gode samtaler og historier som får leve. Favorittene kommer ofte fra havet – og hun deler dem gjerne med et glass burgunder. Drømmemiddagen kunne hun tenkt seg å dele med Michelle Obama, Farah Pahlavi eller Gro Harlem Brundtland. Sterke kvinner. Gode samtaler. Tid.<br /><br />

                                        Provencereiser er fortsatt en levende drøm. En invitasjon til å være til stede, sanse mer og reise langsommere. Og Sissa drømmer fremdeles. Kanskje sammen med deg.
                                    </p>
                                    <div className="pt-4">
                                        <a href="mailto:sissa3@hotmail.com" className="inline-block px-8 py-4 border border-amber-950/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-950 hover:text-white transition-all text-amber-950">
                                            Kontakt Sissa
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-[4/5] md:aspect-[3/4] bg-stone-50 overflow-hidden shadow-lg">
                                <Image
                                    src="/images/Sissa.png"
                                    alt="Sissa Aabel"
                                    fill
                                    className="object-cover object-center opacity-90 sepia-[.1]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 px-8 md:px-20 border-t border-stone-100 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
                    <div className="md:col-span-2">
                        <div className="text-2xl font-serif tracking-tighter uppercase font-medium text-amber-950 mb-8">Provencereiser</div>
                        <div className="flex space-x-8">
                            <a href="https://www.facebook.com/100033242962669/about/" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-amber-800 transition-colors">Facebook</a>
                            <a href="https://www.instagram.com/provencereiser/" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-amber-800 transition-colors">Instagram</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-950 mb-10">Hurtiglenker</h4>
                        <ul className="space-y-4 text-sm text-stone-500 font-light">
                            <li><a href="#about" className="hover:text-amber-800 transition-colors">Praktisk informasjon</a></li>
                            <li><a href="#team" className="hover:text-amber-800 transition-colors">Vårt team</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-950 mb-10">Kontakt</h4>
                        <div className="flex flex-col space-y-4">
                            <p className="text-xs text-stone-500 font-light leading-relaxed">
                                Ta kontakt direkte med Sissa for spørsmål eller booking:
                            </p>
                            <a href="mailto:sissa3@hotmail.com" className="text-sm font-serif italic text-amber-950 hover:text-amber-800 transition-colors underline decoration-amber-950/20 underline-offset-4">
                                sissa3@hotmail.com
                            </a>
                            <div className="pt-2">
                                <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Organisasjonsnr.</p>
                                <p className="text-[10px] text-stone-500 font-light">992 581 614</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] uppercase tracking-widest text-stone-300 font-medium">
                        &copy; 2026 Provencereiser &bull; Alle rettigheter reservert.
                    </p>
                    <div className="flex space-x-12 text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300">
                        <span>Nice</span>
                        <span>&bull;</span>
                        <span>Provence</span>
                        <span>&bull;</span>
                        <span>Oslo</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}
