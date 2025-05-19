import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/me`, { withCredentials: true },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                if (response.status === 200) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                    navigate('/login');
                }
            } catch (err) {
                setAuthenticated(false);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    return <>{children}</>;
};

export default UserProtectedWrapper;
