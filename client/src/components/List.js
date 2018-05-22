import React from 'react';

const ListItem = ({ item }) => {
    return (<div className="list-group-item justify-content-start">
        <div className="lead">{item.key}</div>
        <div className="badge badge-secondary">{item.value} clients </div>
    </div>);
}

const List = ({ ips }) => {
    return (<div>
        <div className="list-group">
            {Object.keys(ips).map((key, index) => <ListItem key={index} item={{ key: key, value: ips[key] }} />)}
        </div>
    </div>);
};

export default List;