"use client"
import React, { useCallback, useEffect } from "react"
import logo from "@/assets/home/logo.svg"
import Image from "next/image"
import titterIcon from "@/assets/home/twitterIcon.svg"
import Button from "@/components/custom/button"
import twitterBorderWhite from "@/assets/login/twitterBorderWhite.svg"
import xIcon from "@/assets/login/xIcon.svg"
import agreeIcon from "@/assets/login/agreeIcon.svg"
import textAnimation from "@/assets/login/textAnimation.svg"
import firstAnimation from "@/assets/login/firstAnimation.svg"
import secondAnimation from "@/assets/login/secondAnimation.svg"
import wrongIcon from "@/assets/login/wrongIcon.svg"
import "./index.css"
import Search from "@/components/custom/search"
import { verifyTwitterToken, bindInviteCode } from "@/api/model/login"
import { useRouter } from "next/navigation"
import { getUserInfo } from "@/api/model/userService"
import Loading from "@/components/custom/Loading"
import { useDispatch } from "react-redux"
import { setUserInfo } from "@/redux/features/userSlice"
interface LoginProps {
  // Add any props you need for the Login component
}

const Login: React.FC<LoginProps> = () => {
  const [isShowInviteCode, setIsShowInviteCode] = React.useState(false)

  const [inviteCodeIsWrong, setInviteCodeIsWrong] = React.useState(false)
  const [value, setValue] = React.useState("")
  const router = useRouter()

  const getTwitterLinkFunc = async () => {
    window.location.href =
      process.env.NEXT_PUBLIC_APP_URL + "/open/x/oauth/request_token"
  }

  const getQueryParams = useCallback((): any => {
    if (typeof window === "undefined") {
      return
    }
    const urlParams: any = new URLSearchParams(window.location.search)
    const paramsObj: { [key: string]: string } = {}
    for (const [key, value] of urlParams.entries()) {
      paramsObj[key] = value
    }
    return paramsObj
  }, [])
  const params = getQueryParams()

  const dispatch = useDispatch()

  const validateTwitterToken = useCallback(async () => {
    console.log("validating twitter token")
    verifyTwitterToken({
      oauth_token: params.oauth_token,
      oauth_verifier: params.oauth_verifier,
    })
      .then(async (res: any) => {
        if (res.result) {
          localStorage.setItem("token", res.result)
          getUserInfo().then((res) => {
            console.log(res)
            dispatch(setUserInfo(res.result))
            if (res.result.bindInviteCode) {
              router.push("/home")
            } else {
              setIsShowInviteCode(true)
            }
          })
        } else {
        }
      })
      .finally(() => {})
  }, [dispatch, params.oauth_token, params.oauth_verifier, router])

  useEffect(() => {
    if (params?.oauth_token && params?.oauth_verifier) {
      validateTwitterToken()
    } else {
      console.log("no token")
    }
  }, [params?.oauth_token, params?.oauth_verifier, validateTwitterToken])

  const clickBindInviteCode = async () => {
    const res = await bindInviteCode(value)
    if (res) {
      router.push("/home")
    } else {
      setInviteCodeIsWrong(true)
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center">
      <div className="w-full h-[90px] flex items-center px-[40px] justify-between">
        <Image src={logo} alt="" width={180} height={64}></Image>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            window.open("https://twitter.com/tryalpha_club")
          }}
        >
          <Image src={titterIcon} alt="" width={20} height={20}></Image>
          @tryalpha_club
        </div>
      </div>

      <div className="mt-[146px] w-full">
        <div className="relative">
          <div className=" scrollRight flex">
            <Image
              className="mr-[4px]"
              src={firstAnimation}
              alt=""
              width={2006}
              height={150}
            ></Image>
            <Image
              className="mr-[4px]"
              src={firstAnimation}
              alt=""
              width={2006}
              height={150}
            ></Image>
          </div>
        </div>

        <div className="relative">
          <div className=" scrollRight flex">
            <Image
              className="mr-[4px]"
              src={secondAnimation}
              alt=""
              width={1958}
              height={150}
            ></Image>
            <Image
              className="mr-[4px]"
              src={secondAnimation}
              alt=""
              width={1958}
              height={150}
            ></Image>
          </div>
        </div>
      </div>

      <div className=" mx-auto mt-[20px]">
        {isShowInviteCode ? (
          <div className="flex relative">
            <Search
              value={value}
              onChange={setValue}
              width={272}
              height={72}
              borderRadius="36px"
              placeholder="Input Invite Code"
              rightNode={<></>}
              boxShadow={inviteCodeIsWrong ? "boxShadow" : ""}
            ></Search>

            <div className="ml-[12px]">
              <Button
                hideBottomBackground={true}
                active={false}
                width="137px"
                height="72px"
                text={
                  <div className="flex items-center text-[20px] font-semibold">
                    Enter <span className="mt-[2px] ml-[5px]">{">"}</span>
                  </div>
                }
                color={"#fff"}
                normalBackGround={"#0D0D0D"}
                borderRadius="36px"
                border="none"
                buttonClick={clickBindInviteCode}
              ></Button>
            </div>

            {inviteCodeIsWrong && (
              <div
                className="absolute w-[202px] h-[40px] border-[2px] border-solid border-[#0D0D0D] rounded-[8px] left-[36px] bottom-[-56px] bg-[#FFC6C6]
            flex items-center justify-center
            "
              >
                <Image
                  className="mr-[4px]"
                  src={wrongIcon}
                  alt=""
                  width={16}
                  height={16}
                ></Image>
                Wrong Invite Code
              </div>
            )}
          </div>
        ) : (
          <Button
            hideBottomBackground={true}
            active={false}
            width="373px"
            height="72px"
            text={
              <div className="flex items-center text-[20px] font-semibold">
                Login With
                <Image
                  className="mx-[4px]"
                  src={xIcon}
                  alt=""
                  width={16}
                  height={16}
                ></Image>
                ({" "}
                <Image
                  className="mx-[4px]"
                  src={twitterBorderWhite}
                  alt=""
                  width={20}
                  height={20}
                ></Image>
                Twitter)
              </div>
            }
            color={"#fff"}
            normalBackGround={"#0D0D0D"}
            borderRadius="36px"
            border="none"
            buttonClick={getTwitterLinkFunc}
          ></Button>
        )}
      </div>

      {!isShowInviteCode && (
        <div className="mt-[12px] flex items-center cursor-pointer">
          <Image
            className="mr-[4px]"
            src={agreeIcon}
            alt=""
            width={24}
            height={24}
          ></Image>
          {"<User agreement> & <Privacy Policy>"}
        </div>
      )}

      <div className="fixed right-[40px] bottom-[40px] custom-spin">
        <Image src={textAnimation} alt="" width={129} height={129}></Image>
      </div>
    </div>
  )
}

export default Login
