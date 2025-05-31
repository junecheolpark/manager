/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.toolbar = [
		{ name: 'document', items: ['Preview'] },
		//{ name: 'styles', items: ['FontSize'] },
		{ name: 'colors', items: ['TextColor', 'BGColor'] },
		{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
		//{ name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight'] },
		{ name: 'links', items: ['Link', 'Unlink'] },
		{ name: 'insert', items: ['Table', 'HorizontalRule', 'SpecialChar'] },
	];
	config.enterMode = CKEDITOR.ENTER_BR;
	config.shiftEnterMode = CKEDITOR.ENTER_P;
	config.removePlugins = 'exportpdf';
};
