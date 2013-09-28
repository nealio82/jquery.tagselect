# jQuery Tagselect Plugin

A VERY simple (and so-far badly written) plugin which makes an ajax request to add dynamic elements to an html <select> element with a taggable interface.

This plugin takes its inspiration (and some css) from 
the [jQuery.TagsInput plugin] (https://github.com/xoxco/jQuery-Tags-Input), but it fills a gap where the original plugin doesn't work on <select> elements. It began as a heavy mofification of the jQuery.TagsInput plugin to fulfill a requirement for work and later the JS was rewritten from scratch to use in personal projects.

Created by [Nealio82] (http://www.nealio.co.uk)

## Instructions

Add the js and css files then call the plugin as follows:

	$('.tags').tagSelect({
	    add_tag_submit_url: 'your_handling_script_url'
	});

Any options in your select element which have a 'selected="selected"' attribute will be converted to tags on page load.

	<select class="tags">
	    <option value="1" selected="selected">This is a tag</option>
	    <option value="2" selected="selected">Another tag</option>
	    <option value="3">This option won't create a tag</option>
	    <option value="4">Neither will this</option>
	    <option value="5" selected="selected">JS</option>
	</select>

Your server side handling script needs to return a json-encoded object with the 'id' and 'text' fields, eg:

	{"id": "15", "text": "tagselect"}


