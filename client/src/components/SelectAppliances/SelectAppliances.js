import React from 'react';
import './SelectAppliances.scss';
import options from '../../assets/svgs/undraw_Preferences_re_49in.svg';
import { ButtonSpinner } from '../';
import { connect } from 'react-redux';
import { selectAppliances } from '../../actions/auth';
import JwtDecode from 'jwt-decode';

class SelectAppliances extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			appliances: [],
		};
	}
	remove = (array, element) => {
		return array.filter((e) => {
			return e !== element;
		});
	};
	handleOnChange = (appliance) => {
		if (this.state.appliances.includes(appliance)) {
			let new_appliances_array = this.state.appliances;
			this.setState({
				appliances: this.remove(new_appliances_array, appliance),
			});
		} else {
			let new_appliances_array = this.state.appliances;
			new_appliances_array.push(appliance);
			this.setState({
				appliances: new_appliances_array,
			});
		}
	};
	handleOnSubmit = () => {
		this.props.dispatch(
			selectAppliances(
				JwtDecode(localStorage.getItem('token'))._id,
				this.state.appliances
			)
		);
	};
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
									value="BULB"
									onChange={(event) =>
										this.handleOnChange(event.target.value)
									}
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
									value="FAN"
									onChange={(event) =>
										this.handleOnChange(event.target.value)
									}
								/>
								<label
									className="form-check-label"
									htmlFor="checkBox-2"
								>
									FAN
								</label>
							</div>
						</div>
						<div className="form-group mt-4">
							<button
								type="button"
								className="btn inline btn-primary"
								onClick={this.handleOnSubmit}
							>
								Submit
								{this.props.auth.inProgress && (
									<span>&nbsp;&nbsp;</span>
								)}
								{this.props.auth.inProgress && (
									<ButtonSpinner />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({ ...state }) => {
	return {
		auth: state.auth,
	};
};
export default connect(mapStateToProps)(SelectAppliances);
