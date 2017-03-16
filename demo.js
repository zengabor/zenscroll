/*jshint devel:true, asi:true */
/*global zenscroll */

(function (win, doc) {
	"use strict"

	var next = function (el) {
		do {
			el = el.nextSibling
			if (el.nodeType === 1) {
				return el
			}
		} while (el)
		return null
	}

	var insertButtonBefore = function insertButtonBefore(parent, beforeElem, func) {
		var button = doc.createElement("BUTTON")
		button.className = "play-button"
		button.innerHTML = "▶ Play"
		if ("addEventListener" in win) {
			button.addEventListener("click", func, false)
		} else if (doc.attachEvent) {
			button.attachEvent("onclick", func)
		}
		parent.insertBefore(button, beforeElem)
	}

	var insertHelpText = function insertHelpText(parent, beforeElem, helpText) {
		var p = doc.createElement("P")
		p.innerHTML = helpText
		parent.insertBefore(p, beforeElem)
	}


	// Let’s inject some sample code for each usage example
	
	var about = doc.getElementById("about")
	var examples = doc.getElementsByTagName("h3")
	var main = examples[3].parentElement

	// Example 1:
	var div = doc.createElement("DIV")
	div.id = "禪"
	div.innerHTML = 'To see it in action try the navigation links <a href="#">at the top of this&nbsp;page</a>.&nbsp;&larr;&nbsp;Or&nbsp;press this very link here.'
	main.insertBefore(div, next(next(next(examples[3]))))

	// Example 2:
	insertButtonBefore(next(examples[4]), null, function () {
		zenscroll.to(about)
	})

	// Example 3:
	insertButtonBefore(next(examples[5]), null, function () {
		zenscroll.toY(50)
	})

	// Example 4:
	var image1 = doc.createElement("IMG")
	image1.id = "image1"
	image1.alt = "image1"
	image1.className = "example-img"
	image1.src = "image1.jpg" // or https://unsplash.it/1072/712?image=734
	var image1a = doc.createElement("A")
	image1a.href = "#4.scrollanelementintoview"
	image1a.appendChild(image1)
	main.insertBefore(image1a, examples[6])
	var image2 = doc.createElement("IMG")
	image2.id = "image2"
	image2.alt = "image2"
	image2.className = "example-img is-small"
	image2.src = "image2.jpg"
	var image2a = doc.createElement("A")
	image2a.href = "#5.scrollstheelementtothecenterofthescreen"
	image2a.appendChild(image2)
	main.insertBefore(image2a, examples[7])
	insertButtonBefore(next(next(examples[6])), null, function () {
		zenscroll.intoView(image1)
	})
	insertButtonBefore(next(next(next(next(examples[6])))), null, function () {
		image2.className = "example-img"
		setTimeout(function () { zenscroll.intoView(image2) }, 500)
		setTimeout(function () { image2.className = "example-img is-small" }, 2500)
	})

	// Example 5:
	insertButtonBefore(next(examples[7]), null, function () {
		zenscroll.center(image2)
	})
	var code5b = next(next(next(examples[7])))
	insertButtonBefore(code5b, null, function () {
		var duration = 500 // miliseconds
		var offset = 200 // pixels
		zenscroll.center(image2, duration, offset)
	})
	insertHelpText(main, image2a, 
		"Tip: For best experience position the little image at the very bottom of the viewable area before hitting ‘Play’."
	)

	// Example 6:
	var code6 = next(next(next(examples[8])))
	insertButtonBefore(code6, null, function () {
		zenscroll.toY(50, 100)
	})
	insertButtonBefore(next(code6), null, function () {
		zenscroll.to(about, 250)
	})
	insertButtonBefore(next(next(code6)), null, function () {
		zenscroll.center(image2, 2000)
	})
	insertButtonBefore(next(next(next(code6))), null, function () {
		zenscroll.to(about, 0)
	})

	// Example 7:
	var code9 = next(next(next(examples[9])))
	var container = doc.createElement("DIV")
	container.id = "container"
	container.className = "example-content example-container"
	for (var it = 1; it < 8; it++) {
		var item = doc.createElement("DIV")
		item.className = "example-item"
		item.id = "item" + it
		item.innerHTML = "ITEM " + it
		container.insertBefore(item, null)
	}
	main.insertBefore(container, next(code9))
	var defaultDuration = 500
	var edgeOffset = 30
	var myScroller
	var getMyScroller = function () { 
		if (!myScroller) {
			myScroller = zenscroll.createScroller(container, defaultDuration, edgeOffset)
		}
		return myScroller
	}
	var target = document.getElementById("item4")
	insertButtonBefore(code9, null, function () {
		zenscroll.intoView(container, 100, function () { getMyScroller().center(target) })
	})
	insertButtonBefore(next(next(next(code9))), null, function () {
		zenscroll.intoView(container, 100, function () { getMyScroller().toY(35) })
	})
	insertButtonBefore(next(next(next(next(code9)))), null, function () {
		zenscroll.intoView(container, 100, function () { getMyScroller().intoView(target) })
	})
	insertHelpText(main, next(next(next(next(next(code9))))), 
		"Tip: Scroll <em>ITEM 4</em> manually upwards/downwards out of view, then hit ‘Play’."
	)

})(this, document);
