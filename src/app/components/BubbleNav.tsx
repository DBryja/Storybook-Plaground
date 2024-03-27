import "../styles/_bubbleNav.scss";
import React, {useEffect} from "react";

export default function BubbleNav(){
    useEffect(() => {
        const navItems = document.querySelectorAll(".bubble-nav__item") as NodeListOf<HTMLElement>;
        const bubble = document.querySelector(".bubble-nav__bubble") as HTMLDivElement;

        navItems.forEach((item) => {
            item.addEventListener("mouseover", function (this: HTMLElement) {
                const itemWidth = this.offsetWidth;
                const itemLeft = this.offsetLeft;

                bubble.style.opacity = "100%";
                bubble.style.width = itemWidth + "px";
                bubble.style.left = itemLeft + "px";
                bubble.style.top = "0"
            });

            //DODAC TRANSFORMA NA MOUSEENTER NA OSIACH X I Y BEZ ANIMACJI

            item.addEventListener("mouseleave", function (this: HTMLElement, e: MouseEvent) {
                const rect = this.getBoundingClientRect();
                const rectCenterX = rect.left + rect.width / 2;
                const rectCenterY = rect.top + rect.height / 2;
                const multipliers = {top: 1, left: 1};
                if (e.clientX < rectCenterX) multipliers.left = -1;
                if (e.clientY < rectCenterY) multipliers.top = -1;
                const offsetDeltaX = (e.clientX - rect.left) * multipliers.left;
                const offsetDeltaY = rect.height* multipliers.top;

                bubble.style.width = "0";
                bubble.style.opacity = "0";
                bubble.style.top = this.offsetTop + offsetDeltaY + "px"
                bubble.style.left = this.offsetLeft + offsetDeltaX + "px";

                setTimeout(() => {
                    bubble.style.top = "0";
                }, 200)
            });
        });
    }, []);

    return (
        <nav className={"bubble-nav"}>
            <li className="bubble-nav__item" data-pos={"left"}>Item1</li>
            <li className="bubble-nav__item active" data-pos={"left"}>LongItem2</li>
            <li className="bubble-nav__item" data-pos={"right"}>Item3</li>
            <li className="bubble-nav__item" data-pos={"right"}>Super Long Item3</li>

            <div className={"bubble-nav__bubble"}/>
        </nav>
    )
}