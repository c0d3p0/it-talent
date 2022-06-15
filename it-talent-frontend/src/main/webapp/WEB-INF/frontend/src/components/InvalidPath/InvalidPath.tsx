import "./InvalidPath.css";


export default function InvalidPath() {
  return (
    <div className="invalid-path box">
      <div className="box-title">
        <h1>Page Not Found</h1>
      </div>
      <span>
        404, The page requested is not a valid one!
      </span>
    </div>
  );
}