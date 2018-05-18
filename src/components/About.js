import React from 'react'

const About = ({ totalIps = 0 }: { totalIps?: number }) => (
  <div>
    <h3>
      This site shows a list of IP addresses of people who are viewing the page
      at the moment.
    </h3>
    <p>
      There are <b style={{ color: 'coral' }}>{totalIps}</b> people watching
      this page right now!
    </p>
  </div>
)

export default About
