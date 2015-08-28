<p align="center">
	<a href="https://zengabor.github.io/zenscroll/">
		<img src="https://zengabor.github.io/zenscroll/zenscroll.png" alt="Zenscroll">
	</a>
</p>


#### [**Download**](https://github.com/zengabor/zenscroll/archive/latest.zip) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [**Demo**](https://zengabor.github.io/zenscroll/) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [**About**](#about) &nbsp; &nbsp; &nbsp; &nbsp; [**Install**](#install) &nbsp; &nbsp; &nbsp; &nbsp; [**How to use**](#how-to-use) &nbsp; &nbsp; &nbsp; &nbsp; [**License**](#license)


# One JavaScript to Smooth-Scroll Them All

Elegant smooth scrolling on your page. No more abrupt jumps. Move elements into view, center them, or scroll to any Y position.

865 bytes of pure JavaScript. No dependencies.

## About

Zenscroll is a vanilla JavaScript module that enables animated scrolling to any element or any position within your document or within a scrollable container.

Features:

- Animated scrolling to anchors on the same page.
- Scroll to a specific element.
- Scrolling an element into view, making sure both top & bottom are visible, if possible.
- Scroll to an element while centering it on the screen.
- Customize the duration and the spacing between the element and the edge of the screen.
- No dependencies. Works great with others.
- Small size: 865 bytes (minimized & gzipped).
- Tested and works under the latest default browsers on Android, iOS, OS X, Windows. It was also tested on Android 2.2+, Firefox 3.6+, IE6+, iOS Safari 5+, OS X Safari 5+.


## Install

Include [Zenscroll](https://github.com/zengabor/zenscroll/archive/latest.zip) into your page. A good place is at the very bottom, just before the closing `</body>` tag. For&nbsp;example:

````html
    ...
    <script src="zenscroll-min.js"></script>
</body>
````

You can also use npm to install Zenscroll:

````
npm install zenscroll
````

## How to use

### 1. Smooth scroll within your page

If Zenscroll is included in your page it will automatically animate the scrolling to anchors on the same page.

Since this is implemented a progressive enhancement, all internal links still work in very old browsers, like IE6, although the jump is not animated. Also note that internal links are intentionally not added to the history to save the users from having to hit the Back button too many times afterwards.

If you want, you can opt out of this automatic smoothing:

````js
zenscroll.setup(null, null, true)
````


### 2. Scroll to the top of an element

````js
var about = document.getElementById("about")
zenscroll.to(about)
````

Note that Zenscroll intentionally leaves a few pixels (by default 9px) from the edges of the screen or scolling container. You can globally override this with the `edgeOffset` parameter of the constructor.

### 3. Scroll to a specific vertical position

````js
zenscroll.toY(123)
````

### 4. Scroll an element into view 

If the element is already fully visible then no scroll is performed. Otherwise Zenscroll will try to make both top & bottom of element visible, if possible. If the element is higher than the visible viewport then it will simply scroll to the top of the element. 

````js
zenscroll.intoView(image1)
````

Tip: If you resize an element with a transition of 500ms, you can postpone calling zenscroll with that amount of time:

````js
image.classList.remove("is-small")
setTimeout(function () { 
    zenscroll.intoView(image2) 
}, 500)
````


### 5. Scrolls the element to the center of the screen

````js
zenscroll.center(image2)
````

If you want you can also define an offset. The top of the element will be upwards from the center of the screen by this amount of pixels. (By default offset is the half of the element’s height.)

````js
var duration = 500 // miliseconds
var offset = 200 // pixels
zenscroll.center(image2, duration, offset)
````

Note that a zero value for offset is ignored. You can work around this by using `zenscroll.toY()`.

### 6. Set the duration of the scroll

The default duration is 999 which is ~1 second. The duration is automatically reduced for elements that are very close. You can specifically set the duration via an optional second parameter. (Note that a value of zero for duration is ignored.)

Examples:

````js
zenscroll.toY(70, 100) // 100ms == 0.1 second
````

````js
zenscroll.to(about, 500) // 500ms == half a second
````

````js
zenscroll.center(image2, 2000) // 2 seconds
````

### 7. Controlling the smooth scroll operation

To check whether a scoll is being performed right now:

````js
var isScrolling = zenscroll.moving()
````

To stop the current scrolling:

````js
zenscroll.stop()
````

### 8. Scroll inside a scrollable container element

Anything you can do within the document you can also do inside a scrollable element. You just need to instantiate a new scoller for that element.

Example:

````html
<div id="container">
  <div id="item1">ITEM 1</div>
  <div id="item2">ITEM 2</div>
  <div id="item3">ITEM 3</div>
  <div id="item4">ITEM 4</div>
  <div id="item5">ITEM 5</div>
  <div id="item6">ITEM 6</div>
  <div id="item7">ITEM 7</div>
</div>

<script>
  var c = document.getElementById("container")
  var defaultDuration = 500
  var edgeOffset = 4
  var cScroll = zenscroll.new(c, defaultDuration, edgeOffset)
  var target = document.getElementById("item4")
  cScroll.center(target)
</script>
````

Obviously you can use all other scroll methods and parameters with the scrollable container. Two more examples:

````js
cScroll.toY(35)
````

````js
cScroll.intoView(target, 750)
````

## License

[Public Domain](http://unlicense.org). You can do with it whatever you want and I am not responsible for anything.


## Other projects by me:

- [Zenfonts](https://github.com/zengabor/zenfonts), a tiny JavaScript helper for @font-face loading
- [Zenvite.com](http://zenvite.com/): Create beautiful invitation pages & get everybody on the same page
