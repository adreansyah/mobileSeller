import React, { Component } from 'react';

class Layout extends Component {
	componentDidMount() {
		document.title = 'Page Not Found';
	}

	render() {
		return (
			<>
				<h1>Error 404 Page</h1>
				<p>Page not found</p>
			</>
		)
	}
}

export default Layout;