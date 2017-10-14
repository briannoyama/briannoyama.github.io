---
layout: post
title:  "Updating the Webpage"
image: "website-update.png"
excerpt: "Lessons learned from Jquery, Sass, Jekyll (and Liquid)"
date:   2017-10-14
categories: ComSci Art
---

In April of 2017, I married and changed my last name. With the new last name,  "Noyama," my old domain name, www.briannakayama.com, no longer made sense. So I needed a new domain name, but then I thought, "If we need a new domain name, why don't we build a whole new website?" Though illogical, you can see the results of my name change in the new website you see here.

When I designed my old webpage, I wanted something that would work everywhere with minimal upkeep. This resulted in a website that was built like something straight out of the early 2000's structured using tables:

<figure class="full">
  <img src="/assets/images/website-version1.png" title="The first version of my website" alt="The first version of my website"/>
  <figcaption>
    The first version of my website.
  </figcaption>
</figure>


It was a *basic* website, utilitarian, good enough for the time being. For my next website, I wanted more of a challenge. I had a few requirements:

1. The site shall be driven by code/text. In other words, I did not want to have to click through a bunch of buttons to get things done (my experience with Content Management Systems (CMS) that are UI heavy like Word Press).
2. The site shall use Javascript and vector graphics (SVG). See my post on [Animating Origami]({% post_url 2017-10-08-javascript-origami %}).
3. The site shall use responsive design. 
4. The site shall support blogging.
5. The site shall require minimum time and money for upkeep (every programmer's dream for sure).

I decided to use Jekyll and Github pages purely out of a love for git. Unfortunately, to create the site I had in mind it took me close to 4 months to settle on the design and patterns shown here. Initially I attempted to make a site that looked very similar to the first using vector graphics:

<figure class="full">
  <img src="/assets/images/website-version2.png" title="The second version of my website" alt="The second version of my website"/>
  <figcaption>
    The second version of my website.
  </figcaption>
</figure>

As a prototype, making the second version helped me learn a few things.  *Lessons Learned #1: JQuery is not made for manipulating SVGs. Interact directly with the Document Object Model (DOM) instead*. *Lesson Learned #2: *SVGs made using Inkscape are harder to control programmatically, than ones made by hand (in a text editor)*.

Unfortunately, the design did not have much of a "wow factor", and I had a tough time envisioning any sort of animations for the SVG background, so I decided to start over. For the third design (the one the website currently uses) I made the mistake of focusing on the styles, backgrounds, and structure before learning more about Jekyll. *Lessons Learned #3: If creating a website using Jekyll, build off one of their templates.* For other CMS's, I would likely advise learning their patterns and organizations in code first in order to avoid refactoring your code later. 

After migrating my work, I found myself appreciating the file structure imposed by Jekyll. The overall structure of my website looks something like this:

- assets/
    - blog/ (blog post images)
    - data/ (JSON for my resume, topics, and other data)
    - images/ (other images)
    - res/ (all javascript used for animations, etc)
- _data (a symbolic link to assets/data)
- _posts (the blog posts)
- _includes (common code for each page)
- _layouts (different setups for different types of pages)
- _sass (the folder containing the SASS/CSS)
- _config.yml 
- _index.md (the initial web page)
- _resume.svg (my resume generated from Liquid/JSON)
- _resume.html (my interactive resume using JSON)

Along the way I ran into various issues, such as needing JSON in the `_data` folder for static elements, while needing the same JSON for my dynamic Javascript elements. *Lessons Learned #4: One can persist data in the generated _site folder by keeping a copy of it in assets. Fool Jekyll into using this data by making a symbolic link called `_data` pointing to `assets/data`*. Furthermore, I initially did not have the `_includes`, `_layouts` or `_sass` folders. *Lessons Learned #5: When setting up the folder structure and the theme for a website, one can use or another style for a reference. To find the location of the theme, run `bundle show minima`.*

Overall I am pleased with the results. If you decide to use Jekyll or SVGs for your own webpage, I hope the *Lessons Learned* above will help you. (Repeated here for convenience:)

1. JQuery is not made for manipulating SVGs. Interact directly with the Document Object Model (DOM) instead. 
2. SVGs made using Inkscape are harder to control programmatically, than ones made by hand (in a text editor).
3. If creating a website using Jekyll, build off one of their templates.
4. One can persist data in the generated _site folder by keeping a copy of it in assets. Fool Jekyll into using this data by making a symbolic link called `_data` pointing to `assets/data`.
5. When setting up the folder structure and the theme for a website, one can use or another style for a reference. To find the location of the theme, run `bundle show minima`.

