import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProfileHeader from '../componentSpace/ProfileHeader.jsx';
import WorkSpaceContainerSize from '../componentSpace/WorkSpaceContainerSize.jsx';
import PersonalInfoCard from '../componentSpace/PersonalInfoCard.jsx';
import OverviewStats from '../componentSpace/OverViewState.jsx';
import TabsSection from '../componentSpace/TabSection.jsx';
import { useNavigate } from 'react-router-dom';
import EditEmailMessage from '../componentSpace/EditMessageLog.jsx';
import { useSelector, useDispatch } from 'react-redux';
import ApiEndPoints from "../../ReduxStore/apiEndPoints/apiEndPoints.js"
import { decryptData } from '../../Auth/Encryption/jsondataEncryption.js';
import MessageAlert from '../../Components/ErrorPages/ErrorMessagePage.jsx';
import { loadUserInformation } from '../../ReduxStore/Slices/UserInfoSlice.js'

const StudentProfilePage = () => {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const data = useParams();
    const [errorFind, setErrorFind] = useState({
        findError: false,
        message: " ",
        type: " "
    })
    const [loading, setLoading] = useState(false);
    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
        var token = decryptData(jwt_token);
    }

    const demoProfile = useSelector(state => state.userinfoSlice.user)

    useEffect(() => {
        if (!jwt_token) {
            navi("/error_page");
        } else {
            if (jwt_token === data['*']) {
                const fetchData = async () => {
                    try {

                        const api = new ApiEndPoints();
                        const data = await api.fetchUserProfile('student/account/access', token.jwt_token);
                        const { message, success } = data;
                        if (!success) {
                            setErrorFind({
                                findError: true,
                                message,
                                type: "error"
                            });
                            return;
                        }
                        dispatch(loadUserInformation(data.data));
                        return;
                    } catch (error) {
                        navi("/error_page");
                    }
                }

                setLoading(true);
                if (!demoProfile.email) {
                    fetchData();
                }
                setLoading(false);
            } else {
                setErrorFind({
                    findError: true,
                    message: "Url log are change , please re-login again",
                    type: "warning"
                })
            }
        }
    }, [])



    return (
        <>
            <WorkSpaceContainerSize css={'bg-black'}>
                {
                    errorFind.findError ? <MessageAlert type={errorFind.type} message={errorFind.message} onClose={true} /> :
                        <div className="">
                            {
                                loading ? <div>loading...</div> :
                                    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-white">
                                        <ProfileHeader user={demoProfile} />
                                        <EditEmailMessage message='Only email can be edited.' />
                                        <PersonalInfoCard info={demoProfile} />
                                        <OverviewStats stats={demoProfile?.stats} />
                                        <TabsSection />
                                    </div>
                            }
                        </div>
                }

            </WorkSpaceContainerSize>
        </>
    )
}

export default StudentProfilePage; 