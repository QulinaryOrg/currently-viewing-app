import React from 'react';
import 'jest-enzyme';
import { shallow, mount, render } from 'enzyme';
import Home from '../components/Home';
import List from '../components/List';

describe('<Home/>', () => {

    beforeEach(() => {
        global.WebSocket = jest.fn(() => {
            return {
                onopen: () => {

                },
                onmessage: () => {

                }
            }
        });
    });

    it('should diplay 2 ips using <List/>', () => {

        const home = mount(<Home />);
        home.setState({
            ips: {
                '142.168.23.1': '1',
                '142.165.23.2': '1'
            }, connected: true
        })

        expect(home).toContainReact(<List ips={home.state().ips} />)
        expect(home.find('.list-group').children().length).toEqual(2);
    });
});


describe('<List />', () => {

    it('should group viewers on the same ip', () => {  
        const ips = {
            '142.168.23.1': '1',
            '142.165.23.2': '3'
        };
        const list = mount(<List ips={ips}/>);
        expect(list.find('.badge').last().text()).toEqual('3 clients');
        
    });
});