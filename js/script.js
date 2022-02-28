"use strict"
//*< Общие переменные>==========================================================================================
const body = document.querySelector('body');
let unlock = true;
//*</ Общие переменные>==========================================================================================

//Меню бургер
const iconMenu = document.querySelectorAll('.icon-menu');
const menuBody = document.querySelector('.menu__body');
if (iconMenu != null) {
	document.addEventListener('click', function (e) {
		if (e.target.closest('.icon-menu')) {
			iconMenu.forEach(iconMenuOne => {
				iconMenuOne.classList.toggle('_active');
			});
			// iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			bodyLock();
		}
		if (!e.target.closest('.icon-menu') && !e.target.closest('._popup-link') && !e.target.closest('.popup__content')) {
			// iconMenu.classList.remove('_active');
			iconMenu.forEach(iconMenuOne => {
				iconMenuOne.classList.remove('_active');
			});
			menuBody.classList.remove('_active');
			bodyUnLock();
		}
	});
};
//спойлеры
const iconQuestions = document.querySelectorAll('.question__title');
const iconsQuestions = document.querySelectorAll('.question__icon');
if (iconQuestions.length > 0) {
	spollers(iconQuestions);
};
function spollers(iconQuestions) {
	iconQuestions.forEach(iconQuestion => {
		iconQuestionBody(iconQuestion);
		iconQuestion.addEventListener('click', setSpollersAction)
	});
}
function iconQuestionBody(iconQuestion) {
	if (!iconQuestion.classList.contains('_active')) {
		iconQuestion.nextElementSibling.hidden = true;
	}
}
function setSpollersAction(e) {
	const el = e.target;
	const spollerBlock = el.closest('.question');
	if (!spollerBlock.querySelectorAll('._slide').length) {
		if (el.classList.contains('icon-question')) {
			el.classList.toggle('_active');
			el.parentNode.classList.toggle('_active');
			spollerBlock.classList.toggle('_active');
			_slideToggle(el.parentNode.nextElementSibling, 500);
		} else {
			el.classList.toggle('_active');
			spollerBlock.classList.toggle('_active');
			if (el.firstElementChild != null) {
				el.firstElementChild.classList.toggle('_active');
			}
			_slideToggle(el.nextElementSibling, 500);
		}
	}
	//e.preventDefault();
}
function hideSpollerBody(spollerBlock) {
	const spollerActiveTitle = spollerBlock.querySelector('.question__title._active');
	if (spollerActiveTitle) {
		spollerActiveTitle.classList.remove('_active');
		_slideUp(spollerActiveTitle.nextElementSibling, 500);
	}
}
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height,margin,padding';
		target.style.transitionDuration = duration + "ms";
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height,margin,padding';
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
//рейтинг звезд (на 5 звезд), при нажатии добавляется класс и ко всем следующим(блок надо перевернуть флексом, чтобы добавлялось к "предыдущим"), при повторном наведении сбрасывается, при уходе возвращается к предыдущему выбору.Каждой звезде надо задать id в обычном порядке, в одном рейтинге id 1.1, 1.2, 1.3 и т.д, в другом с другой цифры начинается
const stars = document.querySelectorAll('.star-rating');
let starActiv = new Array(5); //В этой переменной кол-во рейтингов + 1 (starActiv[0]) и сколько звезд в каком рейтинге выбрано
if (stars.length > 0) {
	for (let i = 0; i < stars.length; i++) {
		stars[i].addEventListener('click', function (e) {
			stars[i].classList.add('_active');
			let d = Number(e.target.id);
			starActiv[Math.floor(d)] = Math.round((Number(`${Math.floor(d)}.5`) - d) * 10);
			for (let j = 1; j <= 5; j++) {
				let newD = d + Number(`0.${j}`);
				if (newD == `${Math.floor(newD)}.6`) break;
				let elem = document.getElementById(newD.toFixed(1));
				if (elem != null) {
					elem.classList.add('_active');
				}
			};
		});
		stars[i].addEventListener('mouseover', function (e) {
			stars[i].classList.remove('_active');
			let d = Number(e.target.id);
			for (let j = 1; j <= 5; j++) {
				let newD = Number(`${Math.floor(d)}.${j}`);
				document.getElementById(newD.toFixed(1)).classList.remove('_active');
			};
		});
		stars[i].addEventListener('mouseout', function (e) {
			let d = Number(e.target.id);
			for (let j = 0; j <= starActiv[Math.floor(d)]; j++) {
				let newD = Number(`${Math.floor(d)}.5`) - Number(`0.${j}`);
				document.getElementById(newD).classList.add('_active');
			}
		});
	};
};
//Прокрутка к началу строници
const scrollToTop = document.querySelector('.scroll-to-top');
if (scrollToTop != null) {
	scrollToTop.addEventListener('click', scrollTop());
}
//анимация при скролле
const animItems = document.querySelectorAll('._anim-items');//этот класс добавляется к анимируемым объектам
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight; //высота объекта
			const animItemoffset = offset(animItem).top; //позиция объекта относительно верха
			const animStart = 4; //регулирует момент старта анимации, в данном случае при скролле 1/4 от высоты объекта

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((scrollY > animItemoffset - animItemPoint) && scrollY < (animItemoffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) { //этот класс для того, чтобы не запускать анимацию повторно и не убирать класс _active
					animItem.classList.remove('_active');
				}
			}
		}
	}
	setTimeout(() => { //Если есть анимации на верхнем блоке, она покакжется без скролла через 0.3 сек
		animOnScroll();
	}, 300);
}
//Popups
//у попапа должен быть id с его названием, а у кнопки, по которой он открывается href='#{название поп-апа}'
let popupLink = document.querySelectorAll('._popup-link'); //этот класс добавляется ко всем кнопкам, на которых открывается поп-ап
const lockPadding = document.querySelectorAll('.lock-padding'); //Этот класс добавляется к фиксированным объектам, например к шапке
if (popupLink.length > 0) {
	for (let index = 0; index < popupLink.length; index++) {
		const el = popupLink[index];
		el.addEventListener('click', function (e) {
			let popupName = el.getAttribute('href').replace('#', '');
			let curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}
let popupCloseIcon = document.querySelectorAll('.popup__close');//этот класс добавляется для крестика, по которому поп-ап закрывается
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			e.stopPropagation();
			if (menuBody.classList.contains('_active')) {
				popupClose(el.closest('.popup'), false);
			} else {
				popupClose(el.closest('.popup'));
			}
			e.preventDefault();
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		const popupActive = document.querySelector('.popup._active');
		if (menuBody.classList.contains('_active')) {
			popupClose(popupActive, false);
		} else {
			popupClose(popupActive);
		}
	}
});

//*< Функции>==========================================================================================
//Закрывает меню бургер
function menu_close() {
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
	bodyUnLock();
}
//Прокрутка к началу строници
function scrollTop(e) {
	e.preventDefault();
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
};
//Прокрутка до блока при нажатии на кнопку
//Пример применения
// const questionsX = document.querySelector('.questions_scroll');
// const questions = document.querySelector('.questions');
// if (questionsX != null) {
// 	questionsX.addEventListener('click', () => scrollToBlock(questions));
// };
function scrollToBlock(block, e) { //в скобки передаем блок, до которого надо докрутить
	e.preventDefault();
	let getTop = block.getBoundingClientRect().top;
	let getTopDocument = getTop + window.scrollY;
	window.scrollTo({
		top: getTopDocument,
		left: 0,
		behavior: "smooth",
	});
};
//эта функция точно узнает местоположение объекта.Можно получить значение сверху и слева
function offset(el) { //в скобках объект, чье местоположение нужно
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.scrollX || document.documentElement.scrollLeft,
		scrollTop = window.scrollY || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
//Открывает поп-ап
function popupOpen(curentPopup) { //В скобках попап, который надо открыть (найти его можно по айди)
	if (curentPopup && unlock) {
		let activePopup = document.querySelector('.popup._active');
		if (activePopup) {
			popupClose(activePopup, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('_active');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				e.stopPropagation();
				if (menuBody.classList.contains('_active')) {
					popupClose(e.target.closest('.popup'), false);
				} else {
					popupClose(e.target.closest('.popup'));
				}
			}
		});
	}
}
//Закрывает поп-ап
function popupClose(item, doUnlock = true) { //в скобках поп-ап, который надо закрыть и надо ли разблокировать прокрутку
	if (unlock) {
		item.classList.remove('_active');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}
//Блокирует прокрутку
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('_lock')

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, 500); //Время, в течении которого нельзя повторно открыть поп-ап, обычно равен времени анимации
}
//Разблокировывает прокрутку
function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('_lock')
	}, 200);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, 500); //Время, в течении которого нельзя повторно открыть поп-ап, обычно равен времени анимации
}
//Ставит картинку как фон
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();
//*</ Функции>==========================================================================================