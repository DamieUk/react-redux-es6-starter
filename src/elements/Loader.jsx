import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Loader = ({ type = 'circle', fullPage = false, size = 40, style = {} }) => {
	switch (type) {
		case 'circle':
			return (
				<div className={cn('dp-spinner fade-in', { 'full-page': fullPage })} style={style}>
					<div className="circle">
						<svg
							className="spinner"
							width={size + 'px'}
							height={size + 'px'}
							viewBox="0 0 66 66"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle className="path" fill="none" strokeWidth="5" strokeLinecap="round" cx="33" cy="33" r="30" />
						</svg>
					</div>
				</div>
			);
		case 'linear':
			return (
				<div className="dp-linear-progress">
					<div className="bar bar1" />
					<div className="bar bar2" />
				</div>
			);
	}
};

Loader.propTypes = {
	fullPage: PropTypes.bool,
	size: PropTypes.number,
	type: PropTypes.oneOf(['circle', 'linear']),
	style: PropTypes.shape(),
};

export default Loader;
