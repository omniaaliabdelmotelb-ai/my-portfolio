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
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for framing elements
    const frameGroup = new THREE.Group();

    // Outer Tech Ring 1 (Surrounding the Avatar Photo)
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.04, 32, 200);
    const ringMat1 = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        emissive: 0x00a8ff,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 4;
    frameGroup.add(ring1);

    // Outer Tech Ring 2 (Tilted Orbit)
    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.025, 24, 180);
    const ringMat2 = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        emissive: 0x4f46e5,
        roughness: 0.3,
        metalness: 0.7,
        wireframe: true
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    frameGroup.add(ring2);

    // Small Orbiting Glowing Satellites
    const orbGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const orbMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const orb1 = new THREE.Mesh(orbGeo, orbMat);
    orb1.position.set(2.4, 0, 0);
    frameGroup.add(orb1);

    const orb2 = new THREE.Mesh(orbGeo, new THREE.MeshBasicMaterial({ color: 0xff7b00 }));
    orb2.position.set(-2.4, 0, 0);
    frameGroup.add(orb2);

    scene.add(frameGroup);

    // Ambient Floating Particles
    const particlesCount = 200;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
        color: 0x00f2fe,
        size: 0.06,
        transparent: true,
        opacity: 0.85
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f2fe, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7c3aed, 2, 100);
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

        ring1.rotation.z += 0.008;
        ring2.rotation.z -= 0.006;

        frameGroup.rotation.x += (targetY * 0.3 - frameGroup.rotation.x) * 0.05;
        frameGroup.rotation.y += (targetX * 0.3 - frameGroup.rotation.y) * 0.05;

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
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for surrounding rings
    const group = new THREE.Group();

    // Surrounding Ring 1
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.03, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    // Surrounding Ring 2
    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.02, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x9b51e0, wireframe: true });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    scene.add(group);

    // Ambient Light
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    // Animation Loop
    function animateAbout() {
        requestAnimationFrame(animateAbout);

        ring1.rotation.z += 0.007;
        ring2.rotation.z -= 0.005;
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
