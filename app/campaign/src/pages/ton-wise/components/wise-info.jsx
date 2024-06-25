import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import useWiseScore from '@/hooks/useWiseScore';
import { graphic } from 'echarts';
import { formatImpact } from '@tbook/utils/lib/conf';
import { sum } from 'lodash';
const modlueConf = {
  title: 'WISE score',
  linktext: 'Leaderboard',
};

function mapToTen (list) {
  const maxValue = Math.max(...list);
  const mapValue = value => Math.ceil((value / maxValue) * 10);
  return list.map(v => mapValue(v));
}

export default function WiseInfo () {
  const { data } = useWiseScore();

  const list = [
    data?.engagementScore ?? 0,
    data?.socialScore ?? 0,
    data?.identityScore ?? 0,
    data?.wealthScore ?? 0,
  ];
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
          text: formatImpact(sum(list)),
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
    <div className='space-y-10'>
      <div className='flex text-white items-center justify-between'>
        <h2 className='text-base font-zen-dot'>{modlueConf.title}</h2>
        <Link
          to='/wise-leaderboard'
          className='flex items-center gap-x-1 px-3 py-1 rounded-xl text-sm font-medium border border-[rgb(207,0,99)]/[0.10] bg-[rgb(207,0,99)]/[0.20]'
        >
          {modlueConf.linktext}
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.875 17.5H18.125C18.5417 17.5 18.75 17.7083 18.75 18.125C18.75 18.5417 18.5417 18.75 18.125 18.75H1.875C1.45833 18.75 1.25 18.5417 1.25 18.125C1.25 17.7083 1.45833 17.5 1.875 17.5Z'
              fill='#CF0063'
            />
            <path
              d='M8.75 18.75H3.75V11.8359C3.75036 11.5149 3.87806 11.2071 4.10508 10.9801C4.33209 10.7531 4.63989 10.6254 4.96094 10.625H7.53906C7.86011 10.6254 8.16791 10.7531 8.39493 10.9801C8.62194 11.2071 8.74964 11.5149 8.75 11.8359V18.75ZM5 17.5H7.5V11.875H5V17.5ZM16.25 18.75H11.25V13.0859C11.2504 12.7649 11.3781 12.4571 11.6051 12.2301C11.8321 12.0031 12.1399 11.8754 12.4609 11.875H15.0391C15.3601 11.8754 15.6679 12.0031 15.8949 12.2301C16.1219 12.4571 16.2496 12.7649 16.25 13.0859V18.75ZM12.5 17.5H15V13.125H12.5V17.5Z'
              fill='#CF0063'
            />
            <path
              d='M12.5 18.75H7.50005V8.08593C7.50041 7.76488 7.6281 7.45709 7.85512 7.23007C8.08214 7.00306 8.38993 6.87536 8.71098 6.875H11.2891C11.6102 6.87536 11.918 7.00306 12.145 7.23007C12.372 7.45709 12.4997 7.76488 12.5 8.08593V18.75ZM8.75005 17.5H11.25V8.125H8.75005V17.5ZM11.25 6.25H8.75005C8.64242 6.24998 8.53663 6.22218 8.44291 6.16928C8.34918 6.11638 8.27071 6.04017 8.21508 5.94804L6.96508 3.87773C6.90784 3.78293 6.87682 3.67462 6.87519 3.56389C6.87356 3.45316 6.90138 3.34398 6.9558 3.24754C7.01022 3.15109 7.0893 3.07083 7.18492 3.01499C7.28055 2.95914 7.3893 2.9297 7.50005 2.92968H8.59985L9.47075 1.54297C9.527 1.45338 9.60507 1.37954 9.69764 1.32836C9.79022 1.27718 9.89427 1.25034 10 1.25034C10.1058 1.25034 10.2099 1.27718 10.3024 1.32836C10.395 1.37954 10.4731 1.45338 10.5293 1.54297L11.4002 2.92968H12.5C12.6108 2.9297 12.7195 2.95914 12.8152 3.01499C12.9108 3.07083 12.9899 3.15109 13.0443 3.24754C13.0987 3.34398 13.1265 3.45316 13.1249 3.56389C13.1233 3.67462 13.0922 3.78293 13.035 3.87773L11.785 5.94804C11.7294 6.04017 11.6509 6.11638 11.5572 6.16928C11.4635 6.22218 11.3577 6.24998 11.25 6.25ZM9.10278 5H10.8973L11.3926 4.17968H11.0547C10.9489 4.17965 10.8449 4.15275 10.7523 4.10151C10.6597 4.05027 10.5816 3.97636 10.5254 3.88672L10 3.05039L9.47465 3.88672C9.41844 3.97636 9.34039 4.05027 9.24781 4.10151C9.15524 4.15275 9.05117 4.17965 8.94536 4.17968H8.60747L9.10278 5Z'
              fill='#CF0063'
            />
          </svg>
        </Link>
      </div>

      <ReactECharts className='w-[290px] h-[250px] mx-auto ' option={option} />
    </div>
  );
}
