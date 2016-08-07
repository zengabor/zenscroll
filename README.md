<p align="center">
	<a href="https://zengabor.github.io/zenscroll/">
		<img src="https://zengabor.github.io/zenscroll/zenscroll.png" alt="Zenscroll">
	</a>
</p>


#### [**Demo**](https://zengabor.github.io/zenscroll/) &nbsp; &nbsp; &nbsp; &nbsp; [**Download**](https://github.com/zengabor/zenscroll/archive/latest.zip) &nbsp; &nbsp; &nbsp; &nbsp; [**About**](#about) &nbsp; &nbsp; &nbsp; &nbsp; [**Install**](#install) &nbsp; &nbsp; &nbsp; &nbsp; [**How to use**](#how-to-use) &nbsp; &nbsp; &nbsp; &nbsp; [**License**](#license)


# One JavaScript to Smooth-Scroll&nbsp;Them&nbsp;All

Smooth animated scrolling. Move&nbsp;elements&nbsp;into&nbsp;view, or&nbsp;scroll&nbsp;to any vertical&nbsp;position.

1.1&nbsp;kilobyte of vanilla&nbsp;JavaScript. No&nbsp;dependencies.


## About

Zenscroll is a vanilla JavaScript module that enables animated vertical scrolling to any element or any position within your document or within a DIV or other scrollable container.

Features:

- Smooth animated scrolling, using the browser’s built-in smooth-behavior if it’s enabled.
- Automatic smooth-scolling on links within the same page.
- Scroll to the top of a specific element.
- Scrolling an element into view, making sure both top & bottom are visible, if possible.
- Scroll to an element and center it on the screen.
- Customize the duration of the individual scroll operations.
- If you provide a callback function it will be executed when the scrolling is done.
- Specify the spacing between the element and the edge of the screen (e.g., for fixed navigation bars and footers).
- Just 1.1 kilobyte minimized & gzipped.
- No dependencies.

Full support tested and works under:

- Android Browser 2.2+
- Chrome for Android
- Chrome 14+ (probably earlier too)
- Edge
- Firefox 9+
- Internet Explorer 9+
- iOS Safari 4+
- Opera 10.6+ (probably earlier too)
- Safari 4+
- Windows Phone 8.1
- Yandex 14.12

Limited support (programmatic animated scroll in document) tested and works under:

- Firefox 3+
- Internet Explorer 6+
- iOS Safari 3+

## Getting Started

### Installing Zenscroll

[Download Zenscroll](https://github.com/zengabor/zenscroll/archive/latest.zip) and include it into your page. A good place is at the very bottom, just before the closing `</body>` tag. For&nbsp;example:

````html
    ...
    <script src="zenscroll-min.js"></script>
</body>
````

You can also use npm to get Zenscroll:

````
npm install zenscroll
````

### Enabling native smooth-scrolling in the browser

If you want to leverage the native smooth-scrolling by the browser (currently available in Firefox 36+ and Chrome 49+) then set the [`scroll-behavior` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) to `smooth` on the body and on the elements you want to scroll. E.g.,

````css
body, .smooth-container { scroll-behavior: smooth }
````

In this case Zenscroll will use the browser’s built-in support for all scroll functions. However, note that if you use the native smooth-scrolling then you loose the finer control options that Zenscroll offers: the speed of the animation, and the edge offset for links within the page. Only set this CSS property on the `body` or on the elements if you don’t need this level of control.

### Disabling automatic smoothing on local links

If you want to use Zenscroll programmatically but you don’t need the automatic smoothing on local links then set `window.noZensmooth` to a non-falsy value. In this case the event handler for automatic smoothing is not installed but you can still use everything, like `zenscroll.intoView()`, etc. It’s important to set this value before Zenscroll is executed, otherwise the handler will be installed. So make sure that setting the variable comes before the loading of the script. For&nbsp;example:

````html
    ...
    <script>window.noZensmooth = true</script>
    <script src="zenscroll-min.js"></script>
</body>
````

(I consider this a rare scenario that’s why I keep the default behavior of installing the event handler.)

## How to use


### 1. Smooth scroll within your page

If Zenscroll is included in your page it will automatically animate the scrolling to anchors on the same page. 

However, automatic smooth scrolling within the same page is not enabled in these two cases:

1. If you set `window.noZensmooth` to a non-falsy value (see [above](#disablingautomaticsmoothingonlocallinks)).
2. If the `scroll-behavior` CSS property is set to `smooth` on the `body` (see [above](#enablingnativesmooth-scrollinginthebrowser)). In this case the browser is already smooth-scrolling within the same page.

If you want only some of the links to be excluded from the automatic smoothing then start with the path of the page. E.g., instead of writing `<a href="#about">` use `<a href="/#about">`.

Automatic smooth-scrolling works also with content you dynamically load via AJAX, as Zenscroll uses a generic click handler. Internal links are intentionally not added to the history to save the users from having to hit the Back button too many times afterwards. Since the automatic smooth-scrolling is implemented a progressive enhancement, all internal links still work even in old browsers.


### 2. Scroll to the top of an element

````js
var about = document.getElementById("about")
zenscroll.to(about)
````

Note that Zenscroll intentionally leaves a few pixels (by default 9px) from the edges of the screen or scolling container. If you have a fixed navigation bar or footer bar then you probably need more than that. Or you may want to set it to zero. You can globally override the default value by calling `zenscroll.setup()` (see below), or by providing the `edgeOffset` parameter when you create a scroller for a DIV, e.g., `zenscroll.createScroller(myDiv, null, 0)`


### 3. Scroll to a specific vertical position

````js
zenscroll.toY(50)
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

The default duration is 999 which is ~1 second. The duration is automatically reduced for elements that are very close. You can specifically set the duration for each scroll function via an optional second parameter. (Note that a value of zero for duration is ignored.)

Examples:

````js
zenscroll.toY(50, 100) // 100ms == 0.1 second
````

````js
zenscroll.to(about, 500) // 500ms == half a second
````

````js
zenscroll.center(image2, 2000) // 2 seconds
````


### 7. Scroll inside a scrollable DIV

Anything you can do within the document you can also do inside a scrollable element. You just need to instantiate a new scoller for that element. I will also fall back by default to the native browser smooth-scrolling if available (which can be overridden via `setup()`).

**Important:** the container DIV must have its `position` CSS property set to `relative`, `absolute` or `fixed`. If you want to keep it in the normal document flow, just assign `position: relative` to it via a class or a `style` attribute, like in the example below:

````html
<div id="container" style="position: relative">
  <div id="item1">ITEM 1</div>
  <div id="item2">ITEM 2</div>
  <div id="item3">ITEM 3</div>
  <div id="item4">ITEM 4</div>
  <div id="item5">ITEM 5</div>
  <div id="item6">ITEM 6</div>
  <div id="item7">ITEM 7</div>
</div>

<script>
  var defaultDuration = 500
  var edgeOffset = 30
  var myDiv = document.getElementById("container")
  var myScroller = zenscroll.createScroller(myDiv, defaultDuration, edgeOffset)
  var target = document.getElementById("item4")
  myScroller.center(target)
</script>
````

Obviously you can use all other scroll functions and parameters with the scrollable container. Two more examples:

````js
myScroller.toY(35)
````

````js
myScroller.intoView(target)
````


### 8. Execute something when the scrolling is done

You can provide a callback function to all four scroll functions, which is executed when the scroll operation is finished. For example, you change some UI elements but first you want to make sure that the relevant elements are visible.

If you look at the code examples above under the previous point, [7. Scroll inside a scrollable DIV](#7.scrollinsideascrollablediv) they are actually implemented like this:

````js
// Last line of example 1:
zenscroll.intoView(container, 100, function () { myScroller.center(target) })

// Example 2:
zenscroll.intoView(container, 100, function () { myScroller.toY(35) })

// Example 3:
zenscroll.intoView(container, 100, function () { myScroller.intoView(target) })
````

So first the container (with _ITEM 1_ to _ITEM 7_) is scrolled into view if necessary, and then the scrolling inside the container is performed. Try scrolling out the above container and then hit one of the ‘Play’ buttons above to see how it works.

This works with all four scrolling functions. The `onDone` parameter is always the last parameter:

1. `to(element, duration, onDone)`
1. `toY(y, duration, onDone)`
1. `intoView(element, duration, onDone)`
1. `center(element, duration, offset, onDone)`


### 9. Change settings

It’s easy to change the basic parameters of scrolling:

- You can set the default value for duration. This will be valid for internal scrolls and all your direct scroll calls where you don’t specify a duration.
- Change the edge offset (the spacing between the element and the screen edge). If you have a fixed navigation bar or footer bar then set the offset to their height.

````js
var defaultDuration = 777 // ms
var edgeOffset = 42 // px
zenscroll.setup(defaultDuration, edgeOffset)
````

You can change custom scrollers similarly:

````js
myScroller.setup(500, 10)
````

If you don’t want to change a value just omit the parameter or pass `null`. For example, the line below sets the default duration, while leaving other settings unchanged:

````js
zenscroll.setup(777)
````

Sets the the spacing between the edge of the screen (or a DIV) and the target element you are scrolling to, while leaving the default duration unchanged:

````js
zenscroll.setup(null, 42)
````


### 10. Controlling the smooth operation

To check whether a scoll is being performed right now:

````js
var isScrolling = zenscroll.moving()
````

To stop the current scrolling:

````js
zenscroll.stop()
````

## License

[Public Domain](http://unlicense.org). You can do with it whatever you want and I am not responsible for anything.


## Other projects by me:

- [Zenfonts](https://github.com/zengabor/zenfonts), a tiny JavaScript helper for @font-face web font loading.
- [Zenvite.com](http://zenvite.com/): Create invitation pages & get everybody on the same page.
