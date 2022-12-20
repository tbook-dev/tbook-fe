export default [
  {
    url: "/api/tiplist",
    type: "GET",
    response() {
      return {
        code: 200,
        msg: "success",
        data: [
          {
            incentivePlanId: 0,
            projectId: 0,
            percentage: 10,
            target: 0,
            status: 0,
            effectiveDate: "2022-12-20",
            createUserId: 0,
            granted: 33000,
            total: 1200000,
            name: 'Dev Team TIP',
          },
        ],
      };
    },
  },
];
