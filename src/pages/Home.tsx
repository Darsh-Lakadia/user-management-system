import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4">
            User Management System
          </h1>
          <p className="mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa animi
            modi expedita voluptas adipisci quibusdam exercitationem
            perspiciatis, voluptatem magnam veritatis illum voluptatum nam
            minima, nihil harum, impedit quasi fugit? Quasi.
          </p>
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/users")}
            >
              Users Page
            </Button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
