import React from "react"
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'


export const QuotationDisplay = ({quotation, account}) => { return(
	<LocaleApiSubscriber>
    {(c)=>(
    	<div>
			<p>{c.t('Account')+' : ' + account.name + ' (' + account._id + ')'}</p>
			<p>{c.t('Quotation date') + ' : ' + c.moment(quotation.createDateTime).format('YYYY-MM-DD HH:mm')}</p>
			{genQuotationLines(quotation.quotationDetails, c.t)}
			<h3>{c.t('Total Price')+ ' : ' + quotation.totalPrice}</h3>
		</div>
	)}
	</LocaleApiSubscriber>
)}

const genQuotationLines = (qd, t) => {
	let coms = []
	for (let i=0; i< qd.length; i++) {
		const line = qd[i]
		coms.push(
			<div key={'line'+ i}>
				<img src={line.SKU_id.iconPicURL} width={50} height={50} />
				<div>
					<p><label>{t(line.SKU_id.name)}</label></p>
					<p><label>{t('Dimension') + ' : ' + (line.SKU_id.lengthM * 100) + 'cm x ' + (line.SKU_id.widthM * 100) + 'cm x ' + (line.SKU_id.heightM * 100) + 'cm'}</label></p>
					<p><label>{line.duration + ' ' + t(line.rentMode)}</label></p>
					<label>{t('Qty')+ ' : ' + line.qty}</label>
					<label>{t('Unit Price') + ' : ' + line.rent_unitPrice}</label>
					<label>{t('Line Total') + ' : ' + line.rent_lineTotal}</label>
					<p>{t('Remarks') + ' : ' + line.remarks}</p>
				</div>
			</div>
		)
	}
	return coms
}