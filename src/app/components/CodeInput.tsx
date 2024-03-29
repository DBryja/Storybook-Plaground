import React, {useRef,useEffect} from "react";
import classnames from "classnames";

interface CodeInputProps {
    buildList: (number|string)[];
}
const regullarExpression = /^[a-zA-Z0-9`~!@#$%^&*()-_=+[{\]}\\|;:'",<.>/? ]$/;
const inputClassName = classnames("text-white w-8 h-12 bg-[#292c2e] border-radius-2 text-center focus:outline-dashed focus:outline-2 focus:outline-offset-2 rounded-lg transition-all");

export default function CodeInput({buildList}: CodeInputProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    useEffect(() => {
        //set focus on the first input when the component is mounted
        if(inputRefs.current && inputRefs.current.length >0)
        inputRefs.current[0]?.focus();

        window.addEventListener("keydown", globalKeyDown);
        // @ts-ignore
        window.addEventListener("paste", handlePaste);

        return () => {
            window.removeEventListener("keydown", globalKeyDown);
        }
    }, []);

    const moveLeft = (currentIndex: number) => {
        if(currentIndex > 0 && inputRefs.current[currentIndex-1]) inputRefs.current[currentIndex-1]?.focus();
        else if(currentIndex <= 0) inputRefs.current[inputRefs.current?.length-1]?.focus();
    }
    const moveRight = (currentIndex: number) => {
        if(currentIndex < inputRefs.current.length && inputRefs.current[currentIndex+1]) inputRefs.current[currentIndex+1]?.focus();
        else if(currentIndex === inputRefs.current.length-1) inputRefs.current[0]?.focus();
    }

    //Listen to arrows keys to move the focus between inputs
    const globalKeyDown = (event: KeyboardEvent) => {
        const currentIndex = getCurrentInputIndex();
        switch(event.key) {
            case "ArrowLeft":
            case "ArrowDown":
                moveLeft(currentIndex);
                break;
            case "ArrowRight":
            case "ArrowUp":
                moveRight(currentIndex);
                break;
            default:
                break;
        }
    };
    // Move to the next input when the current input is filled
    const handleInputChange = (index:number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if(index > 0 && value === "") {
            moveLeft(index+1)
            return;
        }
        if (index === 0 && value === "") return;
        if(index !== inputRefs.current?.length-1) {
            moveRight(index);
            return;
        }
    }
    // Handle the backspace key when the input is empty to move the focus to the previous input
    const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "Backspace":
                if (inputRefs.current[index]?.value === "") moveLeft(index);
                break;
            case "ArrowLeft":
            case "ArrowDown":
            case "ArrowRight":
            case "ArrowUp":
                event.preventDefault();
                break;
            default:
                if(regullarExpression.test(event.key) && inputRefs.current[index]) {
                    event.preventDefault();
                //@ts-ignore
                    inputRefs.current[index].value = event.key;
                    if(index !== inputRefs.current?.length-1) moveRight(index);
                }
                break;
        }
    };
    // Get the index of the currently focused input
    const getCurrentInputIndex = () => {
        const focusedInput = document.activeElement as HTMLInputElement;
        if (focusedInput && inputRefs.current.includes(focusedInput)) {
            return inputRefs.current.findIndex(input => input === focusedInput);
        } else {
            // If no input is currently focused or it's not in the refs array, return the index of the first non-empty input
            for (let i = 0; i < inputRefs.current.length; i++) {
                if (inputRefs.current[i] && inputRefs.current[i]?.value === "") {
                    return i;
                }
            }
            // if no input is filled, return the index of the last input
            return inputRefs.current?.length-1;
        }
    }
    // Fill inputs on paste
    // I assumed that the pasted data is a string of characters with no separators, if there were any then split logic should be adjusted
    function handlePaste(this:Window, e: React.ClipboardEvent<HTMLInputElement>) {
        e.preventDefault();
        const paste = e.clipboardData.getData("text");
        const pasteArray = paste.split("");
        for (let i = 0; i < pasteArray.length; i++) {
            //@ts-ignore
            if (inputRefs.current[i]) inputRefs.current[i].value = pasteArray[i];
        }
    }

    let indexOfInput = 0;
    return (
        <section>
        <form className={"flex flex-row gap-x-4 items-center justify-center"}>
            {buildList.map((symbol, index) => {
                if (typeof symbol === "number") {
                    let inputsArray: JSX.Element[] = [];
                    for (let i = 0; i < symbol; i++)
                        {
                            inputsArray.push(
                                                        <input key={indexOfInput}
                                                               type={"text"}
                                                               className={inputClassName}
                                                               maxLength={1}
                                                               ref={el => {inputRefs.current.push(el)}}
                                                               onKeyDown={handleKeyDown(indexOfInput)}
                                                               onChange={handleInputChange(indexOfInput)}
                                                               required/>);
                            indexOfInput++;
                        }
                    return inputsArray.map((input) => input);
                } else return <span key={"span_"+index}>{symbol.toString()}</span>
            })}
        </form>
        <button className={"code-input__submit"}>Submit</button>
    </section>
    );}