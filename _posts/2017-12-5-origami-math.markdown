---
layout: post
title:  "Mathematical Origami"
image: "math-origami.png"
excerpt: "Different types of Mathematical Origami"
date:   2017-12-5
categories: Math Art
---

<script type="text/javascript" src="{{ "/assets/res/noyama_topics.js" | relative_url }}"></script>

Some may reason that math and art represent [non-overlapping magisteria](https://en.wikipedia.org/wiki/Rocks_of_Ages), but I believe that a lot of art has a lot to say about mathematics and vice versa. *Origami*, the art of paper folding, intrinsically requires several mathematical techniques. For example, one might want to calculate how a piece of paper will behave when two *pleats*, parallel overlapping folds of paper, intersect. Below are some examples of the following mathematical origami techniques:

- **Shadow Folds:** A technique that generally uses vector addition to create patterned pleats visible when holding up the piece of paper in front of a light... More on this below!
- **Recursive Folds:** A technique that repeatedly folds a fraction of the remaining paper to create intricate details. It works like a convergent series or like crossing a street by traveling only half he remaining distance([Zeno's paradox](https://en.wikipedia.org/wiki/Zeno%27s_paradoxes)).
- **Modular Origami:** A technique that uses several pieces of identically folded paper to build up a larger module by connecting specialy designed interfaces. This technique is commonly used to create 3D polyhedrons.
- **Origami Tesslations:** A technique that uses similarly interfacing pleats to create self repeating patterns in a single piece of paper.
- **Radial Symmetric Fold:** A technique often used for creating flowers that chooses a self repeating pattern around a central axis.

Click the examples below to get a closer look at the different techniques. You can also hover over an image to learn more about it.

<figure class="full">
  <script type="text/javascript">
    load_here('/assets/data/origami.json', topics); 
  </script>
</figure>

<noscript>
{% for topic in site.data.origami %}
  <figure class="small">
    <img class="clipleft" src="{{ topic.url }}" title="{{ topic.title }}" alt="{{ topic.title }}"/>
    <figcaption>
      {{ topic.desc }}
    </figcaption>
  </figure>
{% endfor %}
</noscript>

Each of the techniques defined above could easily have its own blog post (or book for that matter), but the technique that inspires me the most is *Shadow Folds*. Coined by the mathematician [Chris Palmer](http://shadowfolds.com/), Shadow Folds use *pleats* --parallel overlapping mountain and valley folds-- to create shadows in a piece of paper when one holds it up against a light source. While a single pleat is simple to understand, when one adds multiple pleats, a single piece of paper gains a sense of holistic complexity. For example, examine the schematic for a tree below:

<figure class="large-center">
  <img src="/assets/images/tree-small.png" title="A schematic for an Origami tree folded using Shadow Folds" alt="A schematic for an Origami tree folded using Shadow Folds"/>
  <figcaption>
    A schematic for an Origami tree folded using Shadow Folds. (You can print this out, and attempt to fold it if you like.)
  </figcaption>
</figure>

The black lines represent mountain folds (folds that make the paper move away from you), while the green lines represent valley folds (folds that make the paper move towards you). When combining two intersecting pleats into one, the intersecting pleats act like vectors. To get the angle and width of the output pleat, one just needs to separate the x- and y-components of the input pleats, and then add them together. The output pleat's width will be equal to the width of the resulting vector. The figure below demonstrates an example of this.

<figure class="large-center">
  <img src="/assets/images/tree-angles.png" title="The collision of two pleats into a third" alt="The collision of two pleats into a third"/>
  <figcaption>
    The collision of two pleats into a third.
  </figcaption>
</figure>

Hopefully you paid attention in your Geometry and Introduction to Physics classes!


