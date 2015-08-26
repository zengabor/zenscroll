/*jshint devel:true, asi:true */
/*global zenscroll */

(function (doc) {
	"use strict"

	var insertButtonBefore = function insertButtonBefore(parent, beforeElem, func) {
		var button = doc.createElement("BUTTON")
		button.className = "play-button"
		button.innerHTML = "▶ Play"
		button.addEventListener("click", func, false)
		parent.insertBefore(button, beforeElem)
		var spacer = doc.createElement("DIV")
		spacer.className = "try-spacer"
		parent.insertBefore(spacer, beforeElem)
	}

	var insertHelpText = function insertHelpText(parent, beforeElem, helpText) {
		var p = doc.createElement("P")
		p.className = "try-help"
		p.innerHTML = helpText
		parent.insertBefore(p, beforeElem)
	}


	// Let’s inject some sample code for each usage example
	
	var about = doc.getElementById("about")
	var examples = doc.getElementsByTagName("h3")
	var main = examples[0].parentElement

	// Example 1:
	var div = doc.createElement("DIV")
	div.innerHTML = 'For example, try the navigation links <a href="#">at the top of this page &uarr;</a>.'
	main.insertBefore(div, examples[0].nextElementSibling.nextElementSibling)

	// Example 2:
	insertButtonBefore(examples[1].nextElementSibling, null, function () {
		zenscroll.to(about)
	})

	// Example 3:
	insertButtonBefore(examples[2].nextElementSibling, null, function () {
		zenscroll.toY(123)
	})

	// Example 4:
	var image1 = doc.createElement("IMG")
	image1.id = "image1"
	image1.alt = "image1"
	image1.className = "example-img"
	image1.src = "image1.jpg"
	main.insertBefore(image1, examples[3])
	var image2 = doc.createElement("IMG")
	image2.id = "image2"
	image2.alt = "image2"
	image2.className = "example-img is-small"
	image2.src = "image2.jpg"
	main.insertBefore(image2, examples[4])
	insertButtonBefore(examples[3].nextElementSibling.nextElementSibling, null, function () {
		zenscroll.intoView(image1)
	})
	insertButtonBefore(examples[3].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling, null, function () {
		image2.className = "example-img"
		setTimeout(function () { zenscroll.intoView(image2) }, 500)
		setTimeout(function () { image2.className = "example-img is-small" }, 2500)
	})

	// Example 5:
	insertButtonBefore(examples[4].nextElementSibling, null, function () {
		zenscroll.center(image2)
	})
	var code5b = examples[4].nextElementSibling.nextElementSibling.nextElementSibling
	insertButtonBefore(code5b, null, function () {
		var duration = 500 // miliseconds
		var offset = 200 // pixels
		zenscroll.center(image2, duration, offset)
	})
	insertHelpText(main, image2, 
		"Tip: For best experience position the little image at the very bottom of the viewable area before hitting ‘Play’."
	)

	// Example 6:
	var code6 = examples[5].nextElementSibling.nextElementSibling.nextElementSibling
	insertButtonBefore(code6, null, function () {
		zenscroll.toY(70, 100)
	})
	insertButtonBefore(code6.nextElementSibling, null, function () {
		zenscroll.to(about, 250)
	})
	insertButtonBefore(code6.nextElementSibling.nextElementSibling, null, function () {
		zenscroll.center(image2, 2000)
	})

	// Example 9:
	var code9 = examples[7].nextElementSibling.nextElementSibling.nextElementSibling
	var c = doc.createElement("DIV")
	c.id = "container"
	c.className = "example-content example-container"
	for (var it = 1; it < 8; it++) {
		var item = doc.createElement("DIV")
		item.id = "item" + it
		item.innerHTML = "ITEM " + it
		c.insertBefore(item, null)
	}
	main.insertBefore(c, code9.nextElementSibling)
	var defaultDuration = 500
	var edgeOffset = 6
	var cScroll = zenscroll.new(c, defaultDuration, edgeOffset)
	var target = document.getElementById("item4")
	insertButtonBefore(code9, null, function () {
		zenscroll.intoView(c, 100)
		cScroll.center(target)
	})
	insertButtonBefore(code9.nextElementSibling.nextElementSibling.nextElementSibling, null, function () {
		zenscroll.intoView(c, 100)
		cScroll.toY(35)
	})
	insertButtonBefore(code9.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling, null, function () {
		zenscroll.intoView(c, 100)
		cScroll.intoView(target, 750)
	})
	insertHelpText(main, code9.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling, 
		"Tip: Scroll <em>ITEM 4</em> manually upwards/downwards out of view, then hit ‘Play’."
	)

})(document);
