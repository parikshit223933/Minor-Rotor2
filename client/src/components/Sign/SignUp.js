import React from 'react';
import './SignUp.scss';
import {ButtonSpinner} from '../';

class SignUp extends React.Component
{
  render()
  {
    return(
      <div className="sign-in">
				<div className="sign-in-text font-25 pb-4 google-font">
					Sign In
				</div>
				<form>	<div class="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							class="form-control"
							id="name"
							aria-describedby="name"
						/>
					</div>
					<div class="form-group">
						<label htmlFor="email-address">Email address</label>
						<input
							type="email"
							class="form-control"
							id="email-address"
							aria-describedby="email"
						/>
					</div>
					<div className="row">
					  <div class="form-group col-lg-6">
  						<label htmlFor="password">Password</label>
  						<input
  							type="password"
  							class="form-control"
  							id="password"
  						/>
  					</div>
            <div class="form-group col-lg-6">
  						<label htmlFor="confirm-password">Confirm Password</label>
  						<input
  							type="password"
  							class="form-control"
  							id="confirm-password"
  						/>
  					</div>
					</div>
					<button type="submit" class="btn btn-primary">
						Submit &nbsp;&nbsp;<ButtonSpinner/>
					</button>
				</form>
			</div>
    );
  }
}
export default SignUp;