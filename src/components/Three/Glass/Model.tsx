import {useGLTF, Text, MeshTransmissionMaterial} from "@react-three/drei";
import React, {useRef} from "react";
import {useFrame, useThree, } from "@react-three/fiber";
import * as THREE from "three";

export default function Model(materialProps: typeof MeshTransmissionMaterial.defaultProps){
    const mesh = useRef<THREE.Mesh | null>(null);
    const {nodes} = useGLTF("/Three/Glass/torus.glb");
    const {viewport} = useThree();

    useFrame(()=>{
        if(mesh.current && mesh.current.rotation){
            mesh.current.rotation.x += 0.015;
            // mesh.current.rotation.y += 0.01;
            // mesh.current.rotation.z += 0.005;
        }
    });

    return (
        <group scale={1}>
            <Text
                position={[0,0,-0.5]}
                fontSize={1.2}
                fontWeight={900}
                font={"/fonts/Inter-Bold.woff"}
            >
                Hello World
            </Text>
            <mesh {...nodes.Torus} ref={mesh} scale={1.3}>
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </group>
    )
}