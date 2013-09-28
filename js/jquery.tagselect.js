(function($) {
    $.fn.tagSelect = function(options) {



        var selector = this.selector;

        $(selector).each(function() {

        var index = $(selector).index($(this)) + 1;
        var id = 'tagselect_' + selector.replace(/[\#\.]/gi, '') + '_' + index;

            var settings = $.extend({
                add_tag_submit_url: "",
                add_tag_value_field: "id",
                add_tag_text_field: "text",
                add_tag_method: "POST",
                element_id: id,
                element_index: index
            }, options);

            var el = $(this).hide();

            var tags = new TagsList(settings);
            tags.el = el;
            tags.index = index;

            $(this).children('option').each(function() {
                if ($(this).attr('selected') === 'selected') {
                    tags.addTag($(this).attr('value'), $(this).text());
                }
            });

            $(el).empty();


            var div = '<div class="tagselect-container" id="'+tags.fake_input_id+'_container">';
            $(this).parent().append(div + tags.getTagsListElement() + '</div>');

            $(el).append(tags.getTagsOptionElements());

            tags.bindClicks();
            tags.bindKeypress();

        });

    };

    function TagsList(settings) {
        this.tags = [];
        this.fake_input_id = 'tagselect_' + settings.element_id + '_tag';
        this.settings = settings;
    }

    TagsList.prototype.bindKeypress = function() {

        var tags = this;

        $('#' + this.fake_input_id).bind('keypress', tags, function(event) {
            if (event.keyCode == 13 || event.charCode == 44) {
                /*
                 * Handle 'enter' or 'comma' button
                 */
                event.preventDefault();

                $.ajax(
                        {
                            url: tags.settings.add_tag_submit_url + '/' + $(this).val(),
                            dataType: "json"
                        }
                ).done(function(response) {
                    tags.addTag(response.id, response.text);
                    $(this).val(null);
                    $(tags.el).empty().append(tags.getTagsOptionElements());
                    $('#'+tags.fake_input_id+'_container').empty().append(tags.getTagsListElement());
                    $('#'+tags.fake_input_id+'_container').find('input').focus();
                    tags.bindClicks();
                    tags.bindKeypress();

                });



            } else if (event.keyCode == 8) {
                /*
                 * Handle backspace key
                 */
                if ($('.tagselect-container').find('input').val().length == 0) {
                    var tag = tags.tags[tags.tags.length - 1];
                    tags.removeTag(tag.getValue());
                }
            }
        });
    };

    TagsList.prototype.bindClicks = function() {

        var tags = this.tags;
        var settings = this.settings;

        for (var i = 0; i < this.tags.length; i++) {

            $('#tagselect-' + settings.element_index + '-remove-' + this.tags[i].getValue()).bind('click', false, function() {
                var id = $(this).attr('id');
                id = id.replace('tagselect-' + settings.element_index + '-remove-', '');

                for (var j = 0; j < tags.length; j++) {
                    if (tags[j].getValue() == id) {
                        $('#tagselect-' + settings.element_index + '-option-' + tags[j].getValue() + ', #tagselect-' + settings.element_index + '-' + tags[j].getValue()).remove();
                        tags.splice(j, 1);
                    }
                }
                return false;
            });
        }
    };

    TagsList.prototype.getTags = function() {
        return this.tags;
    };

    TagsList.prototype.addTag = function(value, text) {
        this.tags[this.tags.length] = new Tag(value, text);
    };

    TagsList.prototype.removeTag = function(value) {

        for (var i = 0; i < this.tags.length; i++) {
            if (this.tags[i].getValue() === value) {
                this.tags.splice(i, 1);
            }
        }

        $('#tagselect-' + this.settings.element_index + '-option-' + value + ', #tagselect-' + this.settings.element_index + '-' + value).remove();
    };

    TagsList.prototype.getTagsListElement = function() {
        var el = '<div class="tagselect">';
        for (var i = 0; i < this.tags.length; i++) {
            el += '<span class="tag" id="tagselect-' + this.settings.element_index + '-option-' + this.tags[i].getValue() + '">';
            el += '<span>' + this.tags[i].getText() + ' </span>';
            el += '<a href="#" id="tagselect-' + this.settings.element_index + '-remove-' + this.tags[i].getValue() + '">x</a>';
            el += '</span>';
        }

        el += '<div id="tagselect_' + this.settings.element_index + '_' + this.id + '_addTag">';
        el += '<input id="' + this.fake_input_id + '" data-default="Add Keyword" placeholder="Add keyword" style="color: rgb(102, 102, 102); width: 100px;">';
        el += '</div>';

        el += '</div>';
        return el;
    };

    TagsList.prototype.getTagsOptionElements = function() {
        var el = '';
        for (var i = 0; i < this.tags.length; i++) {
            el += '<option class="tagselect-tag" selected="selected" ';
            el += 'id="tagselect-' + this.settings.element_index + '-' + this.tags[i].getValue() + '" ';
            el += 'value="' + this.tags[i].getValue() + '">';
            el += this.tags[i].getText();
            el += '</option>';
        }
        return el;
    };

    function Tag(value, text) {
        this.value = value;
        this.text = text;
    }

    Tag.prototype.getValue = function() {
        return this.value;
    };

    Tag.prototype.getText = function() {
        return this.text;
    };


}(jQuery));