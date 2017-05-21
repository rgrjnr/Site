


// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'MOT<br>ION<br>&nbspGRAP<br>&nbsp&nbsp&nbsp&nbspH<br>&nbsp&nbsp&nbsp&nbspICS',
  'WEBDESIGN',
  'BRANDING',
  'just as I did',
  'that there\'s a difference',
  'between knowing the path',
  'and walking the path'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 5000)
  })
  counter = (counter + 1) % phrases.length
}

next()
















   /*!
 * mgGlitch : little jquery helper to glitch everything
 * (c) 2016 Hadrien Mongouachon
 * MIT Licensed.
 *
 * Author URI: http://hmongouachon.com
 * Plugin URI: http://hmongouachon.com
 * Date : 06/2016
 * Version: 1.0.0
 */

$( ".portfolio-item" ).hover(
  function() {
    $( this ).addClass( "glitch-img" );
  }, function() {
    $( this ).removeClass( "glitch-img" );
  }
);


!function(t,s,e,i){"use strict";function n(s,e){this.element=s,this.settings=t.extend({},r,e),this._defaults=r,this._name=a,this.init()}var a="mgGlitch",r={destroy:!1,glitch:!0,scale:!0,blend:!0,blendModeType:"hue",glitch1TimeMin:600,glitch1TimeMax:900,glitch2TimeMin:10,glitch2TimeMax:115,zIndexStart:5};t.extend(n.prototype,{init:function(){this.glitch()},glitch:function(){function s(t,s){return Math.floor(Math.random()*(s-t+1))+t}function e(){var i=s(10,1900),n=9999,r=s(10,1300),o=0,h=s(0,16),f=s(0,16),d=s(c,l);t(a).css({clip:"rect("+i+"px, "+n+"px, "+r+"px,"+o+"px)",right:f,left:h}),setTimeout(e,d)}function i(){var e=s(10,1900),n=9999,c=s(10,1300),l=0,f=s(0,40),d=s(0,40),x=s(o,h);if(r===!0)var g=(Math.random()*(1.1-.9)+.9).toFixed(2);else if(r===!1)var g=1;t(a).next().css({clip:"rect("+e+"px, "+n+"px, "+c+"px,"+l+"px)",left:f,right:d,"-webkit-transform":"scale("+g+")","-ms-transform":"scale("+g+")",transform:"scale("+g+")"}),setTimeout(i,x)}function n(){var e=s(10,1900),i=9999,c=s(10,1300),l=0,f=s(0,40),d=s(0,40),x=s(o,h);if(r===!0)var g=(Math.random()*(1.1-.9)+.9).toFixed(2);else if(r===!1)var g=1;t(a).next().next().css({clip:"rect("+e+"px, "+i+"px, "+c+"px,"+l+"px)",left:f,right:d,"-webkit-transform":"scale("+g+")","-ms-transform":"scale("+g+")",transform:"scale("+g+")"}),setTimeout(n,x)}var a=this.element,r=this.settings.scale,c=this.settings.glitch1TimeMin,l=this.settings.glitch1TimeMax,o=this.settings.glitch2TimeMin,h=this.settings.glitch2TimeMax,f=this.settings.zIndexStart;if(this.settings.destroy===!0)(t(a).hasClass("el-front-1")||t(a).hasClass("front-3")||t(a).hasClass("back"))&&t(".front-1, .front-3, back").remove();else if(this.settings.destroy===!1){var d=t(a).clone();if(d.insertBefore(a).addClass("back").css({"z-index":f}),this.settings.blend===!0){var d=t(a).clone();d.insertAfter(a).addClass("front-3").css({"z-index":f+3,"mix-blend-mode":this.settings.blendModeType}),n()}if(this.settings.glitch===!0){var d=t(a).clone();d.insertAfter(a).addClass("front-2").css({"z-index":f+2}),t(".back").next().addClass("front-1").css({"z-index":f+1}),e(),i()}}}}),t.fn[a]=function(s){return this.each(function(){t.data(this,"plugin_"+a)||t.data(this,"plugin_"+a,new n(this,s))})}}(jQuery,window,document);












// ——————————————————————————————————————————————————
// Scroll to anchor point
// ——————————————————————————————————————————————————

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
       // window.location.hash = hash;
      });
    } // End if
  });
});