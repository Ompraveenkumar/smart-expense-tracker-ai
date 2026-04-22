import React from 'react'
import styled, { keyframes } from 'styled-components'

function Orb() {

    const moveOrb = keyframes`
        0% { transform: translate(0, 0); }
        50% { transform: translate(70vw, 50vh); } /* Moves across 70% of screen width */
        100% { transform: translate(0, 0); }
    `


    const OrbStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -35vh;
        margin-top: -35vh;
        /* The Crystal Gradient Colors */
        background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        filter: blur(400px); /* Creates the soft animated glow */
        animation: ${moveOrb} 15s alternate linear infinite;
        z-index: -1; /* Keeps it behind your app */
    `;

    return <OrbStyled />
}

export default Orb