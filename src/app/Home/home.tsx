import Navbar from "@/components/navbar";


const HomeMain = () => {
    return (
        <div style={{ position: 'relative', background: 'url(/assets/pexels-kadiravsarr-25312261.webp) center/cover no-repeat', minHeight: '100vh' }}>
            
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    zIndex: 0, 
                    pointerEvents: 'none',
                }}
            ></div>

            <Navbar />
        </div>
    );
};

export default HomeMain;
