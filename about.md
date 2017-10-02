---
layout: page
title: About
permalink: /about/
---

## ...the Site
---

<script type="text/javascript" src="{{ "/assets/res/noyama_topics.js" | relative_url }}"></script>

<p class="first">As a recovering lurker, I have come to appreciate the thoughts and ideas that emerge from personal blogs and online communities. I love to read, and I hate to comment. Somehow I have avoided getting a Twitter account. As to where I inherited my aversion to sharing, I have no idea. But no one lives on an island, and no developer starts anything completely from scratch. We all rely on the internet and each other to build better and better things. I think blogs are *really* cool, and I know I have some cool things to share of my own. Thus, as part of my recovery, I dedicate this space as a smodge-podge of all things nerdy and interesting, in particular (you can click the images below):</p>

<figure class="full">
  <script type="text/javascript">
    load_here('/assets/data/topics.json', topics); 
  </script>
</figure>

<noscript>
{% for topic in site.data.topics %}
  <figure class="small">
    <img class="clipleft" src="{{ topic.url }}" title="{{ topic.title }}" alt="{{ topic.title }}"/>
    <figcaption>
      {{ topic.desc }}
    </figcaption>    
  </figure>
{% endfor %}
</noscript>


## ...the Author
---

Sometimes I sit at my terminal, and I ponder:

{% highlight bash %}
~$ whoami
brian
{% endhighlight %}



So simple! So profound! I have a master's in Computer Science, two bachelors' in Computer Science and Mathematics and a minor in Women's Studies. I graduated from Iowa State University in May of 2016 and Regis University in May of 2013. 

<figure class="large">
<img class="clipleft" src="/assets/images/briannoyama.jpg" title="One of my favorite memories at a Lantern Festival in South Korea" alt="One of my favorite memories at a Lantern Festival in South Korea"/>
</figure>

Currently I work as a software developer at Kingland Systems, where I use cognitive computing techniques to solve our data related problems. Within the past year or so I have applied Natural Language Processing, classifiers and bio-informatics algorithms in the cloud to scrape mutual fund prospectus data. 

I love new opportunities, whether they come in the form of research, hobbies or otherwise. Take it from a recovering lurker: feel free to contact me. I don't bite.
