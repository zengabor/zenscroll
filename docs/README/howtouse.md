## How to use

### 1. Smooth scroll to an anchor on the same page

If Zenscroll is already added to your page it will automatically animate the scrolling within the page.

Since this is implemented a progressive enhancement, all internal links still work in very old browsers, like IE6, although the jump is not animated. Also note that internal links are intentionally not added to the history to save the users from having to hit the Back button too many times afterwards.

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
var isScrolling = zenscroll.isScrolling()
````

To stop the current smooth scroll operation:

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
  var cScroll = new Zenscroll(c, defaultDuration, edgeOffset)
  var target = document.getElementById("item4")
  cScroll.center(target)
</script>
````

Obviously you can use all other scroll methods and parameters with the scrollable container. Two examples:

````js
cScroll.toY(35)
````

````js
cScroll.intoView(target, 750)
````
