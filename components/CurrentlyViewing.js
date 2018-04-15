import cssList from "../assets/style/list.css";
import cssLayout from "../assets/style/layout.css";
import Loading from "./Loading";

export default ({ viewers = [], isLoading }) => (
  <div className={`${cssList.border} ${cssLayout.container}`}>
    IP addresses currently viewing this app:
    <div className={cssList.list}>
      {viewers.map(viewer => (
        <div key={viewer.ip} className={cssList.listItem}>
          {viewer.ip}
          {viewer.isViewer ? " (you)" : ""}
        </div>
      ))}
      {isLoading && (
        <div className={cssList.listItem}>
          <Loading />
        </div>
      )}
    </div>
  </div>
);
