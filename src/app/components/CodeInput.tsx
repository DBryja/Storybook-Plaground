"use client"
import React, {useRef,useEffect} from "react";

interface CodeInputProps {
    buildList: (number|string)[];
}
// const regularExpression = /^[a-zA-Z0-9`~!@#$%^&*()-_=+[{\]}\\|;:'",<.>/? ]$/;
const isNumber = (char : string) => /^\d$/.test(char);

export default function CodeInput({buildList}: CodeInputProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    useEffect(() => {
        //set focus on the first input when the component is mounted
        if (inputRefs.current && inputRefs.current.length > 0)
            inputRefs.current[0]?.focus();

        window.addEventListener("keydown", globalKeyDown);
        window.addEventListener("paste", handlePaste);

        return () => {
            window.removeEventListener("keydown", globalKeyDown);
        }
    }, []);

    const moveLeft = (currentIndex: number) => {
        if (currentIndex > 0 && inputRefs.current[currentIndex - 1]) inputRefs.current[currentIndex - 1]?.focus();
        else if (currentIndex <= 0) inputRefs.current[inputRefs.current?.length - 1]?.focus();
    }
    const moveRight = (currentIndex: number) => {
        if (currentIndex < inputRefs.current.length && inputRefs.current[currentIndex + 1]) inputRefs.current[currentIndex + 1]?.focus();
        else if (currentIndex === inputRefs.current.length - 1) inputRefs.current[0]?.focus();
    }

    //Listen to arrows keys to move the focus between inputs
    const globalKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowLeft":
            case "ArrowDown":
                moveLeft(getCurrentInputIndex(1));
                break;
            case "ArrowRight":
            case "ArrowUp":
                moveRight(getCurrentInputIndex(-1));
                break;
            default:
                break;
        }
    };
    // Move to the next input when the current input is filled
    const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if (index > 0 && value === "") {
            moveLeft(index + 1)
            return;
        }
        if (index === 0 && value === "") return;
        if (index !== inputRefs.current?.length - 1) {
            moveRight(index);
            return;
        }
    }
    const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        // noinspection FallThroughInSwitchStatementJS
        switch (event.key) {
            // Handle the backspace key when the input is empty to move the focus to the previous input
            case "Backspace":
                if (inputRefs.current[index]?.value === "") moveLeft(index);
                break;
            // Handle the delete key when the input is empty to move the focus to the next input
            case "Delete":
                if (inputRefs.current[index]?.value === "") {
                    //@ts-ignore
                    inputRefs.current[index].value = ""
                    moveRight(index);
                }
                break;
            // Prevent the default behavior for the arrow keys (from moving the caret in inputs)
            case "ArrowLeft":
            case "ArrowDown":
            case "ArrowRight":
            case "ArrowUp":
                event.preventDefault();
                break;

            // In case you want to allow the user to type in letters this is required to allow the paste event to work
            case "v":
                //this fallthrough is intended to allow paste event
                if (event.ctrlKey || event.metaKey) {
                    break;
                }
            default:
                if (isNumber(event.key) && inputRefs.current[index]) {
                    event.preventDefault();
                    //@ts-ignore
                    inputRefs.current[index].value = event.key;
                    if (index !== inputRefs.current?.length - 1) moveRight(index);
                }
                event.preventDefault();
                break;
        }
    };

    const getFirstEmptyInputIndex = (addon: (-1 | 0 | 1) = 0) => {
        // If no input is currently focused, or it's not in the refs array, return the index of the first non-empty input
        for (let i = 0; i < inputRefs.current.length; i++) {
            if (inputRefs.current[i] && inputRefs.current[i]?.value === "") {
                return i + addon;
            }
        }
        // if no input is filled, return the index of the last input
        return inputRefs.current?.length - 1;
    }
    // Get the index of the currently focused input
    // If getCurrentInputIndex is called upon pressing an arrow key you should use addon +1 or -1 to get the correct index
    const getCurrentInputIndex = (addon: (-1 | 0 | 1) = 0) => {
        const focusedInput = document.activeElement as HTMLInputElement;
        if (focusedInput && inputRefs.current.includes(focusedInput)) {
            return inputRefs.current.findIndex(input => input === focusedInput);
        } else {
            return getFirstEmptyInputIndex(addon);
        }
    }
    // Fill inputs on paste
    // I assumed that the pasted data is a string of characters with no separators, if there were any then split logic should be adjusted
    function handlePaste(this: Window, e: ClipboardEvent): any {
        e.preventDefault();
        if (!e.clipboardData) return;
        const paste = e.clipboardData.getData("text");
        const pasteArray = paste.split("");
        for (let i = 0; i < pasteArray.length; i++) {
            //@ts-ignore
            if (inputRefs.current[i]) inputRefs.current[i].value = isNumber(pasteArray[i]) ? pasteArray[i] : "";
        }
        // set focus on the first empty input in case there was symbol different from a number in the pasted data
        inputRefs.current[getFirstEmptyInputIndex()]?.focus();
    }

    function handleInputMouseUp(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        const target = e.target as HTMLInputElement;
        const len = target.value.length;
        target.setSelectionRange(len, len);
    }

    function concatResult() {
        let resCode = "Result: ";
        let inputIndex = 0;
        for (let i = 0; i < buildList.length; i++) {
            // If the element is a number, push following input fields with each push increment the inputIndex
            if (typeof buildList[i] === "number") {
                const item = buildList[i] as number;
                for (let j = 0; j < item; j++) {
                    const field = inputRefs.current[inputIndex++];
                    if (field) resCode += field.value;
                }
            }
            // If the element is a string, push it as is
            if (typeof buildList[i] === "string") resCode += (buildList[i] as string);
        }
        return resCode;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(concatResult());
    }

    let indexOfInput = 0;
    return (
        <section className={"flex flex-col gap-y-8 justify-center items-center"}>
            <form className={"flex flex-row gap-x-4 items-center justify-center flex-wrap"} onSubmit={handleSubmit}>
                {buildList.map((symbol, index) => {
                    if (typeof symbol === "number") {
                        let inputsArray: React.ReactElement[] = [];
                        for (let i = 0; i < symbol; i++) {
                            inputsArray.push(
                                <input key={indexOfInput}
                                       type={"text"}
                                       className={"text-white w-8 h-12 bg-[#292c2e] border-radius-2 border border-white text-center focus:outline-dashed focus:outline-2 focus:outline-offset-2 rounded-lg transition-all mb-2"}
                                       maxLength={1}
                                       ref={el => {
                                           inputRefs.current.push(el)
                                       }}
                                       onKeyDown={handleKeyDown(indexOfInput)}
                                       onChange={handleInputChange(indexOfInput)}
                                       onMouseUp={handleInputMouseUp}
                                       required/>);
                            indexOfInput++;
                        }
                        return inputsArray.map((input) => input);
                    } else return <span key={"span_" + index}
                                        className={"max-lg:grow-1 max-lg:w-full max-lg:text-center"}>{symbol.toString()}</span>
                })}
                <div className={"basis-full h-8"}/>
                <input
                    className={"px-12 py-2 border rounded-[50px] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer"}
                    value={"Submit"}
                    type={"submit"}>
                </input>
            </form>
            <button
                className={"relative after:block after:absolute after:w-1/2 after:top-[120%] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:ease-in-out"}><a href={"https://github.com/DBryja/Storybook-Plaground/blob/master/src/app/components/CodeInput.tsx"}>Code by Dawid Bryja</a></button>
    </section>
    );
}
