# jQuery Tagselect Plugin

A VERY simple (and so-far badly written) plugin which makes an ajax request to add dynamic elements to an html <select> element with a taggable interface.

This plugin takes its inspiration (and some css) from 
the [jQuery.TagsInput plugin] (https://github.com/xoxco/jQuery-Tags-Input), but it fills a gap where the original plugin doesn't work on <select> elements. It began as a heavy mofification of the jQuery.TagsInput plugin to fulfill a requirement for work and later the JS was rewritten from scratch to use in personal projects.

## Instructions

Add the js and css files then call the plugin as follows:

	$('.tagss').tagSelect({
	    add_tag_submit_url: 'your_url_handling_script'
	});

Your server side handling script needs to return a json-encoded object with the 'id' and 'text' fields, eg:

	{"id": "15", "text": "tagselect"}
