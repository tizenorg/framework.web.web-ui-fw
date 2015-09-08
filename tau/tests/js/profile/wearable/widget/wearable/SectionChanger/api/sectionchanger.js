module("profile/wearable/widget/wearable/SectionChanger", {});

test("API" , function () {
	var widget;
	equal(typeof tau, 'object', 'Class tau exists');
	equal(typeof tau.widget, 'object', 'Class tau.widget exists');
	equal(typeof tau.widget.wearable, 'object', 'Class tau.widget.wearable exists');
	equal(typeof tau.widget.wearable.SectionChanger, 'function', 'Class tau.widget.wearable.SectionChanger exists');
	widget = new tau.widget.wearable.SectionChanger();

	equal(typeof widget.configure, 'function', 'Method SectionChanger.configure exists');
	equal(typeof widget._getCreateOptions, 'function', 'Method SectionChanger._getCreateOptions exists');
	equal(typeof widget.build, 'function', 'Method SectionChanger.build exists');
	equal(typeof widget.init, 'function', 'Method SectionChanger.init exists');
	equal(typeof widget.bindEvents, 'function', 'Method SectionChanger.bindEvents exists');
	equal(typeof widget.destroy, 'function', 'Method SectionChanger.destroy exists');
	equal(typeof widget.disable, 'function', 'Method SectionChanger.disable exists');
	equal(typeof widget.enable, 'function', 'Method SectionChanger.enable exists');
	equal(typeof widget.refresh, 'function', 'Method SectionChanger.refresh exists');
	equal(typeof widget.option, 'function', 'Method SectionChanger.option exists');


	equal(typeof widget.getActiveSectionIndex, 'function', 'Method SectionChanger.getActiveSectionIndex exists');
	equal(typeof widget.setActiveSection, 'function', 'Method SectionChanger.setActiveSection exists');
});