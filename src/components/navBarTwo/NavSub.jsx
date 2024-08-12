import * as React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 12
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 9
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
export default function NavSub() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (

        <div className=' shadow-lg'>
            <Carousel responsive={responsive}>

                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>

            </Carousel>

        </div>
    )
}
