import "../styles/_bubbleNav.scss";
import React, {useEffect} from "react";

export default function BubbleNav(){
    useEffect(() => {
        const navItems = document.querySelectorAll(".bubble-nav__item") as NodeListOf<HTMLElement>;
        const bubble = document.querySelector(".bubble-nav__bubble") as HTMLDivElement;

        navItems.forEach((item) => {
            item.addEventListener("mouseover", function(this:HTMLElement) {
                const itemWidth = this.offsetWidth;
                const itemLeft = this.offsetLeft;

                bubble.style.opacity = "100%";
                bubble.style.width = itemWidth + "px";
                bubble.style.left = itemLeft + "px";
                bubble.style.top = "0"
            });

            item.addEventListener("mouseleave", function(this:HTMLElement) {
                const itemLeft = this.offsetLeft;

                // bubble.style.transform = "0";
                bubble.style.top = "50%"
                bubble.style.width = "0";
                bubble.style.opacity = "0";
                bubble.style.left = itemLeft - 10 + "px";
            });
        });
    }, []);

    return (
        <nav className={"bubble-nav"}>
            <li className="bubble-nav__item">Item1</li>
            <li className="bubble-nav__item">LongItem2</li>
            <li className="bubble-nav__item">Item3</li>
            <li className="bubble-nav__item">Item4</li>

            <div className={"bubble-nav__bubble"}/>
        </nav>
    )
}