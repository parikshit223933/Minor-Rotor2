import React from 'react';
import './SelectAppliances.scss';
import options from '../../assets/svgs/undraw_Preferences_re_49in.svg';
import {ButtonSpinner} from '../';

class SelectAppliances extends React.Component {
	render() {
		return (
			<div className="select-appliances pt-5 container">
				<div className="row bg-white intro-box">
					<div className="col-md-6 p-5">
						<img src={options} alt="home" width="100%" />
					</div>
					<div className="col-md-6 p-5">
						<div className="mb-4 font-25">
							Choose your Appliances
						</div>
						<div className="form-group">
							<div className="form-check my-3">
								<input
									className="form-check-input"
									type="checkbox"
									id="checkBox-1"
									value="option1"
								/>
								<label
									className="form-check-label"
									htmlFor="checkBox-1"
								>
									BULB
								</label>
							</div>
							<div className="form-check my-3">
								<input
									className="form-check-input"
									type="checkbox"
									id="checkBox-2"
									value="option2"
								/>
								<label
									className="form-check-label"
									htmlFor="checkBox-2"
								>
									FAN
								</label>
							</div>
							<div className="form-check my-3">
								<input
									className="form-check-input"
									type="checkbox"
									id="checkBox-3"
									value="option3"
								/>
								<label
									className="form-check-label"
									htmlFor="checkBox-3"
								>
									REFRIGERATOR
								</label>
							</div>
						</div>
						<div className="form-group mt-4">
							<button
								type="submit"
								className="btn inline btn-primary"
							>
								Submit&nbsp;&nbsp;
								<ButtonSpinner />
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default SelectAppliances;
