/*global window, define, setTimeout, ns, clearTimeout, XMLHttpRequest, location */
/*jslint nomen: true */
/*
* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Mobile Router for External
 * Class is responsible for change pages in applications when pages
 * are in external files.
 * @class ns.router.PageExternal
 * @override ns.router.Page
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>>
 * @author Piotr Kusztal <p.kusztal@samsung.com>
 * @author Hyunkook Cho <hk0713.cho@samsung.com>
 * @author Junhyeon Lee <juneh.lee@samsung.com>
 */
(function (document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../../../core/engine",
			"../../../core/router", // fetch namespace
			"./Page",
			"../widget/mobile/Page",
			"../widget/mobile/Loader",
			"../../../core/util",
			"../../../core/event",
			"../../../core/util/DOM/attributes",
			"../../../core/util/selectors",
			"../../../core/util/deferred",
			"../../../core/util/path",
			"../../../core/util/object"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
			var HIDE_PAGE_LOADING_TIMEOUT = 1500,
				DOM = ns.util.DOM,
				engine = ns.engine,
				util = ns.util,
				object = util.object,
				selectors = util.selectors,
				Page = ns.widget.mobile.Page,
				pageDefinition = engine.getWidgetDefinition("Page"),
				dialogDefinition = engine.getWidgetDefinition("Dialog"),
				pageSelectorWithData = pageDefinition
					.selector
					.split(",")
					.map(
						function (value) {
							return value + "[data-url]";
						}
					)
					.join(","),
				body = document.body,
				firstPage = null,
				container = ns.getConfig("container") || body,
				loadPageDefaults = {
					type: "get",
					data: undefined,
					reloadPage: false,
					role: undefined, // By default we rely on the role defined by the @data-role attribute.
					showLoadMsg: false,
					pageContainer: container,
					loadMsgDelay: 50 // This delay allows loads that pull from browser cache to occur without showing the loading message.
				},
				path = util.path,
				UtilsDeferred = ns.util.deferred,
				events = ns.event,
				//existing base tag?
				base = document.getElementsByTagName("base")[0],
				//tuck away the original document URL minus any fragment.
				documentUrl = path.parseLocation(),
				//if the document has an embedded base tag, documentBase is set to its
				//initial value. If a base tag does not exist, then we default to the documentUrl.
				documentBase = base ? path.parseUrl(path.makeUrlAbsolute(base.getAttribute("href"), documentUrl.href)) : documentUrl,
				documentBaseDiffers = (documentUrl.hrefNoHash !== documentBase.hrefNoHash),
				activeClickedLink,
				slice = [].slice,
				RouterPage = ns.router.Page,
				pageEvents = RouterPage.events,
				prototype = RouterPage.prototype,
				parentOpen = prototype.open,
				dialogHashKey = "&ui-state=dialog";

			/**
			 * @method removeActiveLinkClass
			 * @param {boolean} forceRemoval
			 * @member ns.router.PageExternal
			 * @private
			 * @static
			 */
			function removeActiveLinkClass(forceRemoval) {
				if (!!activeClickedLink && (!selectors.getClosestByClass(activeClickedLink, ns.getConfig("activePageClass")).length || forceRemoval)) {
					activeClickedLink.classList.remove(ns.getConfig("activeBtnClass"));
				}
				activeClickedLink = null;
			}

			/**
			 * @method findBaseWithDefault
			 * @param {ns.router.PageExternal} router
			 * @member ns.router.PageExternal
			 * @private
			 * @static
			 * @return {boolean}
			 */
			function findBaseWithDefault(router) {
				var closestBase = (router.activePage && path.getClosestBaseUrl(router.activePage, "." + Page.classes.uiPage));
				return closestBase || documentBase.hrefNoHash;
			}

			/**
			 * @method remove
			 * @param {Event} event
			 * @member ns.router.PageExternal
			 * @private
			 * @static
			 */
			function remove(event) {
				var target = event.target;
				target.removeEventListener(pageEvents.PAGE_HIDE, remove, false);
				if (document.location.hash !== "#&ui-state=dialog") {
					if (events.trigger(target, pageEvents.PAGE_REMOVE) && target.parentNode) {
						target.parentNode.removeChild(target);
					}
				}
			}

			/**
			 * When dom caching is not enabled or the page is embedded bind to remove the page on hide
			 * @method _bindPageRemove
			 * @param {HTMLElement} page
			 * @member ns.router.PageExternal
			 * @protected
			 */
			prototype._bindPageRemove = function (page) {
				var pageWidget = engine.getBinding(page);

				if (!pageWidget.options.domCache && DOM.getNSData(page, "external-page")) {
					page.addEventListener(pageEvents.PAGE_HIDE, remove, false);
				}
			};

			/**
			 * Load the page from a url
			 * @method loadPage
			 * @param {string} url
			 * @param {Object} options
			 * @param {string} [options.type] connection type
			 * @param {Object} [options.data] additional url query parameters
			 * @param {boolean} [options.showLoadMsg=false] whether to show loading message
			 * @param {number} [options.loadMsgDelay] loading message delay in milliseconds
			 * @param {boolean} [options.prefetch] if true, this loading will be only a prefetch
			 * @member ns.router.PageExternal
			 */
			prototype.loadPage = function (url, options) {
				var settings = {},

					// The DOM element for the page after it has been loaded.
					page = null,

					// If the reloadPage option is true, and the page is already
					// in the DOM, dupCachedPage will be set to the page element
					// so that it can be removed after the new version of the
					// page is loaded off the network.
					dupCachedPage = null,

					// The absolute version of the URL passed into the function. This
					// version of the URL may contain dialog/subpage params in it.
					absUrl = path.makeUrlAbsolute(url, findBaseWithDefault(this)),
					triggerData,
					deferred = new UtilsDeferred(),
					fileUrl,
					dataUrl,
					loadMsgDelay,
					hideMsg,
					request,
					connectionType,
					self = this,
					loader = self.getLoader(),
					loaderProperties = ns.widget.mobile.Loader.properties,
					firstPage = engine.getRouter().firstPage;

				settings = object.merge(loadPageDefaults, options || {});
				settings.pageContainer = this.container;
				connectionType = settings.type;
				// If the caller provided data, and we're using "get" request,
				// append the data to the URL.
				if (settings.data) {
					if (connectionType === "get") {
						absUrl = path.addSearchParams(absUrl, settings.data);
						fileUrl = absUrl;
						settings.data = undefined;
						settings.fromSubmit = true;
					}

					// If the caller is using a "post" request, reloadPage must be true
					if (connectionType === "post") {
						settings.reloadPage = true;
					}
				}

				// The absolute version of the URL minus any dialog/subpage params.
				// In otherwords the real URL of the page to be loaded.
				fileUrl = fileUrl || path.getFilePath(absUrl);

					// The version of the Url actually stored in the data-url attribute of
					// the page. For embedded pages, it is just the id of the page. For pages
					// within the same domain as the document base, it is the site relative
					// path. For cross-domain pages (Phone Gap only) the entire absolute Url
					// used to load the page.
				dataUrl = path.convertUrlToDataUrl(absUrl, dialogHashKey, documentBase, documentUrl);

				// Make sure we have a pageContainer to work with.
				settings.pageContainer = settings.pageContainer || ns.getConfig("pageContainer", document.body);

				// Check to see if the page already exists in the DOM.
				// NOTE do _not_ use the :jqmData psuedo selector because parenthesis
				//	are a valid url char and it breaks on the first occurence
				page = selectors.getChildrenByDataNS(settings.pageContainer, "url='" + dataUrl + "'")[0];

				// If we failed to find the page, check to see if the url is a
				// reference to an embedded page. If so, it may have been dynamically
				// injected by a developer, in which case it would be lacking a data-url
				// attribute and in need of enhancement.
				if (!page && (dataUrl && !path.isPath(dataUrl))) {
					page = document.getElementById(dataUrl);
					if (page) {
						// The page can be in our DOM, but its current url can be different than
						// target page, so we are checking if the page uri matches desired location.
						// Added for JQM Router/Page tests.
						if (page.baseURI !== absUrl.split("#")[0]) {
							DOM.setNSData(page, "url", absUrl);
						} else {
							DOM.setNSData(page, "url", dataUrl);
						}
					}
				}

				// If we failed to find a page in the DOM, check the URL to see if it
				// refers to the first page in the application. If it isn't a reference
				// to the first page and refers to non-existent embedded page, error out.
				if (!page) {
					if (firstPage && path.isFirstPageUrl(fileUrl, documentBase, documentBaseDiffers, documentUrl)) {
						// Check to make sure our cached-first-page is actually
						// in the DOM. Some user deployed apps are pruning the first
						// page from the DOM for various reasons, we check for this
						// case here because we don't want a first-page with an id
						// falling through to the non-existent embedded page error
						// case. If the first-page is not in the DOM, then we let
						// things fall through to the ajax loading code below so
						// that it gets reloaded.
						if (firstPage.parentNode) {
							page = firstPage;
						}
					} else if (path.isEmbeddedPage(fileUrl)) {
						deferred.reject(absUrl, settings);
						return deferred.promise();
					}
				}

				// If the page we are interested in is already in the DOM,
				// and the caller did not indicate that we should force a
				// reload of the file, we are done. Otherwise, track the
				// existing page as a duplicated.
				if (page) {
					if (!settings.reloadPage) {
						DOM.setNSData(page, "url", dataUrl);
						parentOpen.call(this, page, settings);
						deferred.resolve(absUrl, settings, page);
						//if we are reloading the page make sure we update the base if its not a prefetch

						if (!settings || !settings.prefetch) {
							this.setBase(absUrl.split("#")[0]);
						}
						return deferred.promise();
					}
					engine.removeBinding(page);
					dupCachedPage = page;
				}

				triggerData = { url: url, absUrl: absUrl, dataUrl: dataUrl, deferred: deferred, settings: settings };

				// Let listeners know we're about to load a page.
				// If the default behavior is prevented, stop here!
				if (!events.trigger(settings.pageContainer, pageEvents.PAGE_BEFORE_LOAD, triggerData)) {
					return deferred.promise();
				}

				if (settings.showLoadMsg) {
					// This configurable timeout allows cached pages a brief delay to load without showing a message
					loadMsgDelay = setTimeout(function () {
						loader.show();
						return false;
					}, settings.loadMsgDelay);

						// Shared logic for clearing timeout and removing message.
					hideMsg = function () {
						// Stop message show timer
						clearTimeout(loadMsgDelay);
						// Hide loading message
						loader.hide();
					};
				}

				// Reset base to the default document base.
				// only reset if we are not prefetching
				if ((settings === undefined || settings.prefetch === undefined)) {
					this.resetBase();
				}

				if ((ns.getConfig("allowCrossDomainPages") || path.isSameDomain(documentUrl, absUrl))) {
					// Load the new page.
					request = new XMLHttpRequest();
					request.responseType = "document";
					request.onreadystatechange = function () {
						var status,
							requestedDocument = null,
							title,
							page,
							url,
							body,
							scripts,
							scriptRunner,
							onPageCreate,
							eventData = {},
							tempDoc,
							newPath,
							elements;
						if (request.readyState === 4) {
							status = request.status;
							requestedDocument = request.responseXML;
							if ((status === 200 || status === 0) && requestedDocument) {

								title = requestedDocument.querySelector("title");
								if (title) {
									title = title.textContent;
								}

								//@TODO add support for selecting a specific page with #hashtag
								//in external page as the following algorithm does not support
								// external/document.html#page url syntax

								page = requestedDocument.querySelector(pageSelectorWithData);
								if (page) {
									url = path.getFilePath(DOM.getNSData(page, "url"));
								} else {
									url = absUrl;
								}

								if ((settings === undefined || settings.prefetch === undefined)) {
									self.setBase(absUrl);
								}

								// if no page with a proper data-url was found, find any other page
								if (!page) {
									page = requestedDocument.querySelector(pageDefinition.selector);
								}

								// if page not found check if a dialog was requested
								if (!page) {
									page = requestedDocument.querySelector(dialogDefinition.selector);
								}

								// if still there is no page element, create one
								if (!page) {
									tempDoc = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null);
									page = tempDoc.createElement("div");
									DOM.setNSData(page, "role", "page");
									body = tempDoc.importNode(requestedDocument.body, true);
									while (body.firstChild) {
										page.appendChild(body.firstChild);
									}
								}

								// page specific title has the highest priority
								if (DOM.hasNSData(page, "title")) {
									title = DOM.getNSData(page, "title");
								}

								//rewrite src and href attrs to use a base url
								if (!ns.getConfig("supportDynamicBaseTag")) {
									newPath = path.get(url);
									elements = selectors.getChildrenByDataNS(page, "ajax='false'");
									elements.concat(selectors.getChildrenBySelector(page, "[src], link[href], a[rel='external'], a[target]"));
									elements.forEach(function (element) {
										var thisAttr = element.href === undefined ? "href" : (element.src === undefined ? "action" : "src"),
											thisUrl = element.getAttribute(thisAttr);
										thisUrl = thisUrl.replace(location.protocol + "//" + location.host + location.pathname, "");
										if (!/^(\w+:|#|\/)/.test(thisUrl)) {
											element.setAttribute(thisAttr, newPath + thisUrl);
										}
									});
								}

								page = util.importEvaluateAndAppendElement(page, settings.pageContainer);

								// append to page and enhance
								// TODO taging a page with external to make sure that embedded pages aren't removed
								// by the various page handling code is bad. Having page handling code in many
								// places is bad. Solutions post 1.0
								dataUrl = path.convertUrlToDataUrl(url, dialogHashKey, documentBase);
								DOM.setNSData(page, "url", dataUrl);
								DOM.setNSData(page, "external-page", true);

								// wait for page creation to leverage options defined on widget
								onPageCreate = function () {
									page.removeEventListener(pageEvents.PAGE_CREATE, onPageCreate, false);
									// in jqm interface function _bindPageRemove have in this current page, in new interface page is call as first argument
									ns.getConfig("_bindPageRemove", self._bindPageRemove).call(page, page);
								};

								page.addEventListener(pageEvents.PAGE_CREATE, onPageCreate, false);

								// Enhancing the page may result in new dialogs/sub pages being inserted
								// into the DOM. If the original absUrl refers to a sub-page, that is the
								// real page we are interested in.
								if (absUrl.indexOf("&" + ns.getConfig("subPageUrlKey")) > -1) {
									page = selectors.getChildrenByDataNS("url='" + dataUrl)[0];
								}

								//bind pageHide to removePage after it's hidden, if the page options specify to do so

								// Remove loading message.
								if (settings.showLoadMsg) {
									hideMsg();
								}

								// Add the page reference and xhr to our eventData.
								eventData.xhr = request;
								eventData.textStatus = status;
								eventData.page = page;

								// Let listeners know the page loaded successfully.
								events.trigger(settings.pageContainer, pageEvents.PAGE_LOAD, eventData);

								deferred.resolve(absUrl, settings, page, dupCachedPage);
							} else {
								//set base back to current path
								if (base) {
									self.setBase(path.getDocumentUrl());
								}

								// Add error info to our eventData.
								eventData.xhr = request;
								eventData.textStatus = status;
								eventData.errorThrown = null;//errorThrown;

								// Let listeners know the page load failed.
								// If the default behavior is prevented, stop here!
								// Note that it is the responsibility of the listener/handler
								// that called preventDefault(), to resolve/reject the
								// deferred object within the eventData.
								if (!events.trigger(settings.pageContainer, pageEvents.PAGE_LOAD_FAILED, eventData)) {
									return;
								}

								// Remove loading message.
								if (settings.showLoadMsg) {
									// Remove loading message.
									hideMsg();
									// show error message
									loader.show(loaderProperties.pageLoadErrorMessageTheme, loaderProperties.pageLoadErrorMessage, true);

									// hide after delay
									setTimeout(loader.hide, HIDE_PAGE_LOADING_TIMEOUT);
								}

								deferred.reject(absUrl, settings);
							}
						} // if end
					};
					request.open(settings.type || "GET", fileUrl, true);
					request.send(settings.data);
				} else {
					deferred.reject(absUrl, settings);
				}


				return deferred.promise();
			};

			/**
			 * Open a page
			 * @method open
			 * @param {string|HTMLElement} toPage page url or element
			 * @param {Object} options
			 * @param {string} [options.type] connection type
			 * @param {Object} [options.data] additional url query parameters
			 * @param {boolean} [options.showLoadMsg=false] whether to show loading message
			 * @param {number} [options.loadMsgDelay] loading message delay in milliseconds
			 * @member ns.router.PageExternal
			 */
			prototype.open = function (toPage, options) {
				var self = this;
				if (typeof toPage === "string") {
					self.loadPage(toPage, options)
						.done(function (url, newOptions, newPage, dupCachedPage) {
							newOptions.duplicateCachedPage = dupCachedPage;
							setTimeout(function () {
								parentOpen.call(self, newPage, newOptions);
							}, 10);
						})
						.fail(function (url, options) {
							//clear out the active button state
							removeActiveLinkClass(true);

							events.trigger(options.pageContainer, pageEvents.PAGE_CHANGE_FAILED, {});
						});
					return;
				}
				parentOpen.call(self, toPage, options);
			};
			/**
			 * @method getBaseElement
			 * @member ns.router.PageExternal
			 * @return {HTMLElement} base element
			 */
			prototype.getBaseElement = function () {
				if (!base && !this.justBuild) {
					//>>excludeStart("tauDebug", pragmas.tauDebug);
					ns.log("adding base tag");
					//>>excludeEnd("tauDebug");
					base = document.createElement("base");
					document.head.appendChild(base);
				}
				return base;
			};
			/**
			 * Sets href url on base element
			 * @method setBase
			 * @param {string} href
			 * @member ns.router.PageExternal
			 * @return {HTMLElement} base element
			 */
			prototype.setBase = function (href) {
				var baseElement = this.getBaseElement();
				if (baseElement) {
					baseElement.setAttribute("href", path.makeUrlAbsolute(href, documentBase));
				}

				return baseElement;
			};
			/**
			 * Resets href url on base element
			 * @method resetBase
			 * @member ns.router.PageExternal
			 * @return {HTMLElement} base element
			 */
			prototype.resetBase = function () {
				var baseElement = this.getBaseElement();

				// Change nothing when just building
				if (!engine.getJustBuild() && baseElement) {
					baseElement.setAttribute("href", documentBase.hrefNoHash);
				}

				return baseElement;
			};

			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return ns.router.Page;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window.document, ns));
