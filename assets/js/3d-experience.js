// Three.js Interactive 3D visuals for Omnia Ali Abdelmotleb Portfolio

document.addEventListener('DOMContentLoaded', () => {
    initHero3D();
    initAbout3D();
});

function initHero3D() {
    const container = document.getElementById('hero-3d-container');
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Torus Knot Object (Central Tech Symbol)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        emissive: 0x0052d4,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Inner Glowing Core Sphere
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 2);
    const coreMat = new THREE.MeshPhongMaterial({
        color: 0x4facfe,
        emissive: 0x00f2fe,
        wireframe: false,
        transparent: true,
        opacity: 0.75,
        flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Outer Floating Particles
    const particlesCount = 350;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 12;
        positions[i + 1] = (Math.random() - 0.5) * 12;
        positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
        color: 0x00f2fe,
        size: 0.05,
        transparent: true,
        opacity: 0.8
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f2fe, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9b51e0, 2, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowHalfX) * 0.001;
        mouseY = (e.clientY - windowHalfY) * 0.001;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        torusKnot.rotation.x += 0.006;
        torusKnot.rotation.y += 0.008;
        torusKnot.rotation.x += targetY * 0.5;
        torusKnot.rotation.y += targetX * 0.5;

        coreMesh.rotation.y -= 0.01;
        coreMesh.rotation.x -= 0.005;

        particleSystem.rotation.y += 0.002;

        renderer.render(scene, camera);
    }
    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function initAbout3D() {
    const container = document.getElementById('about-3d-container');
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Futuristic Hologram Orb & Ring
    const group = new THREE.Group();

    // Octahedron Core
    const octaGeo = new THREE.OctahedronGeometry(1.3, 0);
    const octaMat = new THREE.MeshStandardMaterial({
        color: 0x4facfe,
        wireframe: true,
        emissive: 0x00f2fe,
        metalness: 0.9,
        roughness: 0.1
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    group.add(octaMesh);

    // Surrounding Ring 1
    const ringGeo1 = new THREE.TorusGeometry(2.0, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    // Surrounding Ring 2
    const ringGeo2 = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x9b51e0, wireframe: true });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    scene.add(group);

    // Ambient & Directional Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0x00f2fe, 1.5);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    // Animation Loop
    function animateAbout() {
        requestAnimationFrame(animateAbout);

        octaMesh.rotation.y += 0.01;
        octaMesh.rotation.x += 0.005;

        ring1.rotation.z += 0.008;
        ring2.rotation.z -= 0.006;

        group.rotation.y += 0.003;

        renderer.render(scene, camera);
    }
    animateAbout();

    // Handle Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
