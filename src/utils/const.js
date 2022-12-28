/**
 * 激励目标target
 * 0：default/unknown
 * 1：employee
 * 2：Adviser
 * 3：Developers
 * 4：Business development team
 * 5：investor
 * 6：Community growth
 * 7：customize
 * **/


export const targetMap = {
//    0: 'default/unknown',
    1: 'employee',
    2: 'Adviser',
    3: 'Developers',
    4: 'Business development team',
    5: 'investor',
    6: 'Community growth',
    7: 'customize'
}

/**
 * byDate,周期类型
 * byMilestone，里程碑
 */
export const grantType = [
    //    0: 'default/unknown',
    {
        name: 'by Date',
        value: 1,
        disabled: false

    },
    {
        name: 'by Milestone',
        value: 2,
        disabled: true
    }

]

export const dateFormat = 'YYYY-MM-DD'