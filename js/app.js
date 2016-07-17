"use strict";

/**
 * The main app object.
 * @namespace
 */
var vanillaPress = {
	/**
	 * Initializes the app.
	 */
	init: function() {
		this.initializeProperties();
		this.addInitialEventListeners();
		displayAllPosts();
	}
};

/**
 * Initializes all VanillaPress properties.
 */
vanillaPress.initializeProperties = function() {
	/**
	 * The main view area element.
	 * @type {Element}
	 */
	this.viewEl = document.getElementById( 'view' );

	/**
	 * The site header element.
	 * @type {Element}
	 */
	this.siteHeaderEl = document.getElementById( 'siteName' );

	/**
	 * The site header link element.
	 * @type {Element}
	 */
	this.siteHeaderLinkEl = this.siteHeaderEl.querySelector( 'a' );

	/**
	 * The container element.
	 * @type {Element}
	 */
	this.containerEl = this.viewEl.querySelector( '.container' );

	/**
	 * The content element.
	 * @type {Element}
	 */
	this.contentEl = this.containerEl.querySelector( '.content' );

	/**
	 * The primary content element.
	 * @type {Element}
	 */
	this.primaryContentEl = this.contentEl.querySelector( '.primary' );
};

/**
 * Adds all initial event listener functions.
 */
vanillaPress.addInitialEventListeners = function() {
	this.siteHeaderLinkEl.addEventListener( 'click', displayAllPosts );
};

/**
 * Displays all available posts in the main content area.
 */
function displayAllPosts() {
	var postsContainerEl = document.createElement( 'div' );

	// Prepare posts container.
	postsContainerEl.setAttribute( 'id', 'blogPosts' );

	// Empty the content area...
	vanillaPress.primaryContentEl.innerHTML = '';

	// ...and insert the posts container.
	vanillaPress.primaryContentEl.appendChild( postsContainerEl );

	if ( ! posts || ! posts.length ) {
		// No posts to display. Bail.
		return;
	}

	// Loop through all available posts...
	for ( var i = 0, max = posts.length; i < max; i++ ) {
		// ...and display each of them.
		displayPost( posts[ i ] );
	}
}

/**
 * Displays the given post as one of several posts in the main content area.
 * @param {Object} postObject - A post object.
 */
function displayPost( postObject ) {
	var containerEl = document.createElement( 'article' ),
		headlineEl = document.createElement( 'h3' ),
		linkEl = document.createElement( 'a' ),
		contentEl = document.createElement( 'div' );

	// Prepare the link element.
	linkEl.setAttribute( 'href', '#' + postObject.slug );
	linkEl.setAttribute( 'data-id', postObject.id );
	linkEl.innerText = postObject.title;
	linkEl.addEventListener( 'click', handlePostLinkClick );

	// Append the link element to the headline.
	headlineEl.appendChild( linkEl );

	// Fill in the post content.
	contentEl.innerHTML = postObject.content;

	// Append headline and content elements to the container.
	containerEl.appendChild( headlineEl );
	containerEl.appendChild( contentEl );

	// Finally, append the container to the blog posts container.
	vanillaPress.primaryContentEl.querySelector( '#blogPosts' ).appendChild( containerEl );
}

/**
 * Displays the given post as single post in the main content area.
 * @param {Object} postObject - A post object.
 */
function displaySinglePost( postObject ) {
	var headlineEl = document.createElement( 'h2' ),
		contentEl = document.createElement( 'div' );

	// Empty the content area...
	vanillaPress.primaryContentEl.innerHTML = '';

	// Fill in the post title.
	headlineEl.setAttribute( 'id', 'pageTitle' );
	headlineEl.innerText = postObject.title;

	// Fill in the post content.
	contentEl.setAttribute( 'id', 'pageContent' );
	contentEl.innerHTML = postObject.content;

	// Append headline and content elements to the primary content element.
	vanillaPress.primaryContentEl.appendChild( headlineEl );
	vanillaPress.primaryContentEl.appendChild( contentEl );
}

/**
 * Handles clicking a post's link (i.e., display the post a single content).
 * @param {Event} e - The click event of a link element.
 */
function handlePostLinkClick( e ) {
	var post = getPost( Number( e.currentTarget.getAttribute( 'data-id' ) ) );

	if ( ! post ) {
		return;
	}

	displaySinglePost( post );
}

/**
 * Returns the post object with the given ID, or null if there is no such post.
 * @param {Number} id - A post ID.
 * @returns {Object|null} The post object with the given ID, or null if there is no such post.
 */
function getPost( id ) {
	if ( 1 > id ) {
		return null;
	}

	// Loop through all available posts...
	for ( var i = 0, max = posts.length; i < max; i++ ) {
		if ( id === posts[ i ].id ) {
			// ...and return the one with the given ID.
			return posts[ i ];
		}
	}

	return null;
}

// ---------------------------------------------------------------------------------------------------------------------

// Now, initialize the app.
vanillaPress.init();
