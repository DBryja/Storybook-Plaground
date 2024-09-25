"use client"

import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import {Environment, OrbitControls} from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"
import { FlakesTexture } from 'three/addons/textures/FlakesTexture.js';


interface SphereProps {
    color?: string;
    metalness?: number;
    roughness?: number;
    emissive?: string;
    emissiveIntensity?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
    transmission?: number;
    env: "apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse";
}

const Sphere:React.FC<SphereProps> = ({ color, metalness, roughness, emissive, emissiveIntensity, clearcoat, clearcoatRoughness, transmission }:SphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

    const normalMap = useMemo(() => {
        const loader = new THREE.TextureLoader();

        const texture = new THREE.CanvasTexture(new FlakesTexture());
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = 10;
        texture.repeat.y = 6;
        texture.anisotropy = 16;
        return texture;
    }, []);

    const normalScale = new THREE.Vector2(0.15,0.15);


  useFrame(({ clock }) => {
    // @ts-ignore
    meshRef.current.rotation.y = clock.getElapsedTime() * (-0.1)
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
            clearcoat={clearcoat}
            clearcoatRoughness={clearcoatRoughness}
            metalness={metalness}
            roughness={roughness}
            color={color}
            normalMap={normalMap}
            normalScale={normalScale}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
            transmission={transmission}
        />
    </mesh>
  )
}
// @ts-ignore
function TexturePreview({ texture }) {
    return (
        <mesh position={[0, 0, -2]}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}

function SphereText() {
    const meshRef = useRef<THREE.Mesh>(null);

    const [texture, alphaMap] = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 4096;
        canvas.height = 4096;
        const context = canvas.getContext("2d")!;

        const alphaCanvas = document.createElement("canvas");
        alphaCanvas.width = canvas.width;
        alphaCanvas.height = canvas.height;
        const alphaContext = alphaCanvas.getContext("2d")!;

        const img = new Image();
        img.src = '/EchoSphere/echo-sphere-square.png';
        const canvasTexture = new THREE.CanvasTexture(canvas);
        const alphaCanvasTexture = new THREE.CanvasTexture(alphaCanvas);

        img.onload = () => {
            const aspectRatio = img.width / img.height;

            // Adjust canvas size to match the image aspect ratio
            canvas.width = 4096; // You can set this to any value
            canvas.height = canvas.width / aspectRatio;

            alphaCanvas.width = canvas.width;
            alphaCanvas.height = canvas.height;

            context.fillStyle = "black"; // Background color
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            alphaContext.drawImage(img, 0, 0, alphaCanvas.width, alphaCanvas.height);

            canvasTexture.needsUpdate = true;
            alphaCanvasTexture.needsUpdate = true;
        };


        return [canvasTexture, alphaCanvasTexture];
    }, []);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.05, 64, 64]} />
                <meshPhysicalMaterial
                    color="white"
                    metalness={1}
                    roughness={0}
                    emissive="white"
                    emissiveIntensity={1}
                    map={texture}
                    alphaMap={alphaMap}
                    transparent={true}
                    clearcoat={1}
                    clearcoatRoughness={1}
                    transmission={1}
                    rotation={[0, 0.1, 0]}
                />
            </mesh>
            {/*<TexturePreview texture={texture} />*/}
        </>
    );
}

export default function Echo3DSphere(props: SphereProps) {
  return (
      <div className="" style={{height: "550px", width: "100%", minWidth: "1000px", backgroundColor: "white"}}>
        <Canvas
            camera={{position: [0, 1, 3], fov: 50}}
            gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.25 }}
        >
        <ambientLight intensity={1}/>
        <pointLight position={[10, 10, 10]} intensity={1}/>
        <spotLight
          position={[-10, -10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />

        <Environment preset={props.env} background />

        <Sphere  {...props}/>
        <SphereText />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}