import { useEffect, ComponentType, ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type WithAuthProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  // Define the return type of the function
  const WithAuth = (props: P): ReactElement | null => {
    const username = useSelector((state: RootState) => state.user.username);
    const router = useRouter();

    useEffect(() => {
      if (!username) {
        router.push("/");
      }
    }, [username, router]);

    if (!username) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuth;
};

export default withAuth;
