---
layout: post
title:  "Docker for Game Development"
image: "container-dev.png"
excerpt: "Setting up a development environment in a container with graphics"
date:   2017-10-24
categories: ComSci Games
---

The code for this post exists in the repository [here](https://github.com/briannoyama/py_env).

If you have not heard of containers, then follow this tutorial! Containers make deploying and running code in different environments *easy*. For a very high-level explanation of containers, you can read [this](http://blog.kingland.com/how-kingland-uses-containers-to-pass-savings-to-clients) blog post I wrote for Kingland Systems. Essentially containers are isolated user spaces that, like a virtual machine, keeps environments separate. Unlike a virtual machine, containers have a very small memory footprint (i.e. RAM and diskspace), and they start up and run relatively fast.

The most popular container engine right now is [Docker](https://www.docker.com/). Docker defines containers as a running instance of an image. One can build their image using a `Dockerfile`. The Dockerfile builds images one layer at a time using commands such as `FROM`, `RUN` or `COPY`. To build a Dockerfile, run `docker built -t <tag> <directory>`. The directory you specify will become the *build context* for your image. Docker will look inside of your build context for a plain text file named `Dockerfile` containing commands such as the beginning of the one below: 

{% highlight docker %}
FROM ubuntu
MAINTAINER github/briannoyama

RUN  apt-get update                                                          &&\ 
     apt-get install -y --no-install-recommends apt-utils

#Install opengl
COPY keyboard /etc/default/keyboard
RUN  apt-get install -y --no-install-recommends mesa-utils                     \
                                                xserver-xorg-video-all         \ 
                                                libsdl2-dev                    \
                                                gcc
{% endhighlight %}

The `FROM` command pulls in a base image from which we will derive additional layers. Each `RUN` layer runs a single command (or multiple if you chain them with `&&`), similar to how you would run a command via bash. The `COPY` command copies files from the build context of the Dockerfile into the image. Here, I've created an image for a container that has everything I need to develop a game using SDL2 and C. Now, lets say that I want to use Cython instead of C. Below, I set up Python, Cython, and Vim for an IDE.

{% highlight docker %}
RUN  apt-get install -y --no-install-recommends vim curl git
RUN  mkdir -p ~/.vim/colors ~/.vim/autoload ~/.vim/bundle ~/.vim/ftplugin    &&\
     curl -o ~/.vim/colors/seoul256.vim https://raw.githubusercontent.com/junegunn/seoul256.vim/master/colors/seoul256.vim &&\
     curl -o ~/.vim/autoload/pathogen.vim https://raw.githubusercontent.com/tpope/vim-pathogen/master/autoload/pathogen.vim &&\
     curl -o ~/.vim/ftplugin/python_editing.vim http://www.vim.org/scripts/download_script.php?src_id=5492 &&\
     cd ~/.vim/bundle                                                        &&\
     git clone --depth=1 https://github.com/Lokaltog/vim-powerline.git       &&\
     rm -R vim-powerline/.git                                                &&\
     git clone --recursive --depth=1 git://github.com/davidhalter/jedi-vim.git &&\
     rm -R jedi-vim/.git

COPY .vimrc /root/.vimrc

#Get other development related software
RUN apt-get install -y --no-install-recommends tmux

COPY entry.sh /usr/local/bin/entry.sh
ENTRYPOINT ["entry.sh"]
{% endhighlight %}

For the Vim setup I used [this](https://github.com/mbrochh/vim-as-a-python-ide/blob/master/.vimrc) tutorial as a starting point. At this point, it may seem like Docker requires a lot of domain knowledge to create an image from scratch. In my experience it takes a very small amount of additional effort to define a Docker image as opposed to installing something natively on your host machine. Defining your own Dockerfile also naturally documents the exact way that one can set up their environment to build or run your software. As an additional benefit, if one needs to uninstall or otherwise change their Docker image all they need to do is change their Dockerfile. When building the image, Docker will only download or install new layers that occur after a change you want to make. 

For those who have experience with Docker, one might reasonably assume that you cannot run containers with graphics. However, on Ubuntu (and other Linux distributions I suspect), one can easily interface with the graphics of the host machine by mounting a volume. Below is the bash script I use for starting up my container. It takes as an argument the directory containing code I wish to develop.

{% highlight bash %}
#!/bin/bash
xhost + # allow connections to X server
sudo docker run --privileged                            \
                -e "DISPLAY=unix:0.0"                   \
                -v "/tmp/.X11-unix:/tmp/.X11-unix:rw"   \
                -v "`pwd`/$1:/mnt/$1"                   \
                -it --rm py_env                         \
                $1
{% endhighlight %}

To learn more about using the host's display, look at [this](https://github.com/gklingler/docker3d) repository. I also set up a simple entry script to change the directory (inside of the running container) to the one I want containing the code I'm working on:

{% highlight bash %}
#!/bin/sh

cd /mnt/$1
/bin/bash
{% endhighlight %}

If you like my dev environment, feel free to pull it and try it out for yourself. I will likely maintain it for a while as I plan to use it to create a small, simple game engine. Thanks for reading!
