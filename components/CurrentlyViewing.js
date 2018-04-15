export default ({ viewers = [], isLoading }) => (
  <div>
    IP addresses currently viewing this app:
    <div>
      {viewers.map(viewer => (
        <div key={viewer.ip}>
          {viewer.ip}
          {viewer.isViewer ? " (you)" : ""}
        </div>
      ))}
      {isLoading ? <div>Loading more...</div> : ""}
    </div>
  </div>
);
