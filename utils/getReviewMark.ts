const testData = [
    {
        PCommunication: 5,
        PCooperation: 4,
        PAvailability: 3,
        PSkills: 2,
        OCommunication: 4,
        OCooperation: 3,
        OAvailability: 5,
        OSkills: 4
    }
]

const calcReviewMarks = (reviews: any, type:string) => {
    var result = 0.0;
    if(reviews.length < 4){
        return "New User"
    }
    reviews.map((ele:any) => {
        var mid;
        if(type === "pro"){
            mid = (ele.PCommunication + ele.PCooperation + ele.PAvailability + ele.PSkills)/4.0
        } else {
            mid = (ele.OCommunication + ele.OCooperation + ele.OAvailability + ele.OSkills)/4.0
        }
        result += mid
    })
    return result/reviews.length
}

export const testCalcReviewMarks = (type: any) => {
    const result = calcReviewMarks(testData,type);

    return result;
}

export default calcReviewMarks