import React from 'react';

class Hourly extends React.Component {
	render() {
		const {weather} = this.props;
		const renderHour = (hour, i) => {
			const icons = `http://openweathermap.org/img/w/${hour.weather[0].icon}.png`;

			return (
				<div key={i} className='hour'>
					<div>{hour.dt_txt.slice(5,16)}</div>
					<img src={icons} alt={hour.weather[0].description}/>
					<div>{hour.main.temp}°C </div>
				</div>
			);
		};
		
		return (
			<div className='hours'>
				{weather.map(renderHour)}
			</div>
		);
	}
}

export default Hourly;


