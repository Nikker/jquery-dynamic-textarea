if (typeof jQuery === 'undefined') {
	throw 'jQuery is required to use the Dynamic Textarea jQuery extension';
}

// The event 'dynamic-textarea:render' can (and should) be triggered on rendering of hidden textareas when they are displayed
jQuery(function($) {
	$.fn.dynamicTextarea = function(userOptions) {
		if (typeof userOptions != 'object') {
			userOptions = {};
		}

		var defaults = {
			'line-height': '20px' // Must be in pixels
		};

		var options = $.extend(defaults, userOptions);

		function getLineHeight(textarea) {
			var lineHeight = 
				userOptions['line-height'] || 
				$(textarea).css('line-height') || 
				options['line-height'];
			var h = parseLineHeight(lineHeight);

			if (h.unit != 'px' || !h.val) {
				h = parseLineHeight(options['line-height']);
			}

			if (h.unit != 'px' || !h.val) {
				h = parseLineHeight(defaults['line-height']);
			}

			return h;
		}

		function parseLineHeight(lineHeight) {
			var match = /(\d+)\s*(\w+)/.exec(lineHeight);
			var ret = {
				val: parseInt(match[1]),
				unit: match[2]
			};

			return ret;
		}

		function setTextareaHeight(textarea, enter) {
			if (typeof enter == 'undefined') enter = 0;
			var oldMinHeight = $(textarea).css('min-height');

			$(textarea).css('height', '1px');
			$(textarea).css('min-height', '');
			var scrollHeight = $(textarea).prop('scrollHeight');
			$(textarea).css('height', '');
			$(textarea).css('min-height', oldMinHeight);

			var offset = enter? $(textarea).data('dynamic-textarea-line-height') : 0;

			var maxHeight = $(textarea).data('dynamic-textarea-max-height');
			var minHeight = Math.min(scrollHeight + offset, maxHeight);

			$(textarea).css({'min-height': (minHeight + 2) + 'px'});
		}

		// Only apply to textareas
		if (!this.is('textarea')) {
			return this;
		}

		this.on('dynamic-textarea:render', function() {
			var h = getLineHeight(this);

			$(this).data('dynamic-textarea-max-height', options['max-height'] || 20 * h.val);
			$(this).data('dynamic-textarea-line-height', h.val);
			$(this).css('resize', 'none');
		}).on('dynamic-textarea:resize dynamic-textarea:init change window.resize', function() {
			setTextareaHeight(this);
		}).on('keydown', function(e) {
			var offset = $(this).data('dynamic-textarea-line-height');
			var textarea = $(this);

			// If entering a space, immediately put a new line
			if (e.type == 'keydown' && e.keyCode == 13) {
				setTextareaHeight(textarea, true);
			}

			// Timeout to wait until the character is actually entered
			setTimeout(function() {setTextareaHeight(textarea);}, 1);
		}).trigger('dynamic-textarea:render');

		return this;
	};
});
