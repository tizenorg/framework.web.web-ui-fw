/*jslint browser: true, white: true */
/*global $, window */

(function(window, $) {
	'use strict';

	var cssClasses = {
		themeEditor: 'themeEditor',
		categoryPanel: 'category-panel',
		labelName: 'label-name',
		labelSelected: 'label-name-selected'
	},
	ThemeEditor = function() {
		/**
		 * Configuration of Theme Editor
		 */
		this.config = {
			/**
			 * Configuration of properties/variables that can be changed by editor
			 */
			themeProperties: {},
			/**
			 * URL to preview page - used by badge
			 */
			previewUrl: 'resources/preview.html',
			/**
			 * workspace {HTMLElement} workspace container
			 */
			workspace: null,
			/**
			 * cssVariablePanel {HTMLElement} left panel container
			 */
			cssVariablePanel: null,
			/**
			 * root {string} Root path of Theme Editor
			 */
			root: '',
			/**
			 * themeRoot {string} Root path theme less files
			 */
			themeRoot: ''
		};

		/**
		 * Holds all css variables that could by changed
		 */
		this.cssVariables = {};

		// Imports
		this.badgePreview = {}; //themeEditor.badgePreview.js
		return this;
	};

	function prepareWidgetText(defaultValue) {
		var widget = document.getElementById('widgetText');
		widget.value = defaultValue;
	}

	function prepareWidgetColorPicker(self, defaultValue) {
		var colorPicker;

		colorPicker = new self.ColorPicker(document.getElementById('panelColorpicker'));
		colorPicker.setColor(defaultValue);
	}

	function prepareWidgetSlider(defaultValue, rangeMin, rangeMax, rangeUnit) {
		var widget = document.getElementById('widgetSlider'),
			parent = widget.parentNode,
			sliderValue;

		sliderValue = (parseInt(defaultValue, 10) - rangeMin) * 100 / (rangeMax - rangeMin);

		widget.setAttribute('data-min', rangeMin);
		widget.setAttribute('data-max', rangeMax);
		widget.setAttribute('data-unit', rangeUnit);

		parent.querySelector('.range-min').innerHTML = rangeMin;
		parent.querySelector('.range-max').innerHTML = rangeMax;
		parent.querySelector('.range-current').innerHTML = defaultValue + rangeUnit;

		widget.value = sliderValue;
	}

	// TODO: rebuild choosing css variable
	function setCssVariable(self, event) {
		var element = event.currentTarget,
			cssVarName = element.getAttribute('data-css'),
			themeProperties = self.config.themeProperties,
			categoryProperties,
			categoryKey,
			label,
			labelKey;

		$('.' + cssClasses.labelSelected).removeClass(cssClasses.labelSelected).addClass(cssClasses.labelName);
		element.className = cssClasses.labelSelected;

		if (event.detail.historyAction !== true) {
			self.badgePreview.saveHistory(self.badgePreview.currentCssVar);
		}
		self.parseWidget(self.cssVariables[cssVarName], cssVarName);
		self.badgePreview.currentCssVar = cssVarName;
		// TODO: do it more efficient
		// Search for all categories
		for (categoryKey in themeProperties) {
			if (themeProperties.hasOwnProperty(categoryKey)) {
				categoryProperties = themeProperties[categoryKey];
				// Search for all labels
				for (labelKey in categoryProperties) {
					if (categoryProperties.hasOwnProperty(labelKey)) {
						label = categoryProperties[labelKey];
						if (label.lessVar === cssVarName) {
							$('.panel-window').removeClass('hidden');
							if (label.widget.type === 'slider') {
								$('#panelColorpicker').closest('.panel-window').addClass('hidden');
							}
							if (label.widget.type === 'color') {
								$('#widgetSlider').closest('.panel-window').addClass('hidden');
							}
							if (label.widget.type === 'text') {
								$('#widgetSlider').closest('.panel-window').addClass('hidden');
								$('#panelColorpicker').closest('.panel-window').addClass('hidden');
							}
						}
					}
				}
			}
		}
	}


	ThemeEditor.prototype.resolvePath = function (rootPath, queryPath) {
		var rootPieces,
			queryPieces,
			path = [],
			relative,
			queryPathMatch,
			rootPathMatch,
			i;

		// Check if queryPath is relative or absolute path
		relative = !(/^[a-z]+:\/\//.test(queryPath));

		rootPieces = rootPath.split('/');
		queryPieces = queryPath.split('/');

		rootPathMatch = rootPath.match(/https?:\/\/[^\/]+/);
		queryPathMatch = queryPath.match(/https?:\/\/[^\/]+/);

		// Check if paths are in the same domain
		if (relative !== true && rootPathMatch && queryPathMatch && rootPathMatch[0] !== queryPathMatch[0]) {
			return queryPath;
		}

		// Omit last element (file name)
		rootPieces.pop();

		if (relative) {
			for (i = 0; i < queryPieces.length; i += 1) {
				if (queryPieces[i] === '..') {
					// Go back
					rootPieces.pop();
					// Remove first element
					queryPieces.shift();
					i -= 1;
				}
			}
			return rootPieces.join('/') + '/' + queryPieces.join('/');
		}

		// Find common pieces
		for (i = 0; i < rootPieces.length; i += 1) {
			if (rootPieces[i] !== queryPieces[i]) {
				if (rootPieces[i] === '..') {
					path.pop();
				} else {
					path.push('..');
				}
			}
		}
		return path.concat(queryPieces.splice(i - path.length)).join('/');
	};

	ThemeEditor.prototype.parseWidget = function(widgetParams, cssVarName) {
		var widgetType = widgetParams.type.toLowerCase(),
			widgetDefault,
			modifiedVariables = this.badgePreview.getActive().modifiedVariables;

		widgetDefault = modifiedVariables[cssVarName] || widgetParams.default;
		switch (widgetType) {
			case 'text':
				prepareWidgetText(widgetDefault);
				break;

			case 'slider':
				prepareWidgetSlider(widgetDefault, widgetParams.min, widgetParams.max, widgetParams.unit);
				break;

			case 'color':
				prepareWidgetColorPicker(this, widgetDefault);
				break;

			default:
				console.warn('Unrecognized widget: ' + widgetType);
		}
		$('#widgetText').val(widgetDefault);
	};


	/**
	 * Add variable item to panel
	 * @param {type} container
	 * @param {type} labelTitle
	 * @param {type} members
	 */
	ThemeEditor.prototype.addLabel = function(container, labelTitle, members) {
		var label = document.createElement('a'),
			classes = cssClasses,
			lessVar = members.lessVar;

		label.className = classes.labelName;
		label.innerHTML = labelTitle;
		label.setAttribute('data-css', lessVar);
		label.setAttribute('title', lessVar);
		container.appendChild(label);


		$(label).tooltip();
		$(label).tooltip('option', 'content', 'Less variable: <b>' + lessVar + '</b>' +
				'<br>Default Value: <b>' + members.widget.default + '</b>');

		label.addEventListener('click', setCssVariable.bind(null, this), false);
		this.cssVariables[lessVar] = members.widget;
	};

	ThemeEditor.prototype.addCategoryItem = function(panel, title, members) {
		var panelTitle = document.createElement('h3'),
				panelContent = document.createElement('div'),
				labelName;

		panelTitle.innerHTML = title;

		for (labelName in members) {
			if (members.hasOwnProperty(labelName)) {
				this.addLabel(panelContent, labelName, members[labelName]);
			}
		}

		panel.appendChild(panelTitle);
		panel.appendChild(panelContent);
	};

	/**
	 * Build left column
	 * @method buildVariablePanel
	 */
	ThemeEditor.prototype.buildVariablePanel = function() {
		var themeProperties = this.config.themeProperties,
				classes = cssClasses,
				categoryName,
				container = this.config.cssVariablePanel,
				leftColumn = document.createDocumentFragment(),
				categoryPanel = document.createElement('div');

		categoryPanel.className = classes.categoryPanel;

		for (categoryName in themeProperties) {
			if (themeProperties.hasOwnProperty(categoryName)) {
				this.addCategoryItem(categoryPanel, categoryName, themeProperties[categoryName]);
			}
		}

		leftColumn.appendChild(categoryPanel);

		// Finally add all pannels to container
		container.classList.add(classes.themeEditor);
		container.appendChild(leftColumn);

		//Enhance by UI Widgets
		$(categoryPanel).accordion();
	};

	/**
	 * Shows an alert
	 * @method alert
	 * @param {string} message
	 */
	ThemeEditor.prototype.alert = function(message) {
		// TODO: do it more cool
		window.alert(message);
	};

	/**
	 * Builds widgets
	 */
	ThemeEditor.prototype.buildWidgets = function() {
		var widgetText = document.getElementById('widgetText'),
			widgetSlider = document.getElementById('widgetSlider');
		// Build Color Picker
		$('#panelColorpicker').ColorPicker({
			flat: true,
			onChange: this.badgePreview.changeColor.bind(this.badgePreview)
		});

		if (widgetText) {
			widgetText.addEventListener('change', this.badgePreview.changeText.bind(this.badgePreview), false);
		}

		if (widgetSlider) {
			widgetSlider.addEventListener('change', this.badgePreview.changeSlider.bind(this.badgePreview), false);
		}
	};

	/**
	 * Initialize theme editor.
	 * @method init
	 * @param {Object} themeProperties
	 */
	ThemeEditor.prototype.init = function(themeProperties) {
		var config = this.config;

		config.root = window.location.href.replace(/[^\/]+\.html?$/, '');
		config.themeRoot = this.resolvePath(config.root, '../../standalone/src/css/themes/black/');
		config.themeProperties = themeProperties;
		config.cssVariablePanel = document.getElementById('leftPanel');
		config.workspace = document.getElementById('workspace');
		config.previewUrl = document.getElementById('themeSelect').value;

		this.buildVariablePanel();
		this.buildWidgets();
		this.badgePreview.init();
	};

	window.themeEditor = new ThemeEditor();
}(window, $));