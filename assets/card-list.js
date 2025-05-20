(function () {
	const initCardList = () => {
		const texts = document.querySelectorAll(".card-list__text");
		const images = document.querySelectorAll(".card-list__item_img_active");
		const items = document.querySelectorAll(".card-list__item_active");

		if (items.length === 0) return;

		const textAlwaysVisible = items[0].dataset.textAlwaysVisible === "true";
		const isDesktop = window.matchMedia("(min-width: 990px)").matches;

		if (textAlwaysVisible != true) {
			const setImageHeight = (image, textHeight, fullHeight) => {
				image.style.height = fullHeight
					? "100%"
					: `calc(100% - ${textHeight}px)`;
			};

			texts.forEach((text, i) => {
				const textHeight = text.offsetHeight;
				const image = images[i];

				if (isDesktop) {
					setImageHeight(image, textHeight, true);

					const handleHover = (fullHeight) => {
						if (window.matchMedia("(min-width: 990px)").matches) {
							setImageHeight(image, textHeight, fullHeight);
						}
					};

					items[i].addEventListener("mouseenter", () => handleHover(false));
					items[i].addEventListener("mouseleave", () => handleHover(true));
				} else {
					setImageHeight(image, textHeight, false);
				}
			});
		}
	};

	document.addEventListener("DOMContentLoaded", function () {
		initCardList();
		document.addEventListener("shopify:section:load", function () {
			initCardList();
		});
	});
	window.addEventListener("resize", function () {
		initCardList();
	});
})();
(function () {
	let swiper;
	const cardList = () => {
		$(".card-list-section").each(function () {
			const id = $(this).attr("id");
			const box = $(this).find(".card-list");
			const autoplay = box.data("autoplay");
			const stopAutoplay = box.data("stop-autoplay");
			const delay = 4 * 1000;

			let autoplayParm = {};
			if (autoplay) {
				autoplayParm = {
					autoplay: {
						delay: delay,
						pauseOnMouseEnter: stopAutoplay,
						disableOnInteraction: false,
					},
				};
			}

			//let paginationType = determinePaginationType()

			let swiperParms = {
				slidesPerView: 1,
				loop: false,
				spaceBetween: 16,
				autoHeight: false,
				calculateHeight: false,
				keyboard: true,
				pagination: {
					el: `#${id} .swiper-pagination`,
					clickable: true,
					type: "bullets",
				},
				...autoplayParm,
			};

			//if (swiper) {
			//	swiper.destroy()
			//}
			if (window.innerWidth <= 576) {
				swiper = new Swiper(`#${id} .swiper`, swiperParms);
			}
		});
	};
	if (window.innerWidth > 576) {
		const slides = document.querySelectorAll(".card-list__list .swiper-slide");
		slides.forEach((slide) => {
			slide.classList.remove("swiper-slide");
		});
	}
	document.addEventListener("DOMContentLoaded", function () {
		cardList();
		document.addEventListener("shopify:section:load", function () {
			cardList();
		});
	});
})();
