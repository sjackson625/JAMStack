---
layout: layout.html
pageTitle: Apples
navTitle: Pictures
singleImage: /img/apples.png
images:
  - apples.png
  - apples-red.png
  - apples-group.png
pageClass: pictures
tags: pages
---
## Markdown, single image:

![alt info goes here]( {{ singleImage }})

## HTML, single image:

<img src="{{ singleImage }}" alt="info goes here" style="transform: scale(50%) rotate(20deg);" />

## Markdown in Liquid for loop:

{% for filename in images %}
![alt info goes here](/img/{{ filename }})
{% endfor %}

## HTML in Liquid for loop:

{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." />
{% endfor %}