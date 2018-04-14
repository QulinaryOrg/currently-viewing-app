export default ({ viewers = [] }) => (
  <div>
    IP addresses currently viewing this app:
    {viewers.length === 0 ? (
      <div>Loading...</div>
    ) : (
      <div>
        {viewers.map(viewer => (
          <div key={viewer.ip}>
            {viewer.ip}
            {viewer.isViewer ? " (you)" : ""}
          </div>
        ))}
      </div>
    )}
  </div>
);
