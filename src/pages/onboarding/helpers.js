export const reformatPhone = phone => {
	phone = phone.match(/\d+/g).join('');
	return {
		country_code: phone[0],
		phone_number: phone.slice(1),
	}
};