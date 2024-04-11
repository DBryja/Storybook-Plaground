"use client";
import "../styles/_logoNav.scss";
import React, {ReactNode, useState, useEffect} from 'react';
import gsap from "gsap";
import Link from 'next/link';

export default function LogoNav(){
    const [active, setActive] = useState(false);
    useEffect( ()=> {
        const ul = document.querySelector(".logo-nav__items") as HTMLElement;
        const navItems = document.querySelectorAll(".logo-nav__item") as NodeListOf<HTMLElement>;
        const pointer = document.querySelector(".logo-nav__pointer") as HTMLDivElement;
        const pointerHeight = pointer.clientHeight;

        navItems.forEach((item) => {
            item.addEventListener("click", function (this: HTMLElement){
                const itemTop = this.offsetTop;
                const itemHeight = this.clientHeight;

                pointer.style.top = `${itemTop + itemHeight / 2 - pointerHeight / 2 + ul.offsetTop}px`;
            });
        });
    }, [])

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.target as HTMLButtonElement;
        if(!btn.disabled){
            document.querySelector(".logo-nav__items")?.classList.toggle("active");
            btn.disabled = true;
            setActive(false);
            setTimeout(() => {
                btn.disabled = false;
                setActive(true);
            }, 350);
        }
    }

    useEffect(() => {
        const t = gsap.fromTo(".logo-nav__item", {opacity: 0, y: -8}, {
            duration: 0.1,
            opacity: 1,
            y:0,
            stagger: 0.05,
        })
        if(active){
            t.progress(0.3);
            t.play();
        }
        else{
            t.progress(1);
            gsap.to(".logo-nav__item", {opacity: 0, duration: 0});
        }
        return () => {
            t.kill();
        }
    }, [active]);


    return (
        <nav className="logo-nav">
            <button className={"logo-nav__logo"} onClick={handleButtonClick} disabled={false}>
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70ZM44.9375 29.5312C45.25 28.7812 45.4062 28.0625 45.4062 27.375C45.4062 24.9375 44.2188 23.1562 41.8438 22.0312C40.375 21.3438 38.625 21 36.5938 21H23V22.2188H26.75V47.9062H23V49.125H36.875C40.9375 49.125 43.9062 47.8594 45.7812 45.3281C46.75 43.9844 47.2344 42.5156 47.2344 40.9219C47.2344 38.2344 46 36.2344 43.5312 34.9219C42.5312 34.3906 41.4062 34.0156 40.1562 33.7969C42.5312 32.9531 44.125 31.5312 44.9375 29.5312ZM31.25 22.2188H35.1406C38.3906 22.2188 40.2031 23.6875 40.5781 26.625C40.6406 27 40.6719 27.375 40.6719 27.75C40.6719 29.9062 39.8438 31.4688 38.1875 32.4375C37.3125 32.9688 36.2969 33.2344 35.1406 33.2344H31.25V22.2188ZM31.25 34.5H36.125C38.9062 34.5 40.7656 35.7031 41.7031 38.1094C42.0469 38.9844 42.2188 39.9219 42.2188 40.9219C42.2188 43.4844 41.3906 45.4219 39.7344 46.7344C38.7344 47.5156 37.5469 47.9062 36.1719 47.9062H31.25V34.5Z"
                          fill="black"/>
                </svg>
            </button>
            <ul className={'logo-nav__items'}>
                <MenuItem>  {/*rect*/}
                    <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2.5" y="3" width="35" height="35" rx="5" stroke="black" strokeWidth="5"/>
                    </svg>
                </MenuItem>
                <MenuItem> {/*line*/}
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 37L37 3" stroke="black" strokeWidth="5" strokeLinecap="round"/>
                    </svg>
                </MenuItem>
                <MenuItem> {/*circle*/}
                    <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20.5" r="17.5" stroke="black" strokeWidth="5"/>
                    </svg>
                </MenuItem>
                <MenuItem> {/*triangle*/}
                    <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 3L37.3205 33H2.67949L20 3Z" stroke="black" strokeWidth="5"
                              strokeLinejoin="round"/>
                    </svg>
                </MenuItem>
                <MenuItem> {/*star*/}
                    <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22 3L26.4903 16.8197H41.0211L29.2654 25.3607L33.7557 39.1803L22 30.6393L10.2443 39.1803L14.7346 25.3607L2.97887 16.8197H17.5097L22 3Z"
                            stroke="black" strokeWidth="5" strokeLinejoin="round"/>
                    </svg>
                </MenuItem>
            </ul>
             <div className={"logo-nav__pointer"}>
                <svg width="13" height="64" viewBox="0 0 13 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M13 0V64C13 52.1978 8.76456 46.9314 5.12879 42.4106C2.39486 39.0112 0 36.0334 0 31.0154C0 25.8909 2.4975 22.9887 5.30314 19.7285C8.89854 15.5505 13 10.7845 13 0Z"
                          fill="#000"/>
                </svg>
            </div>
        </nav>
    )
}

const MenuItem = ({children, link = "/"}: { children: (ReactNode | string), link?: (string | URL) }) => {
    return <li className={"logo-nav__item"}>
        <Link href={link} className={"flex justify-center align-center"}>{children}</Link>
    </li>
}