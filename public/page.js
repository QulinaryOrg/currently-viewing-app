function showIPs(ipsObj, targetID) {
	let target = document.getElementById(targetID),
	    ips = ipsObj.ips;
	target.innerHTML = '';
	for (let k in ips) {
		let item = generateItem(ips[k], ipsObj.ids[k]);
		target.appendChild(item);
	}
}

function generateItem(ip, id) {
	let item = document.createElement('li');
	item.innerHTML = '<i class="fas fa-desktop"></i><span>'+ip+'</span>';
	if (id == socket.id) {
		item.classList.add('itsme');
	}
	return item;
}