async function getIpAddress(): Promise<string> {
    const ipaddressRes = await fetch('https://api.ipify.org?format=json');
    const { ip: ipaddress } = await ipaddressRes.json();
    return ipaddress;
}

export default getIpAddress;
