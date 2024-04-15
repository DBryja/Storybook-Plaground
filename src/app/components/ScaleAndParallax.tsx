import "../styles/_ScaleAndParallax.scss";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function ScaleAndParallax(){
    const containerRef = useRef<HTMLElement >(null);
    const items = document.querySelectorAll(".intro-scale__item") as NodeListOf<HTMLElement>;
    const spans = document.querySelectorAll(".slide-title") as NodeListOf<HTMLElement>;

    useGSAP(() => {
        items.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: containerRef.current as HTMLElement,
                    start: "top center",
                    end: "center center",
                    scrub: 2 + (index === 1 ? 1 : 2),
                },
                y: 200,
                scale: 0.8,
            })
        }); //end items loop

        gsap.from(".section__card", {
            scrollTrigger: {
                trigger: containerRef.current as HTMLElement,
                start: "top center",
                end: "center center",
                scrub: 2,
                // markers: true
            },
            scale: 0.75,
        }); // end section__card bg animation

        spans.forEach((span, index) => {
            gsap.from(span, {
                scrollTrigger: {
                    trigger: containerRef.current as HTMLElement,
                    start: "top center",
                    end: "center center",
                    scrub: 2,
                },
                x: 200 * (index % 2 === 0 ? 1 : -1),
            }); // end from span
        }); // end spans loop

    }, {scope: containerRef, dependencies: [items, spans]});


    return <main className={"h-[3000px] w-full bg-gray-600 flex justify-center pt-[500px]"}>

        <section className={"section intro-scale"} ref={containerRef}>
            <span className={"slide-title slide-title--left slide-title--top"} data-from={"left"}>
                LOREM
            </span>
            <div className={"section__card intro-scale__background"}>
                <div className={"intro-scale__item intro-scale__item--left"}/>
                <div className={"intro-scale__item intro-scale__item--right"}/>
                <div className={"intro-scale__item intro-scale__item--center"}/>
            </div>
            <span className={"slide-title slide-title--right slide-title--bottom"} data-from={"right"}>
                IPSUM
            </span>
        </section>

    </main>
}