var selectors = ej.util.selectors;

module("core/util/selectors");

test("ej.util.selectors - check the existence of objects/functions", function () {
	equal(typeof ej, "object", "ej exists");
	equal(typeof ej.util, "object", "ej.util exists");
	equal(typeof ej.util.selectors, "object", "ej.util.selectors exists");
	equal(typeof selectors.matchesSelector, "function", "function set");
	equal(typeof selectors.getChildrenBySelector, "function", "function set");
	equal(typeof selectors.getChildrenByClass, "function", "function get");
	equal(typeof selectors.getChildrenByTag, "function", "function remove");
	equal(typeof selectors.getParents, "function", "function set");
	equal(typeof selectors.getParentsBySelector, "function", "function get");
	equal(typeof selectors.getParentsByClass, "function", "function remove");
	equal(typeof selectors.getParentsByTag, "function", "function set");
	equal(typeof selectors.getClosestBySelector, "function", "function get");
	equal(typeof selectors.getClosestByClass, "function", "function remove");
	equal(typeof selectors.getClosestByTag, "function", "function remove");
	equal(typeof selectors.getChildrenByDataNS, "function", "function get");
	equal(typeof selectors.getParentsBySelectorNS, "function", "function get");
	equal(typeof selectors.getClosestBySelectorNS, "function", "function get");
	equal(typeof selectors.getAllByDataNS, "function", "function get");
});
