/* surf shape motifs shared across pages */
(() => {
	var M = {
		sun: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><circle cx="50" cy="50" r="15"/><path d="M50 6v12M50 82v12M6 50h12M82 50h12M19 19l8 8M73 73l8 8M81 19l-8 8M27 73l-8 8"/><circle cx="50" cy="50" r="3.5" fill="currentColor" stroke="none"/></svg>',
		spiral:
			'<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"><path d="M50 50q0-9 9-8 13 1 13 15 0 19-24 18Q21 74 21 43 21 7 61 9"/></svg>',
		squiggle:
			'<svg viewBox="0 0 130 28" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"><path d="M6 14q9-12 18 0t18 0 18 0 18 0 18 0 18 0"/></svg>',
		wave: '<svg viewBox="0 0 100 70" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 58Q26 6 56 22q18 10 8 26-8 12-20 2-8-8 2-14"/><path d="M6 60Q44 66 94 54"/></svg>',
		flower:
			'<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><g><ellipse cx="50" cy="26" rx="11" ry="18"/><ellipse cx="50" cy="26" rx="11" ry="18" transform="rotate(72 50 50)"/><ellipse cx="50" cy="26" rx="11" ry="18" transform="rotate(144 50 50)"/><ellipse cx="50" cy="26" rx="11" ry="18" transform="rotate(216 50 50)"/><ellipse cx="50" cy="26" rx="11" ry="18" transform="rotate(288 50 50)"/></g><circle cx="50" cy="50" r="6" fill="currentColor" stroke="none"/></svg>',
		starfish:
			'<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round"><path d="M50 8 60.6 35.4 89.9 37 67.1 55.6 74.7 84 50 68 25.3 84 32.9 55.6 10.1 37 39.4 35.4Z"/></svg>',
		board:
			'<svg viewBox="0 0 40 120" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M20 4C32 36 32 84 20 116 8 84 8 36 20 4Z"/><path d="M20 16V104"/></svg>',
		shell:
			'<svg viewBox="0 0 100 84" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M50 78C18 78 12 38 22 22c8 8 12 8 18 0 6 10 14 10 20 0 6 8 10 8 18 0 10 16 4 56-28 56Z"/><path d="M50 78 34 30M50 78V26M50 78 66 30"/></svg>',
		palm: '<svg viewBox="0 0 100 112" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M50 106C50 80 50 52 48 36"/><path d="M48 36C34 24 22 24 12 32"/><path d="M48 36C36 27 27 15 25 5"/><path d="M48 36C62 24 74 24 86 30"/><path d="M48 36C60 26 72 17 77 7"/><path d="M48 36C49 25 50 14 50 6"/></svg>',
	};
	var PAL = { ink: "#1c5d56", cream: "#f3ead2", gold: "#cba35b" };

	// P entries: [shapeName, positionCSS, sideCSS, widthPx, opacity, colorKey, rotateDeg]
	// positionCSS is a full CSS fragment like "top:3%" or "bottom:8%".
	window.buildSurfMotifs = (P, opts) => {
		opts = opts || {};
		var host = document.createElement("div");
		host.id = "surf-motifs";
		host.setAttribute("aria-hidden", "true");
		host.innerHTML = P.map((p) => {
			var color = PAL[p[5]] || p[5];
			return (
				'<span class="sm" style="' +
				p[1] +
				";" +
				p[2] +
				";width:" +
				p[3] +
				"px;color:" +
				color +
				";opacity:" +
				p[4] +
				";rotate:" +
				p[6] +
				'deg">' +
				M[p[0]] +
				"</span>"
			);
		}).join("");
		document.body.appendChild(host);
		if (opts.fullHeight) {
			// size the host to the whole document so top:% spans the long page
			const size = () => {
				host.style.height = `${document.documentElement.scrollHeight}px`;
			};
			size();
			setTimeout(size, 800);
			window.addEventListener("load", size);
			let t;
			window.addEventListener(
				"resize",
				() => {
					clearTimeout(t);
					t = setTimeout(size, 250);
				},
				{ passive: true },
			);
		} else {
			host.style.height = opts.height || "100%";
		}
	};
})();
