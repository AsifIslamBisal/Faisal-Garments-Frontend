
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const GoogleLogin = () => {
     const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        })
    }
    return (
        <div className='p-4'>
             
            <div>
                <button onClick={handleGoogleSignIn} className='btn bg-green-300'>
                    <FcGoogle></FcGoogle>
                    Sign In with Google
                </button>
            </div>
        </div>
    );
};

export default GoogleLogin;