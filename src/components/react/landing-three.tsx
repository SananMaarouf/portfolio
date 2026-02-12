import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LandingThree() {
	const mountRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = mountRef.current;
		if (!container) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const playedKey = 'landing:hyperspacePlayed';
		let shouldPlayEntry = true;
		 try {
		 	shouldPlayEntry = sessionStorage.getItem(playedKey) !== '1';
		 } catch {
		 	// Ignore storage errors (privacy mode, etc.) and just play entry.
		 	shouldPlayEntry = true;
		 }
		const markPlayed = () => {
			 try {
			 	sessionStorage.setItem(playedKey, '1');
			 } catch {
				// Ignore storage errors (privacy mode, etc.)

			}
		};

		let landingIsReady = false;
		let didMarkReady = false;
		const markReady = () => {
			if (didMarkReady) return;
			if (document.documentElement.dataset.landingGate === 'true') {
				document.documentElement.dataset.landingReady = 'true';
			}
			landingIsReady = true;
			didMarkReady = true;
		};

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
		camera.position.z = 6;

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			powerPreference: 'high-performance',
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		renderer.setClearAlpha(0);

		container.appendChild(renderer.domElement);
		container.style.overflow = 'hidden';
		renderer.domElement.style.display = 'block';
		renderer.domElement.style.width = '100%';
		renderer.domElement.style.height = '100%';

		const getUiColor = () => {
			// Hardcode colors based on theme
			const isDark = document.documentElement.classList.contains('dark');
			return isDark ? '#FFFFFF' : '#000000';
		};
		const getBgColor = () => {
			const isDark = document.documentElement.classList.contains('dark');
			return isDark ? '#454545' : '#EDEDED';
		};

		// Space/starfield
		scene.fog = new THREE.Fog(getBgColor(), 8, 28);

		type Breakpoint = 'sm' | 'md' | 'lg';
		const getBreakpoint = (width: number): Breakpoint => {
			// Tailwind-ish breakpoints
			if (width < 640) return 'sm';
			if (width < 1024) return 'md';
			return 'lg';
		};

		type SceneConfig = {
			breakpoint: Breakpoint;
			starsCount: number;
			dustCount: number;
			spread: number;
			starsSize: number;
			dustSize: number;
			cameraZ: number;
			fov: number;
			pixelRatioCap: number;
			fogNear: number;
			fogFar: number;
		};

		const getConfig = (width: number, height: number): SceneConfig => {
			const bp = getBreakpoint(width);
			const minSide = Math.max(1, Math.min(width, height));

			if (bp === 'sm') {
				return {
					breakpoint: bp,
					starsCount: 700,
					dustCount: 160,
					spread: 26,
					starsSize: Math.max(0.028, minSide / 22000),
					dustSize: Math.max(0.07, minSide / 9000),
					cameraZ: 7.2,
					fov: 55,
					pixelRatioCap: 1.6,
					fogNear: 7,
					fogFar: 20,
				};
			}

			if (bp === 'md') {
				return {
					breakpoint: bp,
					starsCount: 1100,
					dustCount: 220,
					spread: 32,
					starsSize: Math.max(0.03, minSide / 26000),
					dustSize: Math.max(0.075, minSide / 10000),
					cameraZ: 6.6,
					fov: 50,
					pixelRatioCap: 1.9,
					fogNear: 7,
					fogFar: 24,
				};
			}

			return {
				breakpoint: bp,
				starsCount: 1400,
				dustCount: 260,
				spread: 38,
				starsSize: Math.max(0.03, minSide / 30000),
				dustSize: Math.max(0.08, minSide / 12000),
				cameraZ: 6,
				fov: 45,
				pixelRatioCap: 2,
				fogNear: 8,
				fogFar: 28,
			};
		};

		type StarField = {
			geometry: THREE.BufferGeometry;
			positions: Float32Array;
			startPositions: Float32Array;
			targetPositions: Float32Array;
		};

		const makeStars = (count: number, spread: number): StarField => {
			const positions = new Float32Array(count * 3);
			const startPositions = new Float32Array(count * 3);
			const targetPositions = new Float32Array(count * 3);
			const jitter = Math.min(0.18, spread * 0.004);

			for (let i = 0; i < count; i++) {
				const i3 = i * 3;

				// Start tightly at the center with tiny jitter (big bang).
				startPositions[i3 + 0] = (Math.random() - 0.5) * jitter;
				startPositions[i3 + 1] = (Math.random() - 0.5) * jitter;
				startPositions[i3 + 2] = (Math.random() - 0.5) * jitter;

				// Target spread through space.
				// Keep Z in front of the camera (negative) so the effect reads as "flying into" a starfield.
				targetPositions[i3 + 0] = (Math.random() - 0.5) * spread;
				targetPositions[i3 + 1] = (Math.random() - 0.5) * spread;
				targetPositions[i3 + 2] = -(Math.random() * spread);

				// Points render in their final positions; streaks handle the entry motion.
				positions[i3 + 0] = targetPositions[i3 + 0];
				positions[i3 + 1] = targetPositions[i3 + 1];
				positions[i3 + 2] = targetPositions[i3 + 2];
			}

			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			return { geometry, positions, startPositions, targetPositions };
		};

		let lastTimeMs = 0;
		const entryDelayMs = 4000;
		const entryDurationMs = 4100;
		let entryStartMs: number | null = null;

		const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
		const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
		const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
		const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
		const remap01 = (x: number, a: number, b: number) => clamp01((x - a) / (b - a));

		type StreakField = {
			geometry: THREE.BufferGeometry;
			positions: Float32Array;
		};
		const makeStreaks = (stars: StarField): StreakField => {
			const count = stars.targetPositions.length / 3;
			const positions = new Float32Array(count * 2 * 3);
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			return { geometry, positions };
		};

		const updateBigBang = (stars: StarField, progress01: number, shakeIntensity: number) => {
			// Big bang: stars expand from center sphere to final positions
			const eased = easeOutExpo(progress01);
			const count = stars.targetPositions.length / 3;

			for (let i = 0; i < count; i++) {
				const i3 = i * 3;
				const sx = stars.startPositions[i3 + 0];
				const sy = stars.startPositions[i3 + 1];
				const sz = stars.startPositions[i3 + 2];
				const tx = stars.targetPositions[i3 + 0];
				const ty = stars.targetPositions[i3 + 1];
				const tz = stars.targetPositions[i3 + 2];

				// Add shake/vibration to starting positions
				const shakeX = (Math.random() - 0.5) * shakeIntensity;
				const shakeY = (Math.random() - 0.5) * shakeIntensity;
				const shakeZ = (Math.random() - 0.5) * shakeIntensity;

				stars.positions[i3 + 0] = lerp(sx + shakeX, tx, eased);
				stars.positions[i3 + 1] = lerp(sy + shakeY, ty, eased);
				stars.positions[i3 + 2] = lerp(sz + shakeZ, tz, eased);
			}

			(stars.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
		};

		let activeConfigKey: Breakpoint | null = null;
		let activeConfig: SceneConfig | null = null;

		// Initialize with current viewport size
		const initialRect = container.getBoundingClientRect();
		activeConfig = getConfig(Math.max(1, initialRect.width), Math.max(1, initialRect.height));
		activeConfigKey = activeConfig.breakpoint;

		let starsField = makeStars(activeConfig.starsCount, activeConfig.spread);
		let streakField = makeStreaks(starsField);
		const starsBaseOpacity = 1.0;
		const starsMaterial = new THREE.PointsMaterial({
			color: new THREE.Color(getUiColor()),
			size: activeConfig.starsSize,
			sizeAttenuation: true,
			transparent: true,
			opacity: starsBaseOpacity,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
		});
		const stars = new THREE.Points(starsField.geometry, starsMaterial);
		scene.add(stars);

		// Hide streaks - not using them for big bang effect
		const streakBaseOpacity = 0.75;
		const streakMaterial = new THREE.LineBasicMaterial({
			color: new THREE.Color(getUiColor()),
			transparent: true,
			opacity: 0.50,
			blending: THREE.AdditiveBlending,
		});
		const streaks = new THREE.LineSegments(streakField.geometry, streakMaterial);
		scene.add(streaks);

		let dustField = makeStars(activeConfig.dustCount, Math.max(18, activeConfig.spread * 0.65));
		const dustBaseOpacity = 0.50;
		const dustMaterial = new THREE.PointsMaterial({
			color: new THREE.Color(getUiColor()),
			size: activeConfig.dustSize,
			sizeAttenuation: true,
			transparent: true,
			opacity: 0.50,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
		});
		const dust = new THREE.Points(dustField.geometry, dustMaterial);
		scene.add(dust);

		const resize = () => {
			const rect = container.getBoundingClientRect();
			const width = Math.max(1, rect.width);
			const height = Math.max(1, rect.height);
			const nextConfig = getConfig(width, height);
			activeConfig = nextConfig;

			// Update camera and renderer
			camera.fov = nextConfig.fov;
			camera.position.z = nextConfig.cameraZ;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, true);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, nextConfig.pixelRatioCap));

			// Update fog for the current scale
			scene.fog = new THREE.Fog(getBgColor(), nextConfig.fogNear, nextConfig.fogFar);

			// Update point sizes
			starsMaterial.size = nextConfig.starsSize;
			dustMaterial.size = nextConfig.dustSize;
			starsMaterial.needsUpdate = true;
			dustMaterial.needsUpdate = true;

			// If breakpoint changes, regenerate geometry with the new density/spread.
			if (activeConfigKey !== nextConfig.breakpoint) {
				activeConfigKey = nextConfig.breakpoint;

				const newStarsField = makeStars(nextConfig.starsCount, nextConfig.spread);
				stars.geometry.dispose();
				stars.geometry = newStarsField.geometry;
				starsField = newStarsField;

				const newStreakField = makeStreaks(starsField);
				streaks.geometry.dispose();
				streaks.geometry = newStreakField.geometry;
				streakField = newStreakField;

				const newDustField = makeStars(nextConfig.dustCount, Math.max(18, nextConfig.spread * 0.65));
				dust.geometry.dispose();
				dust.geometry = newDustField.geometry;
				dustField = newDustField;

				// Keep current state: if landing already revealed, jump to final.
				if (landingIsReady) {
					streakMaterial.opacity = 0;
					starsMaterial.opacity = starsBaseOpacity;
					dustMaterial.opacity = dustBaseOpacity;
					if (prefersReducedMotion) renderer.render(scene, camera);
				} else {
					// If still in entry animation, restart it cleanly.
					entryStartMs = lastTimeMs || performance.now();
				}
			}
		};

		resize();

		let rafId = 0;
		const render = (t: number) => {
			lastTimeMs = t;
			const time = t * 0.001;
			if (entryStartMs === null) entryStartMs = t;
			const cfg = activeConfig ?? getConfig(window.innerWidth, window.innerHeight);

			if (shouldPlayEntry) {
				const timeSinceStart = t - entryStartMs;
				const entryProgress = clamp01((t - entryStartMs - entryDelayMs) / entryDurationMs);
				
				// Calculate shake intensity during delay phase
				let shakeIntensity = 0;
				if (timeSinceStart < entryDelayMs) {
					// Build up shake intensity as we approach the explosion
					const delayProgress = timeSinceStart / entryDelayMs;
					// Smooth pulsing using sine wave (0-1 range)
					const shake = Math.sin(timeSinceStart * 0.0009) * 5 + 0.5;
					// Cubic easing for intensity build-up, multiplied by smooth pulse
					shakeIntensity = 0.7 * delayProgress * delayProgress * delayProgress * shake;
				}
				
				updateBigBang(starsField, entryProgress, shakeIntensity);

				// Fade in dust during expansion
				const dustFade = easeOutCubic(remap01(entryProgress, 0.3, 1));
				dustMaterial.opacity = dustBaseOpacity * dustFade;

				// Reveal content early during the explosion for a smoother transition
				if (entryProgress >= 0.30 && !landingIsReady) {
					markReady();
				}

				if (entryProgress >= 1) {
					starsMaterial.opacity = starsBaseOpacity;
					dustMaterial.opacity = dustBaseOpacity;
					markPlayed();
					shouldPlayEntry = false;
				}
			} else {
				// Skip entry: render the final starfield immediately.
				starsMaterial.opacity = starsBaseOpacity;
				dustMaterial.opacity = dustBaseOpacity;
				markReady();
			}

			stars.rotation.y = time * 0.03;
			stars.rotation.x = time * 0.01;
			dust.rotation.y = -time * 0.02;
			dust.rotation.x = time * 0.006;
			dust.position.y = Math.sin(time * 0.5) * 0.08;
			renderer.render(scene, camera);
			rafId = window.requestAnimationFrame(render);
		};

		if (!prefersReducedMotion) {
			if (!shouldPlayEntry) {
				// Ensure we don't flash hidden content when returning to the landing page.
				streakMaterial.opacity = 0;
				starsMaterial.opacity = starsBaseOpacity;
				dustMaterial.opacity = dustBaseOpacity;
				markReady();
			}
			rafId = window.requestAnimationFrame(render);
		} else {
			// Jump straight to final state for reduced motion.
			streakMaterial.opacity = 0;
			starsMaterial.opacity = starsBaseOpacity;
			dustMaterial.opacity = dustBaseOpacity;
			renderer.render(scene, camera);
			markPlayed();
			markReady();
		}

		const onWindowResize = () => resize();
		window.addEventListener('resize', onWindowResize);

		const resizeObserver = new ResizeObserver(() => resize());
		resizeObserver.observe(container);

		const updateThemeColor = () => {
			// Use requestAnimationFrame to ensure styles have been recomputed
			requestAnimationFrame(() => {
				const uiColor = getUiColor();
				const bgColor = getBgColor();
				
				starsMaterial.color.set(uiColor);
				dustMaterial.color.set(uiColor);
				streakMaterial.color.set(uiColor);

				// Update fog to keep the scene feeling integrated with the page.
				if (activeConfig) {
					scene.fog = new THREE.Fog(bgColor, activeConfig.fogNear, activeConfig.fogFar);
				} else {
					scene.fog = new THREE.Fog(bgColor, 8, 28);
				}

				starsMaterial.needsUpdate = true;
				dustMaterial.needsUpdate = true;
				streakMaterial.needsUpdate = true;
				
				// Force immediate render for instant theme feedback
				renderer.render(scene, camera);
			});
		};

		const themeObserver = new MutationObserver(() => updateThemeColor());
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => {
			window.removeEventListener('resize', onWindowResize);
			resizeObserver.disconnect();
			themeObserver.disconnect();
			if (rafId) window.cancelAnimationFrame(rafId);

			starsField.geometry.dispose();
			starsMaterial.dispose();
			dustField.geometry.dispose();
			dustMaterial.dispose();
			streakField.geometry.dispose();
			streakMaterial.dispose();
			renderer.dispose();
			if (renderer.domElement.parentElement === container) {
				container.removeChild(renderer.domElement);
			}
		};
	}, []);

	return (
		<div
			ref={mountRef}
			aria-hidden="true"
			className="pointer-events-none h-full w-full"
		/>
	);
}
