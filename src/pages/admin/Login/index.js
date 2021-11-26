import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import ProgressiveImage from "react-progressive-image";
import ContentHeader from "../../../components/ContentHeader";
import Input from "../../../components/inputForm/Input";
import InputPassword from "../../../components/inputForm/InputPassword";
import Button from "../../../components/inputForm/Button";
import Checkbox from "../../../components/inputForm/Checkbox";
import Hero2 from "../../../assets/img/hero/hero-2.jpg";
import LongDotGroup from "../../../assets/img/components/long-dot-group.png";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../controllers/AuthController";
import { Message } from "rsuite";
import { adminRouteSlug } from "../../../router/adminRoute";
import { publicRouteSlug } from "../../../router/publicRoute";
import { setPageTitleAdmin } from "../../../utils/html.util";

const Login = () => {
  const form = useForm();
  const history = useHistory();
  const { userData, handleLogin, isLoginLoading, loginError } = useContext(AuthContext);
  setPageTitleAdmin("Login");

  useEffect(() => {
    userData && history.push(adminRouteSlug.DASHBOARD);
  }, [userData]);

  return (
    <div className="md:h-screen grid md:grid-cols-2 overflow-hidden">
      <div className="h-full px-6 md:px-20 py-12 hidden md:flex flex-col">
        <div>
          <Link to={publicRouteSlug.HOME} style={{ fontFamily: "Poppins" }} className="text-xl font-bold">
            JYPn
          </Link>
        </div>
        <div className="flex flex-1 items-center">
          <img src={LongDotGroup} alt="Long Dot Group" style={{ maxHeight: "70%" }} />
        </div>
        <div>
          <span className="font-light text-2xs" style={{ letterSpacing: "0.4rem" }}>
            ADMINISTRATOR
          </span>
        </div>
      </div>
      <div className="relative min-h-screen md:h-auto" style={{ zIndex: 1 }}>
        <div>
          <ProgressiveImage src={Hero2}>
            {(src) => (
              <div className="absolute h-full" style={{ backgroundColor: "#111", zIndex: -1 }}>
                <img src={src} alt="Hero-2" className="w-full h-full object-cover opacity-20" />
              </div>
            )}
          </ProgressiveImage>
          <div
            className="absolute w-20 h-full"
            style={{ background: "linear-gradient(90deg, #111 0%, rgba(0,0,0,0) 70%", zIndex: -1 }}
          />
        </div>

        <div className="w-full h-full flex flex-col gap-y-20 py-20 justify-between md:justify-center items-center">
          <div className="md:hidden">
            <span className="font-light text-2xs" style={{ letterSpacing: "0.4rem" }}>
              ADMINISTRATOR
            </span>
          </div>
          <form
            className="p-8 rounded-xl w-80 flex flex-col"
            style={{ border: "1px solid #aaa" }}
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <ContentHeader className="mb-8" style={{ fontSize: "1.125rem" }}>
              Login As Admin
            </ContentHeader>

            {loginError && (
              <Message showIcon type="error" className="mb-2">
                {loginError}
              </Message>
            )}

            <Input
              name="username"
              form={form}
              placeholder="Username"
              validation={{
                required: "Username is required",
              }}
            />
            <InputPassword
              name="password"
              form={form}
              placeholder="Password"
              validation={{
                required: "Password is required",
              }}
            />
            <Checkbox name="rememberMe" form={form} className="text-xs">
              Remember Me
            </Checkbox>
            <Button
              loading={isLoginLoading}
              type="submit"
              className="mb-4 my-2 py-3 bg-opacity-100 hover:bg-opacity-80 text-black font-semibold"
            >
              Log In
            </Button>
          </form>
          <div className="md:hidden">
            <Link to={publicRouteSlug.HOME} style={{ fontFamily: "Poppins" }} className="text-xl font-bold">
              JYPn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
