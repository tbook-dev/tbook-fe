import React from "react";
import Done from "./Done.png";

export default ({ size = 'small'}) => {
    let w = 20
    if(size === 'large'){
        w = 64
    }
    return <img src={Done} width={`${w}px`} height={`${w}px`} />;
}
