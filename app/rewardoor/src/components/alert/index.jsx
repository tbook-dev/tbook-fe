import AlertUrl from '@/images/icon/alert.svg';

export default function Alert({ description }) {
  return (
    <div className="mb-3 p-4 rounded-2.5xl bg-white/10 flex gap-x-4 text-sm text-yellow-400">
      <img src={AlertUrl} className="size-4" />
      <div>{description}</div>
    </div>
  );
}
