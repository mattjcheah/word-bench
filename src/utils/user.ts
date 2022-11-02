import { getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { v4 as uuid } from "uuid";

export const getUserId = ({ req, res }: GetServerSidePropsContext) => {
  return getCookie("wbuid", { req, res });
};

export const initUserId = (context: GetServerSidePropsContext) => {
  const userId = getUserId(context);
  if (!userId) {
    const { req, res } = context;
    const newUserId = uuid();
    setCookie("wbuid", newUserId, {
      req,
      res,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  }
};

export default initUserId;
