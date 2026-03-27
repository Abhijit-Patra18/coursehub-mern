import "../css/components/Flash.css";

function Flash({ flash }) {
  if (!flash.show) return null;

  return (
    <div className={`flash ${flash.type}`}>
      {flash.message}
    </div>
  );
}

export default Flash;