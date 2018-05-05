function showIPs(ipsObj) {
	let target = document.getElementById('list'),
	    ips = ipsObj.ips;
	target.innerHTML = '';
	for (let k in ips) {
		let item = document.createElement('li');
		item.innerHTML = '<i class="fas fa-desktop"></i><span>'+ips[k]+'</span>';
		if (ipsObj.ids[k] == socket.id) {
			item.classList.add('itsme');
		}
		target.appendChild(item);
	}
}