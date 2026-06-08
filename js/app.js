/* ============================================================
   Portfolio interactions
   lang · nav · reveal · parallax · marquee · magnetic/tilt
   ============================================================ */
(() => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const root = document.documentElement;

	/* marquee */
	(() => {
		const stack = [
			["React", "#61DAFB"],
			["TypeScript", "#3178C6"],
			["Next.js", "#9fe9ff"],
			["Tailwind CSS", "#38BDF8"],
			["Zustand", "#caa06a"],
			["Storybook", "#FF4785"],
			["Redux", "#a78bff"],
			["Builder.io", "#8b7bff"],
			["Contentful", "#5fb0e6"],
			["Jest", "#e0556a"],
			["Git", "#F05032"],
		];
		const track = document.getElementById("marquee-track");
		if (!track) return;
		const html = stack
			.map(
				([s, c]) =>
					`<span class="inline-flex items-center gap-[.55em] px-6 font-mono text-[.76rem] font-bold tracking-[.14em] uppercase text-paper" style="--tc:${c}">${s}<span class="text-acc text-[.95rem]">&#8776;</span></span>`,
			)
			.join("");
		track.innerHTML = html + html;
	})();

	/* reveal */
	const reveals = [...document.querySelectorAll(".reveal")];
	function revealAll() {
		const vh = window.innerHeight || root.clientHeight;
		reveals.forEach((el) => {
			if (el.classList.contains("in")) return;
			const r = el.getBoundingClientRect();
			if (r.top < vh * 0.94 && r.bottom > 0) el.classList.add("in");
		});
	}
	if (reduce) {
		reveals.forEach((el) => {
			el.classList.add("in");
		});
	} else if ("IntersectionObserver" in window) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	} else {
		revealAll();
	}

	/* boot */
	document.addEventListener("DOMContentLoaded", () => {
		let lang = "es";
		try {
			lang = localStorage.getItem("portfolio-lang") || "es";
		} catch (_) {}
		if (typeof applyLang === "function") applyLang(lang);

		document.querySelectorAll(".lang-toggle button").forEach((b) => {
			b.addEventListener("click", () => {
				if (typeof applyLang === "function") applyLang(b.dataset.lang);
			});
		});

		const yrEl = document.getElementById("year");
		if (yrEl) yrEl.textContent = new Date().getFullYear();

		revealAll();

		/* mobile menu */
		const burger = document.querySelector(".nav-burger");
		const mobile = document.querySelector(".mobile-menu");
		if (burger && mobile) {
			const toggle = (force) => {
				const open = force != null ? force : !mobile.classList.contains("open");
				mobile.classList.toggle("open", open);
				burger.classList.toggle("open", open);
			};
			burger.addEventListener("click", () => toggle());
			mobile.querySelectorAll("a").forEach((a) => {
				a.addEventListener("click", () => toggle(false));
			});
		}

		/* magnetic + tilt */
		if (!reduce && window.matchMedia("(pointer: fine)").matches) {
			document.querySelectorAll("[data-magnetic]").forEach((el) => {
				el.addEventListener("mousemove", (e) => {
					const r = el.getBoundingClientRect();
					el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${(e.clientY - (r.top + r.height / 2)) * 0.25}px)`;
				});
				el.addEventListener("mouseleave", () => {
					el.style.transform = "";
				});
			});
			document.querySelectorAll("[data-tilt]").forEach((card) => {
				card.addEventListener("mousemove", (e) => {
					const r = card.getBoundingClientRect();
					const px = (e.clientX - r.left) / r.width - 0.5;
					const py = (e.clientY - r.top) / r.height - 0.5;
					card.style.transform = `perspective(900px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg) translateY(-4px)`;
				});
				card.addEventListener("mouseleave", () => {
					card.style.transform = "";
				});
			});
		}

		/* smooth-scroll for hash links (no scrollIntoView) */
		document.querySelectorAll('a[href^="#"]').forEach((a) => {
			a.addEventListener("click", function (e) {
				const id = this.getAttribute("href");
				if (id.length < 2) return;
				const target = document.querySelector(id);
				if (!target) return;
				e.preventDefault();
				const y = target.getBoundingClientRect().top + window.scrollY - 70;
				window.scrollTo({
					top: Math.max(0, y),
					behavior: reduce ? "auto" : "smooth",
				});
			});
		});
	});

	/* scroll: nav state, parallax */
	const nav = document.querySelector(".nav");
	const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
	let ticking = false;
	function onScroll() {
		const y = window.scrollY;
		if (nav) nav.classList.toggle("scrolled", y > 24);
		if (!reduce) {
			parallaxEls.forEach((el) => {
				const speed = parseFloat(el.dataset.parallax) || 0.1;
				el.style.setProperty("--parallax-y", `${(y * speed).toFixed(1)}px`);
			});
		}
		ticking = false;
	}
	window.addEventListener(
		"scroll",
		() => {
			if (!ticking) {
				requestAnimationFrame(onScroll);
				ticking = true;
			}
		},
		{ passive: true },
	);
	window.addEventListener(
		"resize",
		() => {
			if (!reduce) requestAnimationFrame(revealAll);
		},
		{ passive: true },
	);
	onScroll();
})();
