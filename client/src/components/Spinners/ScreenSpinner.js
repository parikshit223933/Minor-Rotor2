import React from 'react';

class ScreenSpinner extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row pt-5">
					<div className="col-md-10 text-center p-5 offset-md-1">
						<div className="spinner-border text-danger text-center" style={{width: '5rem', height: '5rem'}} role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ScreenSpinner;