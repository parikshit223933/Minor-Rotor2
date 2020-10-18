import React from 'react';
class ButtonSpinner extends React.Component {
	render() {
		return (
			<div
				className="spinner-border text-light spinner-border-sm"
				role="status"
			>
				<span className="sr-only">Loading...</span>
			</div>
		);
	}
}
export default ButtonSpinner;