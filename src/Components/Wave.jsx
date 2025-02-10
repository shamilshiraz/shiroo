import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './Nav';

export default function WaveEffectDemo() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const mouse = new THREE.Vector2();
    let frame = 0;

    // Load the image as texture (pool2.jpg)
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load('/sand.jpg');
    backgroundTexture.minFilter = THREE.LinearFilter;
    backgroundTexture.magFilter = THREE.LinearFilter;
    backgroundTexture.generateMipmaps = false;
    backgroundTexture.wrapS = backgroundTexture.wrapT = THREE.RepeatWrapping;

    // Simulation material (wave simulation)
    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 0 },
        frame: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D textureA;
        uniform vec2 mouse;
        uniform vec2 resolution;
        uniform float time;
        uniform int frame;
        varying vec2 vUv;
    
        const float delta = 1.4;
    
        void main() {
          vec2 uv = vUv;
          if(frame == 0) {
            gl_FragColor = vec4(0.0);
            return;
          }
    
          vec4 data = texture2D(textureA, uv);
          float pressure = data.x;
          float pVel = data.y;
    
          vec2 texelSize = 2.0 / resolution;
          float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
          float p_left = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;
          float p_up = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
          float p_down = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;
    
          pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
          pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;
    
          pressure += delta * pVel;
          pVel *= 0.99;
          pressure *= 0.99;
    
          // Fluid ripple effect near the mouse
          vec2 mouseUV = mouse / resolution;
          if(mouse.x > 0.0) {
            // Fluid wave effect (adjusted to be smaller)
            float waveSize = 0.001;  // Decreased size for a smaller ripple
            float dist = length(uv - mouseUV);  // Get the distance from the mouse position
            
            // Smooth out the edges to create a more fluid effect
            float wave = smoothstep(waveSize, waveSize + 0.02, dist);  // Smooth transition
            
            // Apply the pressure increase in a fluid way
            pressure += 18.0 * (1.0 - wave);  // Use the inverse wave to concentrate the effect
          }
    
          gl_FragColor = vec4(pressure, pVel, (p_right - p_left) / 2.0, (p_up - p_down) / 2.0);
        }
      `
    });
    
    

    // Glass-like render material with background distortion
    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: backgroundTexture }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D textureA;
        uniform sampler2D textureB;
        varying vec2 vUv;
    
        void main() {
          vec4 data = texture2D(textureA, vUv);
          vec2 distortion = 0.2 * data.zw; // Using the wave data to distort the texture
    
          vec4 color = texture2D(textureB, vUv + distortion);
          color.rgb = mix(color.rgb, vec3(1.0), 0.1); // Increase the color saturation
    
          color.a = 1.0; // Full opacity to avoid the glass effect over darkening the image
    
          vec4 blurredColor = texture2D(textureB, vUv + distortion * 0.005); // Slight offset for blurring
    
          gl_FragColor = mix(color, blurredColor, 0.5); // Mix both textures for a glass-like effect
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const rtOptions = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter
    };

    let rtA = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtOptions);
    let rtB = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtOptions);

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMaterial);

    simScene.add(simQuad);
    scene.add(renderQuad);

    renderer.domElement.addEventListener('mousemove', (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = window.innerHeight - (e.clientY - rect.top);
    });

    function animate() {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;

      simMaterial.uniforms.textureA.value = rtA.texture;
      renderer.setRenderTarget(rtB);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtB.texture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      [rtA, rtB] = [rtB, rtA];

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* WebGL Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full "
        style={{ touchAction: 'none' }}
      />

      {/* Navigation */}
<Navbar/>

      {/* Center Content */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none text-"
        style={{ fontFamily: 'agr' }}
      >
        <div className="flex">Shamil Shiraz</div>
        <p className=" text-4xl sm:text-8xl font-bold flex">PORTFOLIO<ArrowUpRight size={48}/></p>

      </div>
    </div>
  );
}
