'use client';
import React from "react";
import {Canvas} from "@react-three/fiber";
import Model from "./Model";
import {Environment} from "@react-three/drei";

export default function Scene(props:any){
    return (
        <Canvas className={""} style={{background: "black", width: "100vw", height: "100vh"}}>
            <directionalLight intensity={3} position={[0,3,2]}/>
            <Environment preset={"city"}/>
            <Model {...props}/>
        </Canvas>
    )
}