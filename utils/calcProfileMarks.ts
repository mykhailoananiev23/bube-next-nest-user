export const calcProfileMarks = (data: any) => {
    var marks = 0;
    data?.aboutMe && (marks += 20);
    data?.experience?.length && (marks += data?.experience?.length * 10);
    data?.socialMediaLinks?.length && (marks += data?.socialMediaLinks?.length * 5);
    data?.portfolio?.length && (marks += data?.portfolio?.length * 10);
    if(marks > 100) {
        marks = 100;
    }

    return marks;
}