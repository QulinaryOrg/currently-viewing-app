export default ({ viewers }) => (
  <div>
    Currently viewing:
    {viewers.map(viewer => <div key={viewer.ip}>{viewer.ip}</div>)}
  </div>
);
