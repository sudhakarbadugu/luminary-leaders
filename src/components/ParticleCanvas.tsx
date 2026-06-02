import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleCanvasProps {
  scrollY: React.MutableRefObject<number>;
  scrollSpeed: React.MutableRefObject<number>;
  scrollDirection: React.MutableRefObject<number>;
}

const IMAGE_PATHS = [
  '/images/ada-lovelace.jpg',
  '/images/alan-turing.jpg',
  '/images/grace-hopper.jpg',
  '/images/steve-jobs.jpg',
  '/images/bill-gates.jpg',
  '/images/elon-musk.jpg',
  '/images/tim-berners-lee.jpg',
  '/images/jeff-bezos.jpg',
  '/images/mark-zuckerberg.jpg',
  '/images/sam-altman.jpg',
  '/images/jensen-huang.jpg',
  '/images/about-mission.jpg',
];

const TINT_COLORS: [number, number, number][] = [
  [1, 0.8, 0.6],
  [1, 1, 0.9],
  [1, 0.95, 0.85],
  [0.9, 0.85, 0.75],
  [1, 0.9, 0.7],
];

const seededRandom = (seed: number) => {
  return ((seed * 9301 + 49297) % 233280) / 233280;
};

export default function ParticleCanvas({ scrollY }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.z = 1;

    const PARTICLE_COUNT = isMobile ? 300 : 625;
    const PARTICLES_PER_IMAGE = Math.floor(PARTICLE_COUNT / IMAGE_PATHS.length);
    const ACTUAL_COUNT = PARTICLES_PER_IMAGE * IMAGE_PATHS.length;

    const positions = new Float32Array(ACTUAL_COUNT * 3);
    const uvs = new Float32Array(ACTUAL_COUNT * 2);
    const sizes = new Float32Array(ACTUAL_COUNT);
    const speeds = new Float32Array(ACTUAL_COUNT);
    const colors = new Float32Array(ACTUAL_COUNT * 3);
    const timeOffsets = new Float32Array(ACTUAL_COUNT);
    const imageIndices = new Float32Array(ACTUAL_COUNT);
    const alphas = new Float32Array(ACTUAL_COUNT);
    const initialPositions = new Float32Array(ACTUAL_COUNT * 2);

    let idx = 0;
    for (let imgIdx = 0; imgIdx < IMAGE_PATHS.length; imgIdx++) {
      for (let p = 0; p < PARTICLES_PER_IMAGE; p++) {
        const seed = imgIdx * PARTICLES_PER_IMAGE + p;
        const rand1 = seededRandom(seed);
        const rand2 = seededRandom(seed + 1000);
        const rand3 = seededRandom(seed + 2000);
        const rand4 = seededRandom(seed + 3000);

        const x = (rand1 - 0.5) * 2.8;
        const y = (rand2 - 0.5) * 2.8;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = 0;
        initialPositions[idx * 2] = x;
        initialPositions[idx * 2 + 1] = y;
        uvs[idx * 2] = rand3;
        uvs[idx * 2 + 1] = rand4;
        sizes[idx] = 0.03 + rand1 * 0.04;
        speeds[idx] = 0.3 + rand2 * 0.5;

        const tint = TINT_COLORS[Math.floor(rand3 * TINT_COLORS.length)];
        colors[idx * 3] = tint[0];
        colors[idx * 3 + 1] = tint[1];
        colors[idx * 3 + 2] = tint[2];

        timeOffsets[idx] = rand4 * 20;
        imageIndices[idx] = imgIdx;
        alphas[idx] = 0.4 + rand1 * 0.4;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aInitialPosition', new THREE.BufferAttribute(initialPositions, 2));
    geometry.setAttribute('aUv', new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aTimeOffset', new THREE.BufferAttribute(timeOffsets, 1));
    geometry.setAttribute('aImageIndex', new THREE.BufferAttribute(imageIndices, 1));
    geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));

    const vertexShader = `
      attribute vec2 aInitialPosition;
      attribute float aSize;
      attribute float aSpeed;
      attribute vec3 aColor;
      attribute float aTimeOffset;
      attribute float aImageIndex;
      attribute float aAlpha;
      varying vec3 vColor;
      varying float vImageIndex;
      varying float vAlpha;
      uniform float uTime;
      uniform vec2 uRatio;
      uniform float uScrollY;
      uniform float uEnterProgress;

      void main() {
        vColor = aColor;
        vImageIndex = aImageIndex;
        vAlpha = aAlpha;
        float t = uTime * aSpeed * 0.4 + aTimeOffset;
        float cyclePos = mod(t, 200.0) / 200.0;
        float y = cyclePos * 2.4 - 1.2;
        float scrollOffset = uScrollY * 0.9 * 0.001;
        y -= scrollOffset;
        vec2 pos = vec2(aInitialPosition.x, y);
        float aspectRatio = uRatio.x;
        pos.x /= aspectRatio;
        pos *= uEnterProgress;
        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = aSize * uRatio.y * 120.0;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vImageIndex;
      varying float vAlpha;
      uniform sampler2D uTextures[12];

      void main() {
        int idx = int(vImageIndex);
        vec4 color;
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        if (dist > 0.5) discard;
        if (idx == 0) color = texture2D(uTextures[0], gl_PointCoord);
        else if (idx == 1) color = texture2D(uTextures[1], gl_PointCoord);
        else if (idx == 2) color = texture2D(uTextures[2], gl_PointCoord);
        else if (idx == 3) color = texture2D(uTextures[3], gl_PointCoord);
        else if (idx == 4) color = texture2D(uTextures[4], gl_PointCoord);
        else if (idx == 5) color = texture2D(uTextures[5], gl_PointCoord);
        else if (idx == 6) color = texture2D(uTextures[6], gl_PointCoord);
        else if (idx == 7) color = texture2D(uTextures[7], gl_PointCoord);
        else if (idx == 8) color = texture2D(uTextures[8], gl_PointCoord);
        else if (idx == 9) color = texture2D(uTextures[9], gl_PointCoord);
        else if (idx == 10) color = texture2D(uTextures[10], gl_PointCoord);
        else color = texture2D(uTextures[11], gl_PointCoord);
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        vec3 tinted = vColor * gray * 1.2;
        float alpha = 1.0 - smoothstep(0.35, 0.5, dist);
        alpha *= vAlpha;
        gl_FragColor = vec4(tinted, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uRatio: { value: new THREE.Vector2(window.innerWidth / window.innerHeight, Math.min(window.innerWidth, window.innerHeight)) },
        uScrollY: { value: 0 },
        uEnterProgress: { value: 0 },
        uTextures: { value: [] },
      },
      transparent: true,
      depthTest: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    let loadedCount = 0;
    let animationId: number | null = null;

    const onAllTexturesLoaded = () => {
      material.uniforms.uTextures.value = textures;

      const startTime = performance.now();
      let enterProgress = 0;

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const elapsed = (performance.now() - startTime) / 1000;
        material.uniforms.uTime.value = elapsed;
        material.uniforms.uScrollY.value = scrollY.current;

        if (enterProgress < 1) {
          enterProgress = Math.min(1, enterProgress + 0.008);
          material.uniforms.uEnterProgress.value = enterProgress;
        }

        renderer.render(scene, camera);
      };

      animate();
    };

    IMAGE_PATHS.forEach((path, i) => {
      loader.load(path, (texture: THREE.Texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        textures[i] = texture;
        loadedCount++;
        if (loadedCount === IMAGE_PATHS.length) {
          onAllTexturesLoaded();
        }
      });
    });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.uRatio.value = new THREE.Vector2(w / h, Math.min(w, h));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId !== null) cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [scrollY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
