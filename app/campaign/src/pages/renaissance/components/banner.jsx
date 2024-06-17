import moduleConf from '../conf';

export default function Banner() {
  return (
    <div className="flex justify-center relative">
      {moduleConf.svg.renaissanceText}
    </div>
  );
}
