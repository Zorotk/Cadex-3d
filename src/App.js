import React,{useRef} from "react";
import {Canvas,useFrame} from "react-three-fiber";
import {OrbitControls, Stars} from "drei";
import {Physics, usePlane, useBox} from "use-cannon";
import "./styles.css";


function Box() {
  const mesh=useRef()
  useFrame(()=>mesh.current.rotation.x=mesh.current.rotation.y+=0.01)
    return (
        <mesh ref={mesh}  position={[0, 2, 0]}>
            <boxBufferGeometry attach="geometry"/>
            <meshLambertMaterial attach={'material'} color={'#fafafa'}/>
        </mesh>
    )
}

function Plane() {

    const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  const [refs,api] = useBox(() => ({mass: 1, position: [0, 10, 0]}))
    return (
        <mesh onClick={()=>{api.velocity.set(0,9,0)}} ref={refs} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]}/>
            <meshLambertMaterial attach={'material'} color={'green'}/>
        </mesh>
    )
}

const App = () => {
    return (
        <Canvas>
            <OrbitControls/>
            <Stars/>
            <ambientLight intensity={0.3}/>
            <spotLight position={[10, 15, 10]} angle={0.3}/>
            <Physics>
                <Box/>
                {/*<Plane/>*/}
            </Physics>
        </Canvas>
    );
};

export default App;
