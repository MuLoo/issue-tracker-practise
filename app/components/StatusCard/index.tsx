import React from 'react'
import './index.css'

const StatusCard = () => {
	return (
		<div className="statusCard status-bg">
			<label className="statusAvatar"></label>
			<label className="statusCardInfo">
				<span className="statusCardInfo_1"></span>
				<span className="statusCardInfo_2"></span>
			</label>
			<div className="statusCardContent_1"></div>
			<div className="statusCardContent_2"></div>
		</div>
	)
}

export default StatusCard
