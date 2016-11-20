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

If this is set and the browser supports it, Zenscroll will use the browser’s built-in support for smooth-scrolling. However, note that if you use the native smooth-scrolling then you loose the finer control options that Zenscroll offers: the speed settings of the animation, and the edge offset for links within the page. Only set this CSS property on the `body` or on the elements if you don’t need this level of control.

### Disabling automatic smoothing on local links

If you want to use Zenscroll programmatically but you don’t need the automatic smoothing on local links then set `window.noZensmooth` to a non-falsy value. In this case the event handler for automatic smoothing is not installed but you can still use everything, like `zenscroll.intoView()`, etc. It’s important to set this value before Zenscroll is executed, otherwise the handler will be installed. So make sure that setting the variable comes before the loading of the script. For&nbsp;example:

````html
    ...
    <script>window.noZensmooth = true</script>
    <script src="zenscroll-min.js"></script>
</body>
````

(I consider this a rare scenario that’s why I keep the default behavior of installing the event handler.)
