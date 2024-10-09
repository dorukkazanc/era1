import Particles, {initParticlesEngine} from "@tsparticles/react";
import {memo, useEffect} from "react";
import {loadSlim} from "@tsparticles/slim";
import config from "../config";


// Component'i memo ile wrap ederek parent component re-render olduğunda tekrar
// renderlanmasını engelledim.
const ParticleComponent = memo(() => {

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        })
    }, []);

    return (
        <Particles options={config.PARTICLES_OPTIONS}/>
    )
}, (prev, next) => prev.value === next.value)

export default ParticleComponent;