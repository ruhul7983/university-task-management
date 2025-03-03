import Navbar from "@/components/Navbar/Navbar";

const RootLayout = ({children}) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default RootLayout;