import React, { useEffect, useState } from 'react'
import DashboardLayout from "./src/layout/DashBoardLayout.jsx";
import DashboardHome from "./src/pages/DashboardHome.jsx";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingDashboard from './src/ui/SkelectonLoading.jsx'

const LandingPageOfHome = ({ renderPart }) => {
    const navi = useNavigate();
    const userInformation = useSelector(state => state?.userinfoSlice?.user)
    const [protection, setProtection] = useState({
        loading: true,
        error: false
    });

    useEffect(() => {
        let id;
        if (!userInformation.ref_id) {
            setProtection((sau) => {
                return {
                    loading: false,
                    error: true
                }
            })
        } else {

            id = setTimeout(() => {
                setProtection((sau) => {
                    return {
                        loading: false,
                        error: false
                    }
                })
            }, 1000)
        }

        return () => {
            clearTimeout(id);
        }
    }, [renderPart]);

    if (protection?.loading) {
        return (
            <LoadingDashboard />
        )
    }

    if (protection?.error) {
        navi('/');
        return;
    }

    return (
        <DashboardLayout>
            <DashboardHome />
        </DashboardLayout>
    );
}

export default LandingPageOfHome;


