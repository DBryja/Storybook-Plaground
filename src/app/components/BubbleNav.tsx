import "../styles/_bubbleNav.scss";
import React, {useEffect} from "react";
import Link from "next/link";
const returnSmaller = (a: number, b: number) => a < b ? a : b;

const createRipple = (e: MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    const circle = document.createElement("span");
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (rect.left + radius)}px`;
    circle.style.top = `${e.clientY - (rect.top + radius)}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    ripple?.remove();

    button.appendChild(circle);
}

export default function BubbleNav({menuItems, active} : {menuItems: {name: string, href?: string}[], active: number}){
    useEffect(() => {
        const navItems = document.querySelectorAll(".bubble-nav__item") as NodeListOf<HTMLElement>;
        const bubble = document.querySelector(".bubble-nav__bubble") as HTMLDivElement;
        let timeoutId: NodeJS.Timeout | undefined;

        navItems.forEach((item) => {
            item.addEventListener("mouseover", function (this: HTMLElement) {
                clearTimeout(timeoutId);
                const itemWidth = this.offsetWidth;
                const itemLeft = this.offsetLeft;
                const itemHeight = this.offsetHeight;

                bubble.style.opacity = "100%";
                bubble.style.width = itemWidth + "px"
                bubble.style.height= itemHeight + "px";
                bubble.style.left = itemLeft + "px";
                bubble.style.top = "0"
            });
            item.addEventListener("mouseleave", function (this: HTMLElement, e: MouseEvent) {
                const rect = this.getBoundingClientRect();
                const rectCenterX = rect.left + rect.width / 2;
                const rectCenterY = rect.top + rect.height / 2;
                const multipliers = {top: 1, left: 1};
                if (e.clientX < rectCenterX) multipliers.left = -1;
                if (e.clientY < rectCenterY) multipliers.top = -1;
                const offsetDeltaX = returnSmaller((e.clientX - rect.left) * multipliers.left, 50);
                const offsetDeltaY = returnSmaller(e.clientY - rect.height/2 * multipliers.top, 30*multipliers.top);

                bubble.style.width = "10px";
                bubble.style.height = "10px";
                bubble.style.opacity = "0";
                bubble.style.top = this.offsetTop + offsetDeltaY + "px"
                bubble.style.left = this.offsetLeft + offsetDeltaX + "px";

                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    bubble.style.top = "50%";
                    bubble.style.left = "50%"
                }, 300)
            });
            item.addEventListener("click", createRipple);
        });
    }, []);

    return (
        <nav className={"bubble-nav"}>
            {menuItems.map((item, index) =>
                    (<Link
                        key={index}
                        href={item.href || item.name}
                        className={`bubble-nav__item ${index === active ? "active" : "'"}`}
                    >{item.name}</Link>)
                )}
            <div className={"bubble-nav__bubble"}/>
        </nav>
    )
}