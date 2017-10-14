---
layout: post
title:  "Animating Origami"
image: "fib-origami.png"
excerpt: "Using Javascipt and SVGs to create origami inspired animations"
date:   2017-10-08
categories: ComSci Art
---
The code for this post can be found in *briannoyama.github.io/<wbr/>assets/res/* ([link][res]). 

When designing my website, I knew I wanted it to feel like a personal space where I could express myself creatively. I also wanted something cool and non-trivial, i.e. an excuse to play with Javascript. I settled on creating a theme whereby I would animate an abstract version of the first Origami I sold in an art shop:

<figure class="full">
  <img src="/assets/images/fib-origami.jpg" title="A shadow-fold Origami that encodes the Fibonacci sequence" alt="A shadow-fold Origami that encodes the Fibonacci sequence"/>
  <figcaption>
    A shadow-fold Origami that encodes the Fibonacci sequence as squares between triangular pleats.
  </figcaption>
</figure>
   
In the figure above, carefully placed pleats create shadows on a flat piece of paper to create an origami inspired by the Fibonacci sequence. I created the original design for the origami using CAD (Computer Aided Design) software which I then carefully folded onto a piece of hand painted paper I found at an art fair. For my website, I needed a slightly different version of the design. I chose to make a paper prototype: 

<figure class="full">
  <img src="/assets/images/origami-prototype.jpg" title="Pen and paper prototype for origami website animation" alt="Pen and paper prototype for origami website animation"/>
  <figcaption>
    A pen and paper prototype for the origami website animation.
  </figcaption>
</figure>

When planning any large project, whether in art, writing or programming, it helps to create a quick draft of what one plans to do. I decided to encode the pleats as polygons. After this, it next made sense to simulate the folding of the pleats by moving the points that defined them. In order to do so, each point needed a label (hence the numbers in the diagram above).

These numbers translated to offsets in an array:


<figure class="full">
{% highlight javascript %}
var mv_pnts = [[[-12, 5],[-12, 4]],
              [[5, 5],[5, 4]],
              [[-5, 5],[-4, 5]],
              [[-5, 5],[-6, 5]],
              ...
{% endhighlight %}
  <figcaption>
    polys_coors.js: Defining the beginning and end coordinates.
  </figcaption>
</figure>

The first "tuple" of numbers represented the starting point of the coordinate, while the second number represented the final destination of the coordinate. To make the coordinates slide from their beginning destination to the end, I used a counter `cnt` to keep track of the number of frames for an animation of length `max_cnt`.   


<figure class="full">
{% highlight javascript %}
var cnt = 0; ...
var max_cnt = 75.0; ...
function anim() {
  for (var i = 0; i < pnts_length; i++) {
    pnts[i][0] = ((max_cnt - cnt) * mv_pnts[i][0][0] + cnt * mv_pnts[i][1][0])/max_cnt;
    pnts[i][1] = ((max_cnt - cnt) * mv_pnts[i][0][1] + cnt * mv_pnts[i][1][1])/max_cnt;
  }

  for (var i = 0; i < poly_length; i++) {
    polys[i].setAttribute('points', poly_pnts[i].map(e => e[0] + ' ' + e[1]).join());
  }

  cnt += 1;
  if (cnt <= max_cnt){
    requestAnimationFrame(anim);
  }
}
{% endhighlight %}
  <figcaption>
    polygons.js: Animating the coordinates and pleats in the paper.
  </figcaption>
</figure>

Using the DOM (Document Object Model), one can then use the coordinates to update SVG (Scalable Vector Graphics) polygons in an animation loop. To see the final result, simply refresh this page and examine the upper left corner. I used a similar trick to animate many other parts of this site:

- `paths.js` animates the bars on the top and left sides of the page.
- `circlelinks.js` animates the circles to make a fun mouseover effect.
- `noyama_topics.js` animates squares with images to allow users to interact with topics.
- `pie_experience.js` animates the pie chart that I use show my work experience.
- `skill_bars.js` animates the bars that show my proficiency with different skills.

If one looks at the code in each of these, one will see some copy/paste code, which is admittedly *code smell*: code problems that do not prevent *current* functionality, but that may have nonfunctional flaws. Furthermore, there exists libraries, such as D3 ([link][d3]) that would have effectively abstracted a lot of the repeated pieces of code. I did take on this project to learn Javascript, and while I did pick up some jQuery ([link][jquery]), D3 felt a bit like a sledge-hammer.

Otherwise, I finally wrote my first blog post! Thanks for reading =).

[res]: https://github.com/briannoyama/briannoyama.github.io/tree/master/assets/res
[d3]: https://d3js.org/
[jquery]: https://jquery.com/
