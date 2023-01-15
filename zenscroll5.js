/**
 * Zenscroll 5.0.1
 * https://github.com/zengabor/zenscroll/
 *
 * Copyright 2015–2022 Gabor Lenard
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:
const isNativeSmoothScrollEnabledOn = function(elem) {
	return elem && window.getComputedStyle(elem)["scroll-behavior"] === "smooth"
}

export const makeScroller = function(container, defaultDuration, edgeOffset) {
	// Use defaults if not provided
	defaultDuration = defaultDuration || 999 // ms
	if (!edgeOffset && edgeOffset !== 0) {
		// When scrolling, this amount of distance is kept from the edges of the container:
		edgeOffset = 9 // px
	}

	// Handling the life-cycle of the scroller
	let scrollTimeoutId
	const setScrollTimeoutId = (newValue) => scrollTimeoutId = newValue

	/**
	 * Stop the current smooth scroll operation immediately
	 */
	const stopScroll = () => {
		clearTimeout(scrollTimeoutId)
		setScrollTimeoutId(0)
	}

	const topOf = (elem) => Math.min(
		Math.max(0, container.getTopOf(elem)-edgeOffset),
		container.getHeight()-window.innerHeight-edgeOffset
	)

	/**
	 * Scrolls to a specific vertical position in the document.
	 *
	 * @param {int} targetY The vertical position within the document.
	 * @param {int} duration Optionally the duration of the scroll operation in miliseconds.
	 *        If not provided the default duration is used.
	 * @return {Promise} A promise which resolves when the scroll has finished.
	 */
	const scrollToY = function(targetY, duration) {
		stopScroll()
		return new Promise((resolve) => {
			if (duration === 0 || (duration && duration < 0) || isNativeSmoothScrollEnabledOn(container.body)) {
				container.toY(targetY)
				resolve()
			} else {
				const startY = container.getY()
				const distance = Math.max(0, targetY) - startY
				const startTime = new Date().getTime()
				duration = duration || Math.min(Math.abs(distance), defaultDuration);
				(function loopScroll() {
					setScrollTimeoutId(setTimeout(() => {
						// Calculate percentage:
						const p = Math.min(1, (new Date().getTime() - startTime) / duration)
						// Calculate the absolute vertical position:
						const y = Math.max(0, Math.floor(startY + distance*(p < 0.5 ? 2*p*p : p*(4 - p*2)-1)))
						container.toY(y)
						if (p < 1 && (container.getHeight() + y) < container.body.scrollHeight) {
							loopScroll()
						} else {
							setTimeout(stopScroll, 99) // with cooldown time
							resolve()
						}
					}, 9))
				})()
			}
		})
	}

	/**
	 * Scrolls to the top of a specific element.
	 *
	 * @param {HTMLElement} elem The element to scroll to.
	 * @param {int} duration Optionally the duration of the scroll operation in miliseconds.
	 * @return {Promise} A promise which resolves when the scroll has finished.
	 */
	const scrollToElem = function(elem, duration) {
		return scrollToY(topOf(elem), duration)
	}

	/**
	 * Scrolls an element into view if necessary.
	 *
	 * @param {HTMLElement} elem The element.
	 * @param {int} duration Optionally the duration of the scroll operation in miliseconds.
	 * @return {Promise} A promise which resolves when the scroll has finished.
	 */
	const scrollIntoView = function(elem, duration) {
		const elemHeight = elem.getBoundingClientRect().height
		const elemBottom = container.getTopOf(elem) + elemHeight
		const containerHeight = container.getHeight()
		const y = container.getY()
		const containerBottom = y + containerHeight
		if (topOf(elem) < y || (elemHeight + edgeOffset) > containerHeight) {
			// Element is clipped at top or is higher than screen.
			return scrollToElem(elem, duration)
		} else if ((elemBottom + edgeOffset) > containerBottom) {
			// Element is clipped at the bottom.
			return scrollToY(elemBottom - containerHeight + edgeOffset, duration)
		} else {
			return new Promise((resolve) => resolve())
		}
	}

	/**
	 * Scrolls to the center of an element.
	 *
	 * @param {HTMLElement} elem The element.
	 * @param {int} duration Optionally the duration of the scroll operation in miliseconds.
	 * @param {int} offset Optionally the offset of the top of the element from the
	 *        center of the screen in pixel lines. A value of 0 is ignored.
	 * @return {Promise} A promise which resolves when the scroll has finished.
	 */
	const scrollToCenterOf = function(elem, duration, offset) {
		return scrollToY(
			Math.max(0, container.getTopOf(elem) - container.getHeight()/2 +
				(offset || elem.getBoundingClientRect().height/2)),
			duration
		)
	}

	/**
	 * Changes default settings for this scroller.
	 *
	 * @param {int} newDefaultDuration Optionally a new value for default duration,
	 *        used for each scroll method by default. Ignored if null or undefined.
	 * @param {init} newEdgeOffset Optionally a new value for the edge offset in pixel lines,
	 *        used by each scroll method by default. Ignored if null or undefined.
	 * @return {object} An object with the current values.
	 */
	const setup = function(newDefaultDuration, newEdgeOffset) {
		if (newDefaultDuration === 0 || newDefaultDuration) {
			defaultDuration = newDefaultDuration
		}
		if (newEdgeOffset === 0 || newEdgeOffset) {
			edgeOffset = newEdgeOffset
		}
		return {
			defaultDuration: defaultDuration,
			edgeOffset:      edgeOffset,
		}
	}

	return {
		setup:    setup,
		to:       scrollToElem,
		toY:      scrollToY,
		intoView: scrollIntoView,
		center:   scrollToCenterOf,
		stop:     stopScroll,
		moving:   () => !!scrollTimeoutId,
		getY:     container.getY,
		getTopOf: container.getTopOf,
	}
}


const getDocY = () => window.scrollY || document.documentElement.scrollTop

// Create a scroller for the document:
const Zenscroll = makeScroller({
	body:      document.scrollingElement || document.body,
	toY:       (y) => window.scrollTo(0, y),
	getY:      getDocY,
	getHeight: () => document.documentElement.clientHeight || window.innerHeight,
	getTopOf:  (elem) => elem.getBoundingClientRect().top + getDocY() - document.documentElement.offsetTop,
})

/**
 * Creates a scroller from the provided container element (e.g., a DIV)
 *
 * @param {HTMLElement} scrollContainer The vertical position within the document.
 * @param {int} defaultDuration Optionally a value for default duration, used for each scroll method by default.
 *        Ignored if 0 or null or undefined.
 * @param {int} edgeOffset Optionally a value for the edge offset, used by each scroll method by default.
 *        Ignored if null or undefined.
 * @return {object} A scroller object, similar to `zenscroll` but controlling the provided element.
 */
export const createScroller = function(scrollContainer, defaultDuration, edgeOffset) {
	return makeScroller(
		{
			body:      scrollContainer,
			toY:       (y) => scrollContainer.scrollTop = y,
			getY:      () => scrollContainer.scrollTop,
			getHeight: () => Math.min(scrollContainer.clientHeight,
				document.documentElement.clientHeight || window.innerHeight),
			getTopOf:  (elem) => elem.offsetTop,
		},
		defaultDuration, edgeOffset
	)
}


// Automatic link-smoothing on achors
// Exclude when native is enabled or Zenscroll auto- is disabled
if (!window.noZensmooth && !isNativeSmoothScrollEnabledOn(document.scrollingElement)) {
	const isScrollRestorationSupported = "scrollRestoration" in history

	// On first load & refresh make sure the browser restores the position first
	if (isScrollRestorationSupported) {
		history.scrollRestoration = "auto"
	}

	let lastPathname

	window.addEventListener("load", () => {
		if (isScrollRestorationSupported) {
			// Set it to manual
			setTimeout(() => history.scrollRestoration = "manual", 9)
			window.addEventListener("popstate", (event) => {
				if (event.state && "zenscrollY" in event.state) {
					Zenscroll.toY(event.state.zenscrollY, location.pathname === lastPathname ? null : 0)
				}
			})
		}
		// Add edge offset on first load if necessary
		if (location.hash) {
			setTimeout(() => {
				// Adjustment is only needed if there is an edge offset:
				const edgeOffset = Zenscroll.setup().edgeOffset
				if (edgeOffset) {
					const anchor = location.href.split("#")[1]
					let targetElem = document.getElementById(anchor)
					if (!targetElem) {
					    const elements = document.getElementsByName(anchor)
					    for (const e of elements) {
					        if (e.tagName === "A") {
					            targetElem = e
					            break
					        }
					    }
					}
					if (targetElem) {
						const targetY = Math.max(0, Zenscroll.getTopOf(targetElem) - edgeOffset)
						const diff = Zenscroll.getY() - targetY
						// Only do the adjustment if the browser is very close to the element:
						if (0 <= diff && diff < 9 ) {
							window.scrollTo(0, targetY)
						}
					}
				}
			}, 9)
		}
	})

	// Handling clicks on anchors
	const REnoZensmooth = new RegExp(/(^|\\s)noZensmooth(\\s|$)/i)
	window.addEventListener("click", (event) => {
		if (window.noZensmooth || event.button !== 0 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
			// Let the browser handle the click if window.noZensmooth is trueish
			// or it wasn't with the primary button, or some modifier key was pressed.
			return
		}
		let anchor = event.target
		while (anchor && anchor.tagName !== "A") {
			anchor = anchor.parentNode
		}
		if (!anchor) {
			return
		}
		// Save the current scrolling position so it can be used for scroll restoration:
		if (isScrollRestorationSupported) {
			const historyState = history.state || {}
			historyState.zenscrollY = Zenscroll.getY()
			try {
				history.replaceState(historyState, "")
			} catch (e) {
				// Avoid the Chrome Security exception on file protocol, e.g., file://index.html
			}
		}
		// Find the referenced ID:
		const href = anchor.getAttribute("href") || ""
		if (href.indexOf("#") === 0 && !REnoZensmooth.test(anchor.className)) {
			let targetY = 0
			const targetElem = document.getElementById(href.substring(1))
			if (href !== "#") {
				if (!targetElem) {
					// Let the browser handle the click if the target ID is not found.
					return
				}
				targetY = Zenscroll.getTopOf(targetElem)
			}
			event.preventDefault()
			let onDone = () => location.assign(href) // By default trigger the browser's `hashchange` event...
			// ...unless there is an edge offset specified in which case it would jump abruptly so:
			const edgeOffset = Zenscroll.setup().edgeOffset
			if (edgeOffset) {
				targetY = Math.max(0, targetY - edgeOffset)
				lastPathname = location.pathname
				onDone = () => {
					const historyState = history.state || {}
					historyState.zenscrollY = Zenscroll.getY()
					try {
						history.pushState(historyState, "", href)
					} catch (e) {
						// Avoid the Chrome Security exception on file protocol, e.g., file://index.html
					}
				}
			}
			Zenscroll.toY(targetY, null).then(onDone)
		}
	}, { capture: true })
}

export default Zenscroll
