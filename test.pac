var subnetIpRangeList = [
0,1,
167772160,184549376,	//10.0.0.0/8
2886729728,2887778304,	//172.16.0.0/12
3232235520,3232301056,	//192.168.0.0/16
2130706432,2130706688	//127.0.0.0/24
];


function convertAddress(ipchars) {
	var bytes = ipchars.split('.');
	var result = (bytes[0] << 24) |
	(bytes[1] << 16) |
	(bytes[2] << 8) |
	(bytes[3]);
	return result >>> 0;
}
function isInSubnetRange(ipRange, intIp) {
	for ( var i = 0; i < 10; i += 2 ) {
		if ( ipRange[i] <= intIp && intIp < ipRange[i+1] )
			return true;
	}
}

function FindProxyForURL(url,host) {
	var intIp = convertAddress(dnsResolve(host));
	if ( isInSubnetRange(subnetIpRangeList, intIp) ) {
		return "DIRECT";
	}
	url=url.toLowerCase();
	host=host.toLowerCase();
	if ( shExpMatch(url,"*sysyear*")) {
		return "SOCKS 192.168.0.106:8080";
		}
	return "DIRECT";
}