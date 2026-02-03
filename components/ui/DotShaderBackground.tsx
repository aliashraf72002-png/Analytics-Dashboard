
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree, ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

// Fix: Augment the global JSX namespace to include Three.js intrinsic elements.
// This resolves the errors where 'mesh', 'planeGeometry', and 'shaderMaterial' are not recognized as valid JSX elements.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColor;

  varying vec2 vUv;

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    // Grid settings
    float rows = 40.0;
    vec2 grid = fract(st * rows);
    vec2 gridId = floor(st * rows);

    // Mouse interaction
    vec2 mouse = uMouse * vec2(uResolution.x / uResolution.y, 1.0);
    float dist = distance(gridId / rows, mouse);
    
    // Dot size based on mouse proximity
    float dotSize = 0.15 + (1.0 - smoothstep(0.0, 0.4, dist)) * 0.25;
    
    // Render circle
    float circle = 1.0 - step(dotSize, length(grid - 0.5));
    
    // Background color (white) and dot color (green)
    vec3 bgColor = vec3(1.0);
    vec3 finalColor = mix(bgColor, uColor, circle);

    gl_FragColor = vec4(finalColor, 0.35); // Semi-transparent for overlay
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ShaderPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uColor: { value: new THREE.Color('#22C55E') }
  }), [size]);

  useFrame((state) => {
    const { clock, mouse } = state;
    uniforms.uTime.value = clock.getElapsedTime();
    // Map mouse from (-1, 1) to (0, 1) and scale to resolution
    uniforms.uMouse.value.set((mouse.x + 1) / 2, (mouse.y + 1) / 2);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export const DotShaderBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1], fov: 90 }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
};
