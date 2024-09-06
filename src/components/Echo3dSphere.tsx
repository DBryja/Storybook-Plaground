"use client"

import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"


interface SphereProps {
    color?: string;
    metalness?: number;
    roughness?: number;
    emissive?: string;
    emissiveIntensity?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
    transmission?: number;
}

const Sphere:React.FC<SphereProps> = ({
                                                color = '#FF4820',
                                                metalness = 1,
                                                roughness = 0.5,
                                                emissive = '#FF4820',
                                                emissiveIntensity = 0.5,
                                                clearcoat = 1,
                                                clearcoatRoughness = 0.1,
                                                transmission = 0.3,
                                            }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    // @ts-ignore
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
            clearcoat={clearcoat}
            clearcoatRoughness={clearcoatRoughness}
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
        img.src = '/echo-sphere-square.png';
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
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.001, 64, 64]} />
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
                />
            </mesh>
            {/*<TexturePreview texture={texture} />*/}
        </>
    );
}


export default function Echo3DSphere(props: SphereProps) {
  return (
      <div className="" style={{height: "550px", width: "100%", minWidth: "1000px", backgroundColor: "black"}}>
        <Canvas camera={{position: [0, 1, 3], fov: 42}}>
          <ambientLight intensity={0.5}/>
          <pointLight position={[10, 10, 10]} intensity={1}/>
        <spotLight
          position={[-10, -10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <Sphere  {...props}/>
        <SphereText/>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}