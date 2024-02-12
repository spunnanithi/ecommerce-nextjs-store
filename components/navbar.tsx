import Link from "next/link";
import Container from "./reuseable/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="ml-4 flex gap-x-2">
            <p className="text-xl font-bold">Store</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
        <div></div>
      </Container>
    </div>
  );
};

export default Navbar;
