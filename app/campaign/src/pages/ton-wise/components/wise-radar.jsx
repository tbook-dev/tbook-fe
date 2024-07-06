import ReactECharts from 'echarts-for-react';
import { graphic } from 'echarts';
import { formatImpact } from '@tbook/utils/lib/conf';

function mapToTen (list) {
  const maxValue = Math.max(...list);
  const mapValue = value => Math.ceil((value / maxValue) * 10);
  return list.map(v => mapValue(v));
}

export default function WiseInfo ({
  data,
  engagementScore,
  socialScore,
  identityScore,
  wealthScore,
}) {
  const list = [engagementScore, socialScore, identityScore, wealthScore];
  // const maxScore = Math.max(...list) + 1;
  const mapToTenList = mapToTen(list);

  const option = {
    radar: [
      {
        silent: true,
        splitNumber: 4,
        indicator: [
          { name: 'Engagement', max: 10 },
          { name: 'Social', max: 10 },
          { name: 'Identity', max: 10 },
          { name: 'Wealth', max: 10 },
        ],
        radius: 80,
        axisName: {
          formatter: function (_, indicator) {
            const name = indicator.name;
            const a = name[0];
            const b = name.slice(1);
            return `{a|${a}}{b|${b}}`;
          },
          rich: {
            a: {
              color: '#904BF6',
              fontWeight: 500,
              fontSize: 16,
              fontFamily: 'Red Hat Display',
            },
            b: {
              color: '#fff',
              fontWeight: 400,
              fontSize: 14,
              fontFamily: 'Red Hat Display',
            },
          },
        },
        axisLine: {
          lineStyle: {
            color: '#313131',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#1b1b1b', '#262626'],
            opacity: 0.5,
          },
        },
        // center: ['50%', '60%']
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: formatImpact(data?.totalScore ?? 0),
          fill: '#fff',
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'zen-dot',
        },
        z: 2,
      },
    ],
    series: [
      {
        name: 'wise score',
        type: 'radar',
        data: [
          {
            value: mapToTenList,
            // value: [10, 93, 50, 30],
            lineStyle: {
              color: '#904BF6',
              width: 2,
            },
            itemStyle: {
              opacity: 0,
            },
            areaStyle: {
              color: new graphic.RadialGradient(0.1, 0.6, 1, [
                {
                  color: 'rgba(144, 75, 246, 0.2)',
                  offset: 0,
                },
                {
                  color: 'rgba(207, 0, 99, 0.2)',
                  offset: 1,
                },
              ]),
            },
          },
        ],
        z: 1,
      },
    ],
  };
  return (
    <ReactECharts className='w-[290px] h-[250px] mx-auto ' option={option} />
  );
}
