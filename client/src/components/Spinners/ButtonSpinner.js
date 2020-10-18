import React from 'react';
class ButtonSpinner extends React.Component {
	render() {
		return (
			<div
				class="spinner-border text-light spinner-border-sm"
				role="status"
			>
				<span class="sr-only">Loading...</span>
			</div>
		);
	}
}
export default ButtonSpinner;