import React from 'react';

class ScreenSpinner extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row pt-5">
					<div classname="col-md-10 text-center p-5 offset-md-1">
						<div class="spinner-border text-light" style={{width: '5rem', height: '5rem'}} role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
