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
    const triggerHeights = {
        start: "top 85%",
        end: "center center"
    }
    const lastItemIndex = items.length - 1;

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("screen and (min-width: 1024px)", () => {
            // items offset
            items.forEach((item, index) => {
                const offset = index === lastItemIndex ? 12  : 35;
                gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current as HTMLElement,
                        scrub: 1.5,
                        // ...triggerHeights,
                        start: "top 75%",
                        end: "bottom 75%",
                        // markers: true
                    },
                }).fromTo(item, {yPercent: offset}, {yPercent: -1*offset});
            }); //end items loop

            //scale background
            gsap.from(".section__card", {
                scrollTrigger: {
                    trigger: containerRef.current as HTMLElement,
                    scrub: 1,
                    ...triggerHeights,
                    // markers: true
                },
                scale: 0.75,
            }); // end section__card bg animation

            // slide title spans
            spans.forEach((span, index) => {
                gsap.from(span, {
                    scrollTrigger: {
                        trigger: containerRef.current as HTMLElement,
                        scrub: 2,
                        ...triggerHeights,
                    },
                    x: 200 * (index % 2 === 0 ? 1 : -1),
                }); // end from span
            }); // end spans loop
        });

        mm.add("screen and (max-width: 1023px)", () => {
            // items offset
            items.forEach((item, index) => {
                const offset = index === lastItemIndex ? 12.5  : 50;
                gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current as HTMLElement,
                        scrub: 1.5,
                        start: "top center",
                        end: "bottom center",
                        // markers: true
                    }
                }).fromTo(item, {yPercent: 1 * offset}, {yPercent: -1 * offset});
            }); //end items loop
        });
    }, {scope: containerRef, dependencies: [items, spans]});


    return <main className={"w-full bg-gray-600 flex justify-center py-[90vh]"}>
        <div className={"absolute flex justify-center align-center text-xl text-white top-8"}>
            SCROLL DOWN
        </div>

        <section className={"section intro-scale"} ref={containerRef}>
            <span className={"slide-title slide-title--left slide-title--top slide-title--behind"} data-from={"left"}>
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