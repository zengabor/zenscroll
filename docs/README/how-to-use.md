## How to use


### 1. Automatic smooth-scroll to links within the page

If Zenscroll is included in your page it will automatically animate the vertical scrolling to anchors on the same page. No further setting is required.

Automatic smooth-scrolling works also with content you dynamically load via AJAX, as Zenscroll uses a generic click handler. Since the automatic smooth-scrolling is implemented a progressive enhancement, internal links work in older browsers as well.

#### 1.1. Automatic edge offset adjustment on load

Zenscroll automatically adds the configured edge offset when the page is loaded with a hash suffix. For example, if you navigate to `"http://yoursite.com/#about"` then the scroll position will be not cut sharply at the top edge of the element with `id="above"`. Instead, Zenscroll automatically adds the configured edge offset (which is 9 pixels by default, unless you [changed it](#9.changesettings)).

Obviously, no automatic adjustment happens if you set the edge offset to zero.

#### 1.2. Limited support for smooth back & forward navigation

The scroll is also animated when the browser’s Back and Forward buttons or the relevant key combinations are used (or even if the navigation is invoked from JavaScript). Note that although Zenscroll remembers the vertical scroll position, it cannot calculate changes caused by browser window resizing or collapsing/expanding elements, etc.

This functionality requires browser support for `history.scrollRestoration` which is available for example in Chrome 46+, Firefox 46+, and Safari Technology Preview.

#### 1.3. Limited support for the `hashchange` event and the CSS pseudo `:target`

The automatic smooth-scroll on local links can also trigger the standard `hashchange` event and the CSS pseudo-class `:target` but only if you set the edge offset to 0. I had to introduce this limitation because otherwise the scrolling isn’t smooth.

So if you need `hashchange` or `:target` then make sure you execute `zenscroll.setup(null, 0)`.

#### 1.4. No support for automatic scroll to elements inside scrollable elements

Zenscroll wants to be a lightweight solution for animated vertical scrolling, that works in most browsers. The automatic link-scrolling is even more focused on anchors that are directly inside the page body. Unfortunately it won’t scroll accurately to elements that are inside other scrollable elements (e.g., `overflow: auto; max-height: 100px`). Don’t expect Zenscroll to re-implement the full functionality of the browser, with the recursive logic of traversing the nested scrollable elements.

So, how to deal with a situation like this? Try one of the following methods:

- Exclude the problematic links from the automatic smooth-scrolling (see [1.6.](#1.6.excludealinkfromtheautomaticsmooth-scrolling)).
- Or implement the special logic programatically (see [7\. Scroll inside a scrollable DIV](#7.scrollinsideascrollablediv)).
- Or don’t use Zenscroll at all. Instead, rely on the browser’s built-in scrolling, and enable the native smooth-scrolling (via `body { scroll-behavior: smooth }`) which works in new browsers.

#### 1.5. Disable the automatic smooth-scrolling

You can globally disable the automatic smooth-scrolling to links on the same page via one of the following methods:

1. If you set `window.noZensmooth` to a non-falsy value (see [above](#disablingautomaticsmoothingonlocallinks)).
2. In new browsers if the `scroll-behavior` CSS property is set to `smooth` on the `body` (see [above](#enablingnativesmooth-scrollinginthebrowser)). In this case Zenscroll will only enable automatic smooth-scrolling in browsers which don’t support this feature yet (e.g., Internet Explorer).

#### 1.6. Exclude a link from the automatic smooth-scrolling

If you want only some of the links to be excluded from the automatic smoothing then do one of the following:

1. Add the class `noZensmooth` to the anchor element, for example `<a href="#about" class="noZensmooth">`
1. Alternatively, start with the path of the page. E.g., instead of writing `<a href="#about">` use `<a href="/#about">` or `<a href="index.html#about">`.


### 2. Scroll to the top of an element

````js
var about = document.getElementById("about")
zenscroll.to(about)
````

Note that Zenscroll intentionally leaves a few pixels (by default 9px) from the edges of the screen or scrolling container. If you have a fixed navigation bar or footer bar then you probably need more than that. Or you may want to set it to zero. You can globally override the default value by calling `zenscroll.setup()` (see [below](#9.changesettings)), or by providing the `edgeOffset` parameter when you create a scroller for a DIV, e.g., `zenscroll.createScroller(myDiv, null, 20)`


### 3. Scroll to a specific vertical position

````js
zenscroll.toY(50)
````


### 4. Scroll an element into view 

If the element is already fully visible, with the edge offset at the top and bottom, then no scroll is performed. Otherwise Zenscroll will try to make both top & bottom of element visible, if possible. If the element is higher than the visible viewport then it will simply scroll to the top of the element, including the edge offset.

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
var duration = 500 // milliseconds
var offset = 200 // pixels
zenscroll.center(image2, duration, offset)
````

Note that a zero value for offset is ignored. You can work around this by using `zenscroll.toY()`.


### 6. Set the duration of the scroll

The default duration is 999 which is ~1 second. The duration is automatically reduced for elements that are very close. You can specifically set the duration for each scroll function via an optional second parameter. If you pass a value of zero then the scroll happends immediately, without smoothing.

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

````js
zenscroll.to(about, 0) // 0 milliseconds == no smoothing
````


### 7. Scroll inside a scrollable DIV

Anything you can do within the document you can also do inside a scrollable DIV or other element. You just need to instantiate a new scroller for that element. I will also fall back by default to the native browser smooth-scrolling if available (which can be overridden via `setup()`).

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

Note that the callback is immediately invoked if the native scroll-smoothing is enabled (see [above](#enablingnativesmooth-scrollinginthebrowser)).

If you look at the source code of the examples under [Scroll inside a scrollable DIV](#7.scrollinsideascrollablediv) they are actually implemented like this:

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
zenscroll.setup(777) // only updates defaultDuration to 777
````

Sets the the spacing between the edge of the screen (or a DIV) and the target element you are scrolling to, while leaving the default duration unchanged:

````js
zenscroll.setup(null, 42) // only updates edgeOffset to 42
````

The function always returns the current values in an object, so even if no parameters are passed you can obtain the current settings:

````js
var currentSettings = zenscroll.setup()
var dd = currentSettings.defaultDuration
var eo = currentSettings.edgeOffset
````



### 10. Additional functions

To check whether a scroll is being performed right now:

````js
var isScrolling = zenscroll.moving()
````

To stop the current scrolling:

````js
zenscroll.stop()
````

To get the current vertical scrolling position:

````js
var bodyY = zenscroll.getY()

var myDivY = myDivScroller.getY()
````

To get the top position of an element within the body or a scroller:

````js
var myElemY = zenscroll.getTopOf(myElem)

var relativeTopOfElem = myDivScroller.getTopOf(anElemInMyDiv)
````

Impotant: the returned value is without edge offset, and without recurcursively calculating nested scrollable containers.
