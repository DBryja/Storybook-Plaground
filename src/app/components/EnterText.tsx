import Graphemer from "graphemer"; // lib to safely split text with emojis
import {motion} from "framer-motion"
import React from "react";

export default function EnterText(){
    return <>
    <AnimatedText text={"Hello World 👋"}/>
        <br/>
        <br/>
    <AnimatedText text={"Miło mi was widzieć"}/>
    </>
}

type AnimatedTextProps = {
    text: string;
    el?: React.ElementType
    className?: string;
}

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: "50%",
        rotate: "15deg",
    },
    visible: {
        opacity: 2,
        y: "0%",
        rotate: "0deg",
    }
}

export const AnimatedText = ({text, el: Wrapper ="p", className} : AnimatedTextProps) => {
    const splitter = new Graphemer();
    const splitText = splitter.splitGraphemes(text).map((char) => char === " " ? "\xa0" : char);

    return <Wrapper className={className}>
        <span className={"sr-only"}>{text}</span>
        <motion.span aria-hidden initial={"hidden"} animate={"visible"} transition={{staggerChildren: 0.01}} className={"block overflow-hidden"}>
            {splitText.map((char, index) => {
                return <motion.span className="inline-block text-7xl" key={index} variants={defaultAnimations}>
                    {char}</motion.span>
                }
            )}
        </motion.span>
    </Wrapper>
}