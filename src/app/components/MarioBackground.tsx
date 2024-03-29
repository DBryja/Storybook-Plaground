import "../styles/_marioBackground.scss";

export default function MarioBackground(){
    return (
        <section className={"mario-background"}>
            <div className={"star-container"}>
                <div className={"star-pattern star-container__pattern"}/>
                <div className={"star-gradient-overlay star-container__gradient-overlay"}/>
            </div>
            <div className={"stripe-container"}>
                <div className={"stripe-pattern stripe-container__pattern"}/>
            </div>
        </section>
    )
}