import * as React from 'react'
import './Landing.css'
import landingImg from '../../assests/landingImg.png'
import { useDencrypt } from "use-dencrypt-effect";


const values = ["Together", "We", "Thrive"];

function Landing() {
    // use liquid swipe https://reactjsexample.com/a-smooth-component-transition-animation-with-react-liquid-swipe-effect/

    const { result, dencrypt } = useDencrypt();

    React.useEffect(() => {
        let i = 0;

        const action = setInterval(() => {
            dencrypt(values[i]);

            i = i === values.length - 1 ? 0 : i + 1;
        }, 2000);

        return () => clearInterval(action);
    }, []);

    return (
        <div class="landing_container flex">
            <img class="landing_img" src={landingImg} />
            <span class="landing_tagLine">Share your projects</span>
            <span class="landind_text">{result}</span>
        </div>
    )
}


export default Landing
