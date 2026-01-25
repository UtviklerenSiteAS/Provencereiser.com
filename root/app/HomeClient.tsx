"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { courses, teamMembers } from "./data";

const ImageCarousel = ({ images }: { images: string[] }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    if (images.length === 0) return null;

    return (
        <div className="relative w-full h-full">
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === current ? "bg-white w-4" : "bg-white/40 hover:bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default function HomeClient({ carouselImages }: { carouselImages: string[] }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrolled, setScrolled] = useState(false);

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
            <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 px-8 py-6 md:px-20 flex items-center justify-between ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent"}`}>
                <div className="flex flex-col">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-amber-900/60 leading-none mb-1">Sissa Aabel</span>
                    <div className="text-xl md:text-2xl font-serif tracking-tighter uppercase font-medium text-amber-950">Provencereiser</div>
                </div>

                <div className="hidden lg:flex items-center space-x-10 text-[9px] font-bold uppercase tracking-[0.2em] text-stone-600">
                    <a href="#courses" className="hover:text-amber-800 transition-colors">Tematurer</a>
                    <a href="#about" className="hover:text-amber-800 transition-colors">Oppholdet</a>
                    <a href="#team" className="hover:text-amber-800 transition-colors">Sissa & Teamet</a>
                </div>

                <a href="mailto:sissa3@hotmail.com" className="px-5 py-2 border border-amber-950/20 rounded-full text-[9px] font-bold uppercase tracking-widest text-amber-950 hover:bg-amber-950 hover:text-white transition-all">
                    Kontakt Oss
                </a>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32">
                {/* Layered Images Background - Aligned to the left */}
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-start">
                    <div className="relative w-[100vw] h-[100vh] md:w-[70vw] lg:w-[60vw] opacity-60 -translate-x-10 md:-translate-x-20">
                        {/* Base Layer: Grape Vine */}
                        <div className="absolute inset-0">
                            <Image
                                src="/images/Grape_vine.png"
                                alt="Grape Vine"
                                fill
                                className="object-contain object-left"
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
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Content Overlay - Adjusted for left-aligned image balance */}
                <div className="relative z-10 text-center lg:text-right lg:ml-auto lg:mr-20 px-6 max-w-4xl h-full flex flex-col md:block">
                    <div className="flex-1 flex flex-col justify-center md:block">
                        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-amber-800/70 font-bold block mb-6 drop-shadow-sm">
                            En opplevelse for sansene
                        </span>
                        <h1 className="text-[3.5rem] md:text-[7rem] font-serif tracking-tight text-amber-950 leading-[1.1] mb-12 drop-shadow-sm">
                            Provencereiser <br />
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-end mt-auto md:mt-0 pb-12 md:pb-0">
                        <a href="#courses" className="w-full sm:w-auto px-10 py-5 bg-amber-950 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all shadow-lg text-center">
                            Se Tematurer
                        </a>
                        <a href="#about" className="w-full sm:w-auto px-10 py-5 bg-white/50 backdrop-blur-sm border border-amber-950/10 text-amber-950 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all shadow-sm text-center">
                            Utforsk Oppholdet
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                    <div className="w-[1px] h-10 bg-amber-950" />
                </div>
            </section>

            {/* Themed Journeys Section */}
            <section id="courses" className="py-32 px-8 md:px-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-amber-800/60 text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Våre spesialiteter</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-amber-950 mb-6 leading-tight">Tematurer</h2>
                            <p className="text-lg text-stone-600 font-light leading-relaxed">
                                Vi arrangerer mat- og vinkurs, malekurs, yogakurs, fotokurs og trøffeljakt i vakre Provence. Vi reiser i små grupper på 10 til 14 personer.
                            </p>
                        </div>
                        <a href="#" className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-950 border-b border-amber-950/30 pb-2 hover:border-amber-950 transition-all whitespace-nowrap">
                            Se alle programmer
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-x-16 lg:gap-y-20">
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
                                <span className="text-[9px] uppercase tracking-widest text-amber-800/50 font-bold mb-2 block">{course.norwegian}</span>
                                <h3 className="text-2xl font-serif text-amber-950 mb-3">{course.title}</h3>
                                <p className="text-sm text-stone-500 leading-relaxed font-light">{course.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Experience (Image Carousel) */}
            <section id="about" className="py-32 bg-[#fdfaf6] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 md:px-20">
                    <div className="relative aspect-[16/9] w-full bg-stone-100 shadow-2xl overflow-hidden group">
                        <ImageCarousel images={carouselImages} />
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
                                <h2 className="text-5xl md:text-6xl font-serif text-amber-950 mb-8">Sissa & Teamet</h2>
                                <div className="space-y-6">
                                    <p className="text-lg text-stone-600 font-light leading-relaxed">
                                        Sissa Aabel startet Provencereiser i 2008. Som globetrotter av natur og erfaring vet hun hva som skal til for at nye steder skal gi gjenklang i hjerte.
                                    </p>
                                    <div className="pt-4">
                                        <a href="mailto:sissa3@hotmail.com" className="inline-block px-8 py-4 border border-amber-950/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-950 hover:text-white transition-all text-amber-950">
                                            Kontakt Sissa
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-square md:aspect-[4/3] bg-stone-50 overflow-hidden shadow-lg">
                                <Image
                                    src="/images/Sissa.jpeg"
                                    alt="Sissa Aabel"
                                    fill
                                    className="object-cover object-center opacity-90 sepia-[.1]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-amber-950/10">
                        {teamMembers.map((person, i) => (
                            <div key={i} className="space-y-3">
                                <div className="w-10 h-[1px] bg-amber-950/30 mb-4" />
                                <h4 className="text-xl font-serif text-amber-950">{person.name}</h4>
                                <span className="text-[9px] uppercase tracking-widest text-amber-800/60 font-bold block">{person.role}</span>
                                <p className="text-sm text-stone-500 font-light leading-relaxed">
                                    {person.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 px-8 md:px-20 border-t border-stone-100 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
                    <div className="md:col-span-2">
                        <div className="text-2xl font-serif tracking-tighter uppercase font-medium text-amber-950 mb-8">Provencereiser</div>
                        <p className="max-w-sm text-stone-500 font-light text-sm leading-relaxed mb-10">
                            Startet i 2008 av Sissa Aabel, en globetrotter som vet hva som skal til for at nye steder skal gi gjenklang i hjerte og sinn.
                        </p>
                        <div className="flex space-x-8">
                            <a href="https://www.facebook.com/100033242962669/about/" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-amber-800 transition-colors">Facebook</a>
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
