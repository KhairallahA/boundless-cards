export default function Progress({ pct }) {
  return (
    <div className="w-full max-w-xs h-2 bg-gray-700 rounded-full">
      <div style={{ width: pct + '%' }} className="h-full bg-emerald-500 rounded-full transition-all" />
    </div>
  );
}