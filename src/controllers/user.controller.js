import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/apierrors.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser=asyncHandler(async (req,res) => {
    // Your registration logic here

    //get user details from frontend
    //validation -not empty
    //check if user already exists username or email
    //check for images, check for aavatar
    //create user object - create entry in db
    //remove password and refresh token from response
    //check for user connection
    //return response

    const{fullName,username,email,password}=req.body
    console.log("email:",email)

    if (
        [fullName, email, username, password].some((field)=>
            field?.trim()==="")
    ) {
       throw new ApiError(400,"all feilds are required")
    }

    const existedUser= User.findOne({
        $or:[{ username },{ email }]
    })
    if (existedUser) {
        throw new ApiError(409,"user with this name exisist")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImagLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is reqired")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImagLocalPath)

    if (!avatar) {
        throw new ApiError(400,"Avatar file is reqired")

    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
        
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"user not created successfully")
    }



    return res.status(201).json(
        new ApiResponse(200, createdUser,"user registered successfully")
    )

})

export {registerUser}