import {Box, Plane,} from "@react-three/drei";
import React, {useRef} from "react";
import {Canvas, useFrame} from "react-three-fiber";
import {Physics, useBox, usePlane} from "use-cannon";
import {OrbitControls, Stars, Text} from "drei";
import "./styles.css";

function PhyPlane({color, ...props}) {
    const [ref] = usePlane(() => ({...props}));

    return (
        <Plane args={[1000, 1000]} ref={ref}>
            <meshStandardMaterial color={color}/>
        </Plane>
    );
}

function Boxs() {
    const mesh = useRef()
    const [ref, api] = useBox(() => ({mass: 1, position: [0, 7, 0]}))
    useFrame(() => mesh.current.rotation.x = mesh.current.rotation.y += 0.01)
    return (
        <mesh onClick={() => {
            api.velocity.set(0, 9, 0)
        }} ref={mesh} position={[0, 4, 0]}>
            <boxBufferGeometry attach="geometry"/>
            <meshLambertMaterial attach={'material'} color={'#fafafa'}/>
        </mesh>
    )
}

function Spheres(props) {
    const [ref, api] = useBox(() => ({mass: 0.3, ...props}));

    return (
        <mesh
            args={[1, 1, 1]}
            ref={ref}
            onClick={() => api.applyImpulse([0, 9, -10], [0, 0, 0])}
        >
            <sphereGeometry attach={'geometry'}/>
            <meshStandardMaterial attach={'material'} color={'blue'}/>
        </mesh>)
}

function PhyBox(props) {
    const [ref, api] = useBox(() => ({args: [1, 1, 1], mass: 1, ...props}));

    return (
        <Box
            args={[1, 1, 1]}
            ref={ref}
            onClick={() => api.applyImpulse([0, 9, -10], [0, 0, 0])}
        >
            <meshStandardMaterial color={'green'}/>
        </Box>
    );
}


function App() {
    return (

        <Canvas>
            <OrbitControls/>
            <Stars/>
            <Physics gravity={[0, -26, 0]}>
                <PhyPlane
                    color="#fafafa"
                    position={[0, -2, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                />
                <Spheres position={[0, 7, 0]} rotation={[0, 0, 0]}/>
                <Text
                    color="black" // default
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    hello world!
                </Text>
                <Boxs/>
                <PhyPlane color="lightblue" position={[0, 0, -10]}/>
                <PhyBox position={[6, 0, -5]}/>
                <PhyBox position={[4, 0, -3]}/>
                <PhyBox position={[2, 0, -1]}/>
                <PhyBox position={[0, 0, 0]}/>
                <PhyBox position={[0, 0, -5]}/>
                <PhyBox position={[0, 1, -5]}/>
                <PhyBox position={[0, 2, -5]}/>
                <PhyBox position={[0, 3, -5]}/>
                <PhyBox position={[-2, 0, -1]}/>
                <PhyBox position={[-4, 0, -3]}/>
                <PhyBox position={[-6, 0, -5]}/>
            </Physics>
            <ambientLight intensity={0.3}/>
            <pointLight intensity={0.8} position={[10, 25, 10]}/>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>

        </Canvas>

    );
}

export default App;
