//promises technique
// const asyncHandler=(requestHandler) => {
//     return (req, res, next)=>{
//         Promise.resolve(requestHandler(req, res, next)).catch((err)=>next)
//     }
// }





// export{asyncHandler}

export const asyncHandler = (fn) => (req,res,next) => {
  Promise
    .resolve(fn(req,res,next))
    .catch(next);
};







//try catch method
// const asyncHandler=(fn)=>async(req, res, next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code ||500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }