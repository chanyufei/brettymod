---
layout: archive
---
<div id="main" class="inner">
	<section class="clearfix">
		<h2 class="post-title fadeInUp animated">Blog</h2>

		<ul>
			{% for post in site.posts %}
			<li>
			<span class="meta">{{ post.date | date_to_string }}</span>
			<a href="{{ post.url }}">
			<h3>{{ post.title }}</h3></a>
			<p>{{ post.description }}…<a href="{{ post.url }}">More</a></p>
			</li>
			{% endfor %}
		</ul>
	</section>
</div>