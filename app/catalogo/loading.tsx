export default function Loading() {
  return <div className="container py-8"><div className="skeleton h-8 w-1/4 mb-4"></div><div className="grid md:grid-cols-3 gap-4">{Array.from({length:9}).map((_,i)=>(<div key={i} className="skeleton h-44" />))}</div></div>;
}
