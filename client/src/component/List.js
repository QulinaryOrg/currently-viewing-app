import React from 'react';

const ListItem = ({ ip }) => {
    return (<tr>
        <td className="lead">{ip.ip}</td>
        <td>{new Date(ip.date).toLocaleString()}</td>
    </tr>);
}

const List = ({ ips }) => {
    return (<div className="col text-center">
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">IP Address</th>
                    <th scope="col">Date Added</th>
                </tr>
            </thead>
            <tbody>
                {ips.map((ip, index) => <ListItem key={index} ip={ip} />)}
            </tbody>
        </table>
    </div>);
};


export default List;

