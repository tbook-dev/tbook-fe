export default [
  {
    url: "/api/tiplist",
    type: "GET",
    response() {
      return {
        code: 200,
        msg: "success",
        data: "1"
          .repeat(10)
          .split("1")
          .map((_, idx) => {
            return {
              incentivePlanId: idx,
              projectId: idx,
              percentage: 10 + idx,
              target: 0,
              status: 0,
              effectiveDate: "2022-12-20" + idx,
              createUserId: 0,
              granted: 33000,
              total: 1200000,
              name: "Dev Team TIP",
            };
          }),
      };
    },
  },
  {
    url: "/api/tipInfo",
    type: "GET",
    response() {
      return {
        incentivePlanId: 1001,
        projectId: 2,
        percentage: 0.2,
        target: 2,
        status: 1,
        effectiveDate: "2022-12-13",
        createUserId: 0,
        name:"Dev Team TIP"
      };
    },
  },
];
